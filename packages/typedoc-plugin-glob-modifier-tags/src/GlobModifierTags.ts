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
import type { ReflectionKind, TagString } from "typedoc";

/**
 * Parameter used to select what scripts to apply modifier tags to.
 */
export interface GlobModifierTags {
    /**
     * List of globs to apply the list modifier tags to.
     *
     * Keep in mind that what will be compared against the
     * globs are absolute paths.
     */
    include: string[];

    /**
     * List of globs, presumably intersecting include,
     * that the list of modifier tags should NOT be applied to.
     *
     * Keep in mind that what will be compared against the
     * globs are absolute paths.
     */
    exclude?: string[];

    /**
     * Kinds of TypeDoc reflections to apply modifier tags to.
     *
     * For example, if you only want to apply tags to functions,
     * you would use ReflectionKind.Function.
     * If you wanted to apply tags to both functions and modules,
     * you would set it to the following:
     * ```TypeScript
     * kinds = [
     *     ReflectionKind.Function,
     *     ReflectionKind.Module
     * ];
     * ```
     */
    kinds?: ReflectionKind | ReflectionKind[];

    /**
     * List of modifier tags
     * to add to the filtered TypeDoc reflections.
     */
    modifierTags: TagString[];
}
