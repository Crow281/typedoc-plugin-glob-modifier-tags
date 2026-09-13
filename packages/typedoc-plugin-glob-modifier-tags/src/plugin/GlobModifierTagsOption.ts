/*
 * The MIT License
 *
 * Copyright 2026 Crow281.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import type { GlobModifierTags } from "@/GlobModifierTags";
import { validateGlobModifierTagsOption } from "@/plugin/ValidateGlobModifierTagsOption";
import { type MixedDeclarationOption, Options, ParameterType } from "typedoc";

/**
 * TypeScript option to let user select an
 * bject/array specifying what tags to apply to what files.
 */
export class GlobModifierTagsOption implements MixedDeclarationOption {
    /**
     * Fetches the value associated with this option,
     * stored to the given options object.
     * @param options
     * Options object to fetch value from
     * @returns
     * Whatever value was saved to it.
     *
     * Will be wrapped in an array if it was saved as a single value.
     */
    static getValue(options: Options): GlobModifierTags[] {
        //Fetch value associated with this option.
        let value = options.getValue("globModifierTags") as
            GlobModifierTags | GlobModifierTags[];

        //If value is not an array, wrap it in one.
        if (!Array.isArray(value)) {
            value = [value];
        }

        return value;
    }

    name = "globModifierTags";

    help =
        "[@crow281/typedoc-plugin-glob-modifier-tags]: Glob patterns to apply a set of modifier tags to.";

    //We are expecting an unknown for the parameter.
    type: ParameterType.Mixed = ParameterType.Mixed;

    //Just fill it in with an empty array if user doesn't pick anything.
    defaultValue = [];

    validate?: ((value: unknown) => void) | undefined =
        validateGlobModifierTagsOption;

    /**
     *
     */
    constructor() {
        //
    }
}
