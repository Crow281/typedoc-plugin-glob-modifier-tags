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
import { GlobModifierTagsOption } from "@/plugin/GlobModifierTagsOption";
import { addModifierTags } from "@/plugin/internal/AddModifierTags";
import { iterateIterableModifierTags } from "@/plugin/internal/IterateIterableModifierTags";
import { ModifierTagsMatcher } from "@/plugin/internal/ModifierTagsMatcher";
import type {
    Application,
    Context,
    DeclarationReflection,
    Options,
    TagString,
} from "typedoc";
import { Converter } from "typedoc";

/**
 * Object representing our plugin.
 * You can attach it to TypeDoc via the
 * {@link Plugin.bind}
 * function and remove it via the
 * {@link Plugin.unbind}
 * function.
 */
export class Plugin {
    /**
     * Application this plugin is bound to.
     */
    private _application: Application | null = null;

    /**
     * Begin Event listener passed to TypeDoc.
     * Listens for TypeDoc starting up.
     */
    private onBegin: (context: Context) => void;

    /**
     * Resolve Event listener passed to TypeDoc.
     * Listens for a reflection being created.
     */
    private onCreateDeclaration: (
        context: Context,
        reflection: DeclarationReflection,
    ) => void;

    /**
     * Used to find which modifier tags apply to a given reflection.
     */
    private matcher: ModifierTagsMatcher | null = null;

    /**
     *
     */
    constructor() {
        //Create the callback functions by wrapping the
        //"this" context dependant helper functions with arrow functions.
        this.onBegin = (context: Context): void => {
            this.onBeginSelf(context);
        };
        this.onCreateDeclaration = (
            context: Context,
            reflection: DeclarationReflection,
        ): void => {
            this.onCreateDeclarationSelf(context, reflection);
        };
    }

    /**
     * Registers to the events this plugin needs
     * to operate on the given TypeDoc appliaction.
     * @param application
     * TypeDoc application to bind this plugin to.
     */
    bind(application: Application): void {
        //If already bound, fail.
        if (this._application) {
            throw new Error("Plugin is already bound.");
        }

        //Bind to events.
        //Fetch object events are bound via.
        const converter: Converter = application.converter;

        //Listen for when TypeDoc starts up resolving.
        converter.on(Converter.EVENT_BEGIN, this.onBegin);

        //Listen for when TypeDoc is about to resolve a reflection.
        converter.on(
            Converter.EVENT_CREATE_DECLARATION,
            this.onCreateDeclaration,
        );

        //Save the application.
        this._application = application;
    }

    /**
     * Unregisters from the events this plugin needs
     * to operate on the given TypeDoc appliaction.
     * @param application
     * TypeDoc application to unbind this plugin from.
     */
    unbind(application: Application): void {
        //Do nothing if not bound.
        if (!this._application) {
            return;
        }

        //Fetch object events are bound via.
        const converter: Converter = application.converter;

        //Remove listeners.
        converter.off(Converter.EVENT_BEGIN, this.onBegin);
        converter.off(
            Converter.EVENT_CREATE_DECLARATION,
            this.onCreateDeclaration,
        );

        //Remove reference to application.
        this._application = null;
    }

    /**
     * @returns
     * Application this is bound to, null if none.
     */
    public get application(): Application | null {
        return this.application;
    }

    /**
     * Called when TypeDoc starts up.
     * @param {Context} context
     * Typedoc context triggering the event.
     */
    private onBeginSelf(context: Context): void {
        //Fetch the application.
        const application = context.converter.application;

        //Fetch user options.
        const options: Options = application.options;

        //Fetch argument that lets user configure
        //which files are getting which tags.
        const globModifierTags: GlobModifierTags[] =
            GlobModifierTagsOption.getValue(options);

        //Create object to handle matching.
        this.matcher = new ModifierTagsMatcher(globModifierTags);
    }

    /**
     * Called when TypeDoc creates a new
     * {@link DeclarationReflection}.
     * @param {Context} context
     * Typedoc context triggering the event.
     * @param reflection
     * Created reflection.
     */
    private onCreateDeclarationSelf(
        context: Context,
        reflection: DeclarationReflection,
    ): void {
        //Fetch matcher.
        //If matcher hasn't already been initialized by this point,
        //then something is probably wrong with my code.
        const matcher: ModifierTagsMatcher = this.matcher!;

        //Find all tags to apply to it.
        const globModifierTags: Set<GlobModifierTags> =
            matcher.findTagsByDeclaration(reflection);

        //Create an iterator over all tags.
        //This can potentially return the same tag multiple times,
        //but it doesn't matter because addModifierTags will be adding them to a set.
        const modifierTags: Iterable<TagString> =
            iterateIterableModifierTags(globModifierTags);

        //Apply all of the tags to the reflection.
        addModifierTags(reflection, modifierTags);
    }
}
