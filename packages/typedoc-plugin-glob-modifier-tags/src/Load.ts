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
import { GlobModifierTagsOption } from "@/plugin/GlobModifierTagsOption";
import { Plugin } from "@/plugin/Plugin";
import { Application, Options } from "typedoc";

/**
 * Allows TypeDoc to access the plugin.
 * @param {Application} application
 * Context of the TypeDoc application.
 */
export function load(application: Application): void {
    //Fetch options so we can add our own.
    const options: Options = application.options;

    //Add the option that lets user customize what modifier tags to apply to what files.
    options.addDeclaration(new GlobModifierTagsOption());

    //Create an instance of the plugin.
    const plugin: Plugin = new Plugin();

    //Connect it to the app.
    plugin.bind(application);
}
