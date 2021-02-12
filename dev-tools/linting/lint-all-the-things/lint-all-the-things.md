---
title: Lint all the Things
---
## Lint all the Things

Linting is something that gets overlooked. Think of it this way -
someone's favorite food might be broccoli, another on the team might
prefer steak. Both can have a debate on the pros and cons of each
other's favorite, but it's still a preference thing. No one is right. No
one is wrong.

It's the same when it comes to spaces per indentation, double quotes,
single quotes, tabs, and curly bracket placements. Linting makes
everyone's code look the same - taking all the bits and pieces that
everyone likes and turning it into a cohesively written output.

The code then looks like its written by a single developer rather than
multiple personalized and opinionated syntax.

Linting prevents long and unnecessary arguments, and repackages the
entire team's opinion into something that is agreed on and enforceable.

Perks of linting:

1. Agreement on code formatting rules.
2. Automated way of keeping track of things that need to be changed.
3. Self documentation through cli, on what needs to be changed.

Linting is done after the code is written. A formatter automatically
formats your code as you're writing it. So when you use both together,
it cuts down the visual structure of your team's code.

## What are we trying to lint?

When it comes to Angular code, you are linting HTML, SASS, and
TypeScript. Out of the box, Angular CLI offers Tslint.

The settings can be located in tslint.json file. However, this default
file will not work well with the prettier file produced by Nrwl NX CLI.

When it comes to linters, it's best that it's agnostic to the IDE. This
gives the team the flexibility to run whatever code editor they are
running and still have support for it.

Angular CLI only offers a linter for TypeScript. However, you can also
add a linter for HTML and SASS. To do this, add the following npm
scripts to the top of the tslint.json file.

```
  "lint-html": "htmlhint --rulesdir './rules/' '{apps,libs}/**/*.html'",
  "lint-scss": "sass-lint -v -q",
  "lint-ts": "ng lint --format=stylish",
```

## Linting Typescript

Angular CLI offers an ng lint command out of the box for TypeScript. You
don't have to install anything for this.

## Linting Sass

For linting SASS, you can use the sass-lint package by installing it.

```
npm install sass-lint --save-dev
```

We are also going to want to create a .sass-lint.yml file. Make sure to
put the dot before the .sass-lint.yml file, so that the sass-lint linter
will pick up on the file by default.

It's good to note that prettier now also supports SASS.

## Linting HTML

For HTML, we are going to be using HTML Hint. It's good to note that
HTML Hint hasn't changed in a while, but HTML hasn't really changed at
all.

```
npm install htmlhint --save-dev
```

We are also going to create a .htmlhintrc file.