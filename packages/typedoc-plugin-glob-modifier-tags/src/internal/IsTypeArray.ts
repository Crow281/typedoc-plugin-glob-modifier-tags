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
/**
 * First checks that parameter value is an array
 * and then checks that all of the elements have the right type.
 * @template ElementType
 * Type of the elements in the array.
 * @param value
 * Value we are checking.
 * @param validateElement
 * Is run on every item in the array to verify
 * that it is a valid instance of ElementType.
 * @returns
 * true if this is an array of type ElementType,
 * false otherwise.
 *
 * Empty arrays will always count as true,
 * arrays with even a single element that isn't
 * of ElementType will count as false.
 */
export function isTypeArray<ElementType>(
    value: unknown,
    validateElement: (element: unknown) => element is ElementType,
): value is ElementType[] {
    //Must be an array.
    //If this wasn't an array, fail.
    if (!Array.isArray(value)) {
        return false;
    }

    //All of its elements must be of type.
    for (const item of value) {
        //If any element in the array is not of element type,
        //then this is invalid.
        if (!validateElement(item)) {
            return false;
        }
    }

    //If none of the checks failed,
    //this must be a valid number array.
    return true;
}
