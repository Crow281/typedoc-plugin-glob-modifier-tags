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
import { isGlobModifierTags } from "@/IsGlobModifierTags";
import { ReflectionKind } from "typedoc";
import { expect, test } from "vitest";

//Ensure that a fully filled in instance is an instance of the interface.
test("Fully filled in implementation of GlobModifierTags is a valid instance of GlobModifierTags", () => {
    //Create the value to be tested.
    const value: GlobModifierTags = {
        include: ["**/internal/**"],
        exclude: ["**/not-internal/**"],
        kinds: ReflectionKind.Module,
        modifierTags: ["@internal"],
    };

    //Validate the item.
    const isValidType: boolean = isGlobModifierTags(value);

    //Verify that isGlobModifierTags gave the correct answer,
    //that the fully filled in modifier tags counts as modifier tags.
    expect(isValidType).toBe(true);
});

//Ensure that an array is NOT an instance of the interface.
test("Array is NOT a valid instance of GlobModifierTags", () => {
    //Create the value to be tested.
    const value: unknown[] = [];

    //Validate the item.
    const isValidType: boolean = isGlobModifierTags(value);

    //Verify that isGlobModifierTags gave the correct answer,
    //that the array does NOT count as modifier tags.
    expect(isValidType).toBe(false);
});
