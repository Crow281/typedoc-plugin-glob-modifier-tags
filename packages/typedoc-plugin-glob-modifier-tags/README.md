# @crow281&#x2F;typedoc-plugin-glob-modifier-tags

## Introduction

This project provides a
[TypeDoc](https://www.npmjs.com/package/typedoc)
plugin that can dynamically add modifier tags to items matching specific globs.
For example, you could make it so that every module in a file matching
glob "\*\*/internal/\*\*" will have the @internal tag applied.

You can access the project
[here](https://github.com/Crow281/typedoc-plugin-glob-modifier-tags/tree/main/packages/typedoc-plugin-glob-modifier-tags).

## Installation

Get
[@crow281&#x2F;typedoc-plugin-glob-modifier-tags](https://www.npmjs.com/package/@crow281/typedoc-plugin-glob-modifier-tags)
from
[NPM](https://www.npmjs.com/).

```Console
npm install @crow281&#x2F;typedoc-plugin-glob-modifier-tags
```

## Documentation

The API documentation is available
[here](https://crow281.github.io/typedoc-plugin-glob-modifier-tags/doc/api/latest/).

## Example

### Marking "Internal" Folders

Here is a simple example that will apply the "@internal"
modifier tag to all descendants of any directories named "internal":

```JavaScript
/**
 * Configuration object used to customize TypeDoc.
 * @type {Partial<import("typedoc").TypeDocOptions> &
 * import("@crow281/typedoc-plugin-glob-modifier-tags").Options}
 */
const config = {
    //...
    //List of plugins we are adding to typedoc.
    plugin: [
        //This plugin applies a desired set of modifier tags
        //to every TypeDoc reflection matching the filter.
        "@crow281/typedoc-plugin-glob-modifier-tags",
    ],
    //Apply custom tags to anything matching certain file paths.
    globModifierTags: [
        //Apply the internal modifier tag to all children
        //of any directories named "internal".
        {
            //List of globs to apply this to.
            include: ["**/internal/**"],
            //List of globs, presumably intersecting include,
            //that we do NOT want to apply these tags to.
            //Optional.
            exclude: [],
            //Applies to modules within directories named internal.
            kinds: ReflectionKind.Module,
            //Apply the internal modifier tag.
            modifierTags: ["@internal"],
        }
    ],
    //...
}

export default config;
```

Inside of the JSDoc, we have marked the \@type as implementing
[TypeDoc's TypeDocOptions](https://typedoc.org/api/interfaces/TypeDocOptions.html)
and
[@crow281/typedoc-plugin-glob-modifier-tags's Options](https://crow281.github.io/typedoc-plugin-glob-modifier-tags/doc/api/latest/interfaces/Options.Options.html).

We have added the plugin to the list of TypeDoc plugins.

Lastly, we created an object inside of array, globModifierTags,
filtering what to apply "@internal" to.

The plugin assigns the tag upon creation,
so if we decided that we don't want
\@internal items inside the documentation at all,
the TypeDoc property "excludeInternal" will be effective.

```JavaScript
const config = {
    //...
    //We don't want "@internal" items to appear in the API documentation.
    excludeInternal: true
    //...
```

### Targetting Specific Files or Folders

The globs are tested against absolute file paths,
so if you want globs that will work against
specific files or folders in your project,
you will need to append the base path to them.

In this example, the "@alpha" tag is being applied
to all scripts inside of the "src/experimental" folder:

```JavaScript
//The absolute path to the project's source folder.
//Since this script file is at the root,
//we can just append "src" to its dirname.
//Note that import.meta.dirname is part of ESM.
//If you are using CommonJS Modules, you would be using __dirname instead.
//Just in case we are on an OS that uses backslashes,
//replace backwards slashes with forward ones.
const absoluteSrcPath = import.meta.dirname.replace(/\\/g, "/") + "/src"

/**
 * Configuration object used to customize TypeDoc.
 * @type {Partial<import("typedoc").TypeDocOptions> &
 * import("@crow281/typedoc-plugin-glob-modifier-tags").Options}
 */
const config = {
    //...
    //List of plugins we are adding to typedoc.
    plugin: [
        //This plugin applies a desired set of modifier tags
        //to every TypeDoc reflection matching the filter.
        "@crow281/typedoc-plugin-glob-modifier-tags",
    ],
    //Apply custom tags to anything matching certain file paths.
    globModifierTags: [
        //Apply the alpha modifier tag to all children
        //of the root level "experimental" folder.
        {
            //List of globs to apply this to.
            include: [
                //Mark everything in the experimental directory.
                //Append all descendants of experimental
                //to the src's directory path.
                absoluteSrcPath + "/experimental/**/*"
            ],
            //Apply the alpha modifier tag.
            modifierTags: [
                "@alpha"
            ],
        }
    ],
    //...
}

export default config;
```
