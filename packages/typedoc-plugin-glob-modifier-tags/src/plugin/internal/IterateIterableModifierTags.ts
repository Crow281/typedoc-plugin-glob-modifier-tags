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
import type { TagString } from "typedoc";

/**
 * Allows iteration over all modifier tags inside
 * a given collection of {@link GlobModifierTags}.
 * @param globModifierTags
 * Iterable containing the first layer of objects to iterate over.
 * @returns
 * An iterator over every modifier tag
 * inside the iterable of GlobModifierTags.
 *
 * Note that the same tag might appear more than once.
 */
export function* iterateIterableModifierTags(
    globModifierTags: Iterable<GlobModifierTags>,
): Iterable<TagString> {
    //Iterate over globModifierTags.
    for (const item of globModifierTags) {
        //Include the entire array in the iteration.
        yield* item.modifierTags;
    }
}
