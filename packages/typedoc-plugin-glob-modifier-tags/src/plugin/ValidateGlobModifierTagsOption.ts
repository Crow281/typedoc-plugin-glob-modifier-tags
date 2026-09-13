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
import NpmPackage from "../../package.json";
import { isGlobModifierTags } from "@/IsGlobModifierTags";
import { isGlobModifierTagsArray } from "@/internal/IsGlobModifierTagsArray";

/**
 * Verifies that the given value is a valid option for globModifierTags.
 * @param value
 * The value we are checking
 * @throws {@link !Error}
 * if value is not a valid option for globModifierTags.
 */
export function validateGlobModifierTagsOption(value: unknown): void {
    //If empty, this is valid.
    if (!value) {
        return;
    }

    //This must be an object.
    if (typeof value === "object") {
        //If this is a valid array of GlobModifierTags.
        if (isGlobModifierTagsArray(value)) {
            //Type is valid.
            return;

            //If this is a valid single instance of GlobModifierTags.
        } else if (isGlobModifierTags(value)) {
            //Type is valid.
            return;
        }
    }

    //If we reached this point, type must not be valid.
    //Throw an error explaining the problem.
    throw new Error(
        "Option globModifierTags must be empty, an instance of " +
            "interface " +
            NpmPackage.name +
            "/GlobModifierTags, " +
            "or an array of such.",
    );
}
