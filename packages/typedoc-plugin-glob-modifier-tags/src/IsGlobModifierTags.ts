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
import { isReflectionKindArray } from "@/internal/IsReflectionKindArray";
import { isStringArray } from "@/internal/IsStringArray";

/**
 * Checks whether a given value is a valid instance of
 * {@link GlobModifierTags}.
 * @param value
 * Value we are checking.
 * @returns
 * true if value is a valid instance of GlobModifierTags,
 * false otherwise.
 */
export function isGlobModifierTags(value: unknown): value is GlobModifierTags {
    //Must be an object.
    if (typeof value !== "object") {
        return false;
    }

    //Cannot be empty.
    if (!value) {
        return false;
    }

    //Cast to a partial variant of the interface we are looking for
    //so that we can check the properties directly.
    //Since we don't care about being set to undefined or actually being empty,
    //we don't need "in" checks.
    const casted: Partial<GlobModifierTags> =
        value as Partial<GlobModifierTags>;

    //Check the properties.
    //Check include.
    //include must be a string array.
    const include = casted.include;

    //Check that include is a string array and fail if it isn't.
    if (!isStringArray(include)) {
        return false;
    }

    //Check exclude.
    //exclude must either be empty or a string array.
    const exclude = casted.exclude;

    //If exclude is non-empty.
    if (exclude) {
        //Exclude must be a string array.
        if (!isStringArray(exclude)) {
            return false;
        }
    }

    //Check the kinds array.
    //kinds must be empty, a number, or a number array.
    const kinds = casted.kinds;

    //If kinds is non-empty.
    if (kinds) {
        //Kinds must be have the same type as ReflectionKind
        //or be an array of ReflectionKind.
        //ReflectionKind is an enum using number values.
        if (typeof kinds !== "number" && !isReflectionKindArray(kinds)) {
            return false;
        }
    }

    //Check modifierTags.
    //modifierTags must be a string array.
    const modifierTags = casted.modifierTags;

    //Check that modifierTags is a string array and fail if it isn't.
    if (!isStringArray(modifierTags)) {
        return false;
    }

    //If none of the checks failed,
    //this must be a vlaid instance of GlobModifierTags.
    return true;
}
