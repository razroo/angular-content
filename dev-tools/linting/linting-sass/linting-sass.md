---
title: Linting Sass
---
Linting is important. When it comes to SASS, Angular's CLI and Nrwl NX
CLI will offer SASS linting out of the box.

sass-lint is a popular package that you can use. Here's how to install
it.

## Installing Sass Lint

```
  npm install sass-lint --save-dev
```

## Adding a Lint Config File

For sass-lint, it will hook into by default a file that is in the root
of folder called .sass-lint.yml. It's quite long, and you can see the
rest of the file in the actual github repo. However, you will still need
to create a sass-lint.yml file.

```bash
  touch sass-lint.yml
```

Inside of the sass-lint.yml file, it will look something like this:

```yml
options:
  formatter: stylish
files:
  include:
    - '{apps,libs}/**/*.scss'
  ignore:
    - 'libs/font-awesome/**/*.scss'
rules:
  # Extends
  extends-before-mixins: 1
  extends-before-declarations: 1
  placeholder-in-extend: 1

  # Mixins
  mixins-before-declarations: 1

  # Line Spacing
  one-declaration-per-line: 1
  empty-line-between-blocks: 1
  single-line-per-selector: 1

  # Disallows
  no-attribute-selectors: 0
  no-color-hex: 0
  no-color-keywords: 1
  no-color-literals: 1
  no-combinators: 0
  no-css-comments: 1
  no-debug: 1
```

The list of lint rules is long but useful for every potential aspect of
your project, helping you prevent potential future conflicts.

For example, my personal favorites are no color words, empty lines
between blocks, and depth. These things make the code review process
much easier because it is visually appealing and lighter to read.

When it comes to managing architecture, styling is a self managed
process and linting takes away the manual parts of it.

## Adding an NPM Script in your package.json

```yml
  "lint-scss": "sass-lint -v -q",
```

## The Final Touch

Adding the sass-lint npm script will tie up any loose ends before your
pull request. This sits neatly on the CI/CD architecture, meaning that
when you make a pull request for your GitHub repo, it will check and
sure that there are no SASS linting errors. When a pull request is
actually merged, pipeline runs as well to make sure that there are no
errors.