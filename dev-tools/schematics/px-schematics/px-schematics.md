---
title: px schematics
---
Now it's time to architect a folder structure for containing repeated
versions of a file, such as the app logo.

## Analyzing a File Directory

Within our px-schematics, let's create a files directory:

\[libs [common [animations ] \[assets ] \[core [auth] \[guards]
\[pipes] \[validators] ] \[models ] \[testing ] \[ui ] \[utils ]
\[styles ] \[vendor ] ] ]

Due to how Angular Schematics works, we can create a folder directory as
is, and supplant it within our app. We are going to create the following
folder directory with placeholder files for our app.

## Creating a Files Directory

We are going to follow a functional approach for constructing our file
directory.

Start with a .gitkeep file for each of our directories so that they can
be committed to the app and kept there. It looks something like this:

```
import {
  apply, branchAndMerge, chain, mergeWith,
  Rule,
  SchematicContext, template,
  Tree, url,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { libVersions } from "@nrwl/schematics/src/lib-versions";
import { DEFAULT_NRWL_PRETTIER_CONFIG } from "@nrwl/schematics/src/utils/common";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function pxSchematics(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    const templateSource = applyTemplateSource(options);
    return chain([branchAndMerge(chain([mergeWith(templateSource)]))])(
      host,
      context
    );
  };
}

let applyTemplateSource = (options: any) => {
  const npmScope = options.npmScope ? options.npmScope : options.name;

  return apply(url('./files'), [
    template({
      utils: strings,
      dot: '.',
      tmpl: '',
      ...libVersions,
      ...(options as object),
      npmScope,
      defaultNrwlPrettierConfig: JSON.stringify(
        DEFAULT_NRWL_PRETTIER_CONFIG,
        null,
        2
      )
    })
  ]);
};
```

## Briefly Discussing Code Base

We've created a virtual file system that's being read from our ./files
directory. When we generate files, it is implemented with our actual
file system. This function is called branchAndMerge.

The documentation for schematics is evolving and can be extended to
other frameworks and libraries.