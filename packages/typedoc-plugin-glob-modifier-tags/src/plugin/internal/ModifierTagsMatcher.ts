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
import picomatch from "picomatch";
import type { DeclarationReflection, SourceReference } from "typedoc";

/**
 * Maps matcher used to verify that a given set of modifier tags
 * to those modifier tags.
 */
interface ElementMatcher {
    /**
     * Verifies the globs against a given file path.
     */
    matcher: picomatch.Matcher;

    /**
     * Tags that apply to anything that fits the matcher.
     */
    modifierTags: GlobModifierTags;
}

/**
 * Used to make it easy to match tags to files they apply to.
 */
export class ModifierTagsMatcher {
    /**
     * Used to identify which if any tags apply to a given file path.
     */
    private elementMatchers: ElementMatcher[] = [];

    /**
     * @param globModifierTags
     * List of modifier tags we want to be able to search.
     */
    constructor(globModifierTags: GlobModifierTags[]) {
        //Creates the variable used to create elementMatchers.
        const elementMatchers: ElementMatcher[] = [];

        //Iterate the list of tags.
        for (const child of globModifierTags) {
            //Compile its include and exclude globs.
            const include: string[] = child.include;
            const exclude: string[] | undefined = child.exclude;

            //Compile a matcher for these globs.
            const matcher: picomatch.Matcher = picomatch(include, {
                ignore: exclude,
            });

            //Store to list of element matchers.
            elementMatchers.push({
                matcher: matcher,
                modifierTags: child,
            });
        }

        //Save the initialized elementMatchers.
        this.elementMatchers = elementMatchers;
    }

    /**
     * Searches the list of {@link GlobModifierTags}
     * and returns any that match against the given filePath.
     * @param filePath
     * File path we want to match against.
     * @returns
     * Set of GlobModifierTags matching to this file path.
     */
    findTagsByFilePath(filePath: string): Set<GlobModifierTags> {
        //Stores list of modifier tags we have found.
        const matches: Set<GlobModifierTags> = new Set<GlobModifierTags>();

        //Fetch list of matchers.
        const elementMatchers = this.elementMatchers;

        //Iterate every matcher.
        for (const elementMatcher of elementMatchers) {
            //Test the matcher against filePath.
            const isMatch: boolean = elementMatcher.matcher(filePath);

            //If it matched...
            if (isMatch) {
                //Fetch modifier tags.
                const modifierTags = elementMatcher.modifierTags;

                //Add the modifier tags to the result.
                matches.add(modifierTags);
            }
        }

        return matches;
    }

    /**
     * Searches the list of {@link GlobModifierTags}
     * and returns any that match against the given declaration.
     * @param declaration
     * The declaration we want to match against.
     * @returns
     * Set of GlobModifierTags matching to this declaration.
     */
    findTagsByDeclaration(
        declaration: DeclarationReflection,
    ): Set<GlobModifierTags> {
        //Stores list of modifier tags we have found.
        const matches: Set<GlobModifierTags> = new Set<GlobModifierTags>();

        //Fetch the list of source files declaration was created by.
        const sources: SourceReference[] | undefined = declaration.sources;

        //If this does not have any source files.
        if (sources && sources.length > 0) {
            //Iterate sources and return when we find a suitable name.
            for (const source of sources) {
                //Fetch the file path.
                //Note that we expect this to be called during
                //EVENT_CREATE_DECLARATION,
                //in which case it will be an absolute file path.
                const fileName: string = source.fileName;

                //Add anything that matches against this file name.
                this.searchMatchers(declaration, fileName, matches);
            }
        }

        return matches;
    }

    /**
     * Adds any matching modifier tags
     * to the set.
     * @param reflection
     * TypeDoc element potentially being modified.
     * @param filePath
     * File path we are checking against.
     * @param matches
     * What to record found matches to.
     */
    private searchMatchers(
        reflection: DeclarationReflection,
        filePath: string,
        matches: Set<GlobModifierTags>,
    ): void {
        //Fetch list of matchers.
        const elementMatchers: ElementMatcher[] = this.elementMatchers;

        //Iterate every matcher.
        for (const elementMatcher of elementMatchers) {
            //Fetch modifier tags.
            const modifierTags = elementMatcher.modifierTags;

            //If user either doesn't care about kinds
            //or if it matches.
            if (!modifierTags.kinds || reflection.kindOf(modifierTags.kinds)) {
                //Test the matcher against filePath.
                const isMatch: boolean = elementMatcher.matcher(filePath);

                //If it matched...
                if (isMatch) {
                    //Add the modifier tags to the result.
                    matches.add(modifierTags);
                }
            }
        }
    }
}
