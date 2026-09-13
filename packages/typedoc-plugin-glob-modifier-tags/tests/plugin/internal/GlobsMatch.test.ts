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
import { ModifierTagsMatcher } from "@/plugin/internal/ModifierTagsMatcher";
import { expect, test } from "vitest";

//Ensure checking a glob against a path works.
test('Detects that a path with an "internal" triggers against glob "**/internal/**"', () => {
    //Create the value to be tested.
    const modifierTags: GlobModifierTags[] = [
        {
            include: ["**/internal/**"],
            exclude: ["**/external/**"],
            modifierTags: ["@internal"],
        },
    ];

    //Create object that will search tags.
    const matcher = new ModifierTagsMatcher(modifierTags);

    //Search for any tags with globs that match against this file path.
    const matches: Set<GlobModifierTags> = matcher.findTagsByFilePath(
        "some/path/internal/SomeFile.ts",
    );

    //Verify that the one and only element was returned,
    //because it matched "internal".
    expect(matches.has(modifierTags[0])).toBe(true);
});

//Ensure checking a glob against an exclude works.
test('Detects that a path with an "internal" and "external" does NOT trigger if we exclude "external"', () => {
    //Create the value to be tested.
    const modifierTags: GlobModifierTags[] = [
        {
            include: ["**/internal/**"],
            exclude: ["**/external/**"],
            modifierTags: ["@internal"],
        },
    ];

    //Create object that will search tags.
    const matcher = new ModifierTagsMatcher(modifierTags);

    //Search for any tags with globs that match against this file path.
    const matches: Set<GlobModifierTags> = matcher.findTagsByFilePath(
        "some/path/internal/external/SomeFile.ts",
    );

    //Verify that nothing was returned,
    // because even though path matched internal,
    // it also matched external.
    expect(matches.size).toBe(0);
});
