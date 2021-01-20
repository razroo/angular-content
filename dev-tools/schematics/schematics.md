 Setting up Schematics Using Angular CLI 
========================================

Every project eventually evolves into something big enough that requires
structure and architecture. Creating a project-based schematics can
increase code cohesion in the long term.

How?

Schematics can be used to easily introduce and enforce project wide
conventions. This will reduce the time for on-boarding new developers
onto a project and reduce the time for current developers.

 Download Schematics Globally 
-----------------------------

      npm install -g @angular-devkit/schematics-cli

 Create a file-directory Schematics 
-----------------------------------

The conventions we set for our Pixel Illustrator app will be used across
the entire workspace.

In a previous chapter we mentioned we mentioned the following
folder/file structure:

\[libs \[common \[animations \] \[assets \] \[core \[auth\] \[guards\]
\[pipes\] \[validators\] \] \[models \] \[testing \] \[ui \] \[utils \]
\[styles \] \[vendor \] \] \]

Using schematics can ensure that this file structure is enforced. Every
developer will have a preference for how things are structured, but when
using schematics, your team is encouraged to work as a singular unit
rather than rogue developers.

To refactor can be a manual process and can take more than necessary to
solve manually.

      schematics blank --name=px-schematics

 Understanding Rules and Trees 
------------------------------

A Tree is a data structure that contains a base and a staging area.

A base are a set of files that already exists and a staging area is a
list of changes to be applied to the base.

A Rule is a function that takes a Tree and returns another Tree. A
RuleFactory are functions that create a Rule.

The blank RuleFactory that we have so far:

      import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

      // You don't have to export the function as default. You can also have more
      // than one rule factory per file.

      export function pxSchematics(options: any): Rule {
        return (tree: Tree, _context: SchematicContext) => {
          tree.create(options.name || 'hello', 'world');
          return tree;
        };
      }

###  Tree Deepdive

There are four methods that directly create a change in a Tree:

1.  create

2.  delete

3.  rename

4.  overwrite

Similar to how we used create as an example above, to create a file, we
also have the option to use the schematic to delete, rename, or
overwrite a file.

###  Generating a Folder using Schematics 

We are able to create a series of folders using schematics. However, it
is important to keep in mind two things. In any git setting a folder is
only committed if it contains a file. In addition, within the Angular
schematics it follows the same general guideline. By choosing a file to
be in a particular file path. If no folder currently exists with the
name, it will be created.

Schematics can ensure that teams conform to a particular style to create
a simplified code workflow.