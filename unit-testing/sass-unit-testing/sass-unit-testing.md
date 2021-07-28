---
title: Sass Unit Testing
---

## When Does Sass Unit Testing Make Sense? ##

One of the concerns with any architecture is the act of
over-engineering. This leads to the question - when it comes to unit
testing Sass, how far should you take it? Should it be for every class,
for every function, any core class used within a framework?

The answer to this is: a core class, which is used across the app. HThe
actual class that is re-used should not be unit tested because it can be
re-used in the wrong context. In addition, the concept of combining two
classes is closer to OOP than it is to functional programming.

The ideal approach would be to unit test functional scss that is used as
a core style. The convention should be that when using a core style,
such as padding, or a breakpoint.

## The Benefits of using Functional Sass as a Convention ##

What would be the benefit of using Functional Sass as a convention?
Within an app, when skimming through css it can all looks the same. Even
within our architecture using BEM, it can be hard to determine the
difference between a core class, a component specific style, a media
query. In addition, the importance, as well as degree of impact with
regards to functional programming.

While this book will not offer a complete paradigm for a structured
design pattern within scss in order to design discernible sass, we do
have a way to discern what is a core style and what is not.

This is by using functional Sass. The convention is that for a specific
app all core style use functional sass. Similar to when we use sass
error reporting. If a pull request goes out, and it is not function used
for styling, then comment is made that, \"Per convention, this is a core
style, and should be using the appropriate function\".

## Within a Design Language System, Choosing Core Functions ##

With a core framework, specifically built on top of a design language
system, the following is what a functional DLS core framework would look
like:

1.  Buttons

2.  Chips

3.  Colors

4.  Data Table

5.  Font

6.  Grid, Padding, and Border

7.  Icons

8.  Input, Date Picker, Checks, Toggle, Radio & Tabs

9.  Line Style, Elevation, Element Styles

10. Side Nav

11. Toolbar

## Unit Testing Within Our Specific App ##

Being that we are going to be creating sass functions for our core
themeing, it would make sense to unit test them as well. If they are
going to be use in 10 or more places per each app then we would like to
make sure that they are indeed working in the fashion that they should
be.

## Using Sass True ##

Sass True is a set of Sass unit tests written in Sass so that they can
mimic the usual describe, it, assert, and expects, you can expect from a
usual unit test.

The following is an example of a unit test one might make for a typical
mixin.

```scss
// Test CSS output from mixins
@include it('Outputs a font size and line height based on keyword') {
  @include assert {
    @include output {
      @include font-size('large');
    }

    @include expect {
      font-size: 2rem;
      line-height: 3rem;
    }
  }
}
```

It should all be very familiar with your classic Mocha test.

## Installing Sass True ##

```bash
npm install sass-true --save-dev
```

## Setting up a scss.spec.ts ##

We are going to set up our own jasmine sass-test runner, that will pick
up on all sass unit tests within directory. It will look like the
following:

```typescript
const path = require('path')
const sassTrue = require('sass-true')
const glob = require('glob')

describe('Sass', () => {
  // Find all of the Sass files that end in `*.spec.scss` in any directory in this project.
  // I use path.resolve because True requires absolute paths to compile test files.
  const sassTestFiles = glob.sync(path.resolve(__dirname, '**/*.spec.scss'))

  // Run True on every file found with the describe and it methods provided
  sassTestFiles.forEach(file =>
    sassTrue.runSass({ file }, describe, it)
  )
})
```

## Run Sass True Directly, without using CLI ##

As of this time Sass True uses node-sass, which does not play well with
the CLI. We will need to run the sass spec runner directly. As a result,
let's set up a specific npm script for running sass-true.

```json
    "sass-test": "jasmine libs/scss.spec.ts",
```