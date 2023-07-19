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
import { parseValueNode } from "./parse-value-node";

export function parseArguments(directive: DirectiveNode): Record<string, unknown> {
    return (directive.arguments || [])?.reduce((acc, argument) => {
        acc[argument.name.value] = parseValueNode(argument.value);
        return acc;
    }, {});
}

export function findDirective(directives: readonly DirectiveNode[], name: string): DirectiveNode | undefined {
    return directives.find((d) => {
        return d.name.value === name;
    });
}
