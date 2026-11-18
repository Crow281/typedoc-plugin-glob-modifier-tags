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
import { Comment } from "typedoc";
import type { Reflection, TagString } from "typedoc";

/**
 * Handles adding the given array of modifier tags to the given reflection.
 * @param reflection
 * TypeDoc reflection modifier tags are being added to.
 * If it lacks a comment object, one will be added.
 * @param modifierTags
 * List of modifier tags to add to reflection.
 */
export function addModifierTags(
    reflection: Reflection,
    modifierTags: Iterable<TagString>,
): void {
    //Fetch the module's comment object.
    let comment: Comment | undefined = reflection.comment;

    //If reflection has a comment.
    if (comment) {
        //Fetch reflection's list of modifier tags.
        const commentModifierTags: Set<TagString> = comment.modifierTags;

        //Add all of parameter modifierTags elements to the comment's modifier tags.
        for (const modifierTag of modifierTags) {
            commentModifierTags.add(modifierTag);
        }

        //If reflection does NOT have a comment.
    } else {
        //Create set with a copy of all the desired tags.
        const modifierTagsSet: Set<TagString> = new Set<TagString>(
            modifierTags,
        );

        //Create the comment with the desired tags in it.
        comment = new Comment([], [], modifierTagsSet);

        //Save it to the reflection.
        reflection.comment = comment;
    }
}
