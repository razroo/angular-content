---
title: Linting HTML
---
Linting HTML hasn't changed much over the years. This is because HTML
isn't a language that's in a state of evolution. It's structured markup
that's used in the context of a web app.

While there's not HTML linter offered out of the box, having one is
still beneficial.

## Why Chose HTML Hint

HTML hasn't changed at the core level. HTML hint is a robust and trust
worthy linter that can be depended on and won't mess up your code at the
same time.

## Installing HTML Hint

How to install HTML Hint:

```
  npm install htmlhint --save-dev
```

## Create an .htmlhintrc config file

In the root of your app, create an .htmlhintrc file. The .htmlhintrc is
set up to be the default config name for HTML hint. A sample config for
HTML hint will just be a simple JSON object containing key values.

For example:

```
{
  "attr-value-double-quotes": true,
  "src-not-empty": true,
  "alt-require": true,
}
```

## Adding an NPM Script in your package.json

```
  "lint-html": "htmlhint --rulesdir './rules/' '{apps,libs}/**/*.html'",
```

## Adding a Rules Directory for html hint

You will notice that inside of our HTML hint command, we have created a
rules directory. We are doing this so that we can potentially create our
own sample HTML hint rule.

## What a Sample Rule Looks Like

In the root of your directory, create a rules directory. Inside of that
directory, let's create some sample logic:

```
module.exports = function(HTMLHint) {
  HTMLHint.addRule({
    id: 'attr-space',
    description: 'Attributes cannot have useless whitespace between "=" and attribute name or attribute value.',
    init: function(parser, reporter) {
      var self = this;

      function handleTagStart(event) {
        var col = event.col + event.tagName.length + 1;

        event.attrs
          .filter(function(attr) {
            return attr.value;
          })
          .forEach(function(attr) {
            var rawAttr = attr.raw;
            var indexOfEqualSign = rawAttr.indexOf('=');

            if (rawAttr.charAt(indexOfEqualSign - 1) === ' ') {
              reporter.warn('Space between attribute name and "="', event.line, col + attr.index + indexOfEqualSign - 1, self, attr.raw);
            }

            if (rawAttr.charAt(indexOfEqualSign + 1) === ' ') {
              reporter.warn('Space between "=" and attribute value', event.line, col + attr.index + indexOfEqualSign + 1, self, attr.raw);
            }
          });
      }

      parser.addListener('tagstart', handleTagStart);
    }
  });
};
```

The above allows for a robust HTML lint architecture, with the ability
to add more rules if need be.