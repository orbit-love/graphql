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

import type { CypherASTNode } from "../CypherASTNode";
import type { CypherEnvironment } from "../Environment";
import type { PropertyRef } from "../PropertyRef";
import type { Expr } from "../types";
import { padBlock } from "../utils";
// import type { Param } from "../variables/Param";
import { SubClause } from "./SubClause";

// TODO: set should accept an expression
export type SetParam = [PropertyRef, Expr];

export class SetClause extends SubClause {
    protected params: SetParam[];

    constructor(parent: CypherASTNode, params: SetParam[] = []) {
        super(parent);
        this.params = params;
    }

    public addParams(...params: SetParam[]) {
        this.params.push(...params);
    }

    public getCypher(env: CypherEnvironment): string {
        if (this.params.length === 0) return "";
        const paramsStr = this.params
            .map((param) => {
                return this.composeParam(env, param);
            })
            .join(",\n");

        return `SET\n${padBlock(paramsStr)}`;
    }

    private composeParam(env: CypherEnvironment, [ref, param]: SetParam): string {
        return `${ref.getCypher(env)} = ${param.getCypher(env)}`;
    }
}
