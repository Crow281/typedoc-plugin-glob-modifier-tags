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
import { isStringArray } from "@/internal/IsStringArray";
import { expect, test } from "vitest";

//Ensure that empty arrays count as string arrays.
test("Empty array is a valid string array", () => {
    //Create the empty array to be tested.
    const array: string[] = [];

    //Validate the array.
    const isValidType: boolean = isStringArray(array);

    //Verify that isStringArray gave the correct answer,
    //that the empty array is a string array.
    expect(isValidType).toBe(true);
});

//Ensure that arrays with strings count as string arrays.
test("String array with two string elements is a valid string array", () => {
    //Create the string array to be tested.
    const array: string[] = ["abc", "def"];

    //Validate the array.
    const isValidType: boolean = isStringArray(array);

    //Verify that isStringArray gave the correct answer,
    //that the string array is in fact a string array.
    expect(isValidType).toBe(true);
});

//Ensure that arrays with mixed types do NOT count as string arrays.
test("Mixed type array with string and non-string elements is NOT a valid string array", () => {
    //Create the mixed type array to be tested.
    const array: unknown[] = ["abc", 24, "def"];

    //Validate the array.
    const isValidType: boolean = isStringArray(array);

    //Verify that isStringArray gave the correct answer,
    //that the mixed array with strings and non-strings is NOT a string array.
    expect(isValidType).toBe(false);
});

//Ensure that non-array objects do NOT count as string arrays.
test("Non-array Object is NOT a valid string array", () => {
    //Create the object to be tested.
    const array: unknown = {
        abc: 123,
    };

    //Validate the array.
    const isValidType: boolean = isStringArray(array);

    //Verify that isStringArray gave the correct answer,
    //that the object is NOT a string array.
    expect(isValidType).toBe(false);
});
