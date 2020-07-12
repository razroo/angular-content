 Accessibility with Codelyzer
============================

Codelyzer is a static code analyzer built on top of Tslint. It's a layer
over Tslint with pre-made rules. It includes:

1.  Component selectors are kebab-case

2.  Directive selectors are camelCased

3.  no-host-metadata-property - Disallows use of `host` within
    components

Why Codelyzer is Amazing
------------------------

Codelyzer is amazing.

Why? Because it lets you work smarter rather than harder.

How? It lets you think ahead, and gives you the information needed to
find the right tools to solve potential pain point issues. This can make
a difference in how quickly you can build your app.

In this instance, by thinking ahead, and finding the right tool, it can
make all the difference in your application.

So you do you implement Codelyzer?

Angular CLI and Codelyzer
-------------------------

The Angular CLI includes Codelyzer out of the box. However, Codelyzer
does not include linting `a11y` rules by default. This is because it's
still in experimental phase and hasn't been adopted/or developed enough
to have a stable release. You don't have to add it into your application
but it's a nice to have.

If you want it part of your linting suite, you can add it to your
tslint.json file.

### Install Codelyzer If Not Using CLI

We are assuming you have codelyzer installed already. This is because
Angular CLI and NX installs Codelyzer by default.

If you're unsure or don't have it installed, here's how to install it.

    npm i codelyzer --save-dev;

### Add rules to tslint.json

The following are the rules that suggested by the Codelyzer team to add
accessibility to your application:

    {
      "rulesDirectory": [
        "codelyzer"
      ],
      "rules": {
        ...,
        "template-accessibility-alt-text": true,
        "template-accessibility-elements-content": true,
        "template-accessibility-label-for": true,
        "template-accessibility-tabindex-no-positive": true,
        "template-accessibility-table-scope": true,
        "template-accessibility-valid-aria": true,
        "template-click-events-have-key-events": true,
        "template-mouse-events-have-key-events": true,
        "template-no-autofocus": true,
        "template-no-distracting-elements": true
      }
    }  

When you have tslint enabled within your code editor, there are two
scenarios that you can take advantage of these rules.

1.  From within your Typescript files.

2.  Whenever you run `ng lint` over entire project. You can tie ng lint
    into your CI/CD process, of course, to make sure project is thrown
    back if these ng lint rules do not pass.
