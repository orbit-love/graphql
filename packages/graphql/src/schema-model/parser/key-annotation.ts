/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { DirectiveNode } from "graphql";
import { Neo4jGraphQLSchemaValidationError } from "../../classes";
import { KeyAnnotation } from "../annotation/KeyAnnotation";
import { parseArguments } from "./utils";

export function parseKeyAnnotation(directives: readonly DirectiveNode[]): KeyAnnotation {
    let isResolvable = false;

    directives.forEach((directive) => {
        // fields is a recognized argument but we don't use it, hence we ignore the non-usage of the variable.
         
        const { fields, resolvable, ...unrecognizedArguments } = parseArguments(directive) as {
            fields: string;
            resolvable: boolean;
        };

        if (Object.keys(unrecognizedArguments).length) {
            throw new Neo4jGraphQLSchemaValidationError(
                `@key unrecognized arguments: ${Object.keys(unrecognizedArguments).join(", ")}`
            );
        }

        isResolvable = isResolvable || resolvable;
    });

    return new KeyAnnotation({
        resolvable: isResolvable,
    });
}