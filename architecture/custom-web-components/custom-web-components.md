---
title: Custom Web Components
---
What makes a framework is it's ability to tie together the different
parts of the application into something larger. This includes services
for data requests, files for interfaces/type checking, state management,
rendering engine, and the ability to pass inputs and outputs to each
other.

One very intelligent piece of architecture that will be getting more
press as time goes on, is creating custom web components within you
application. This allows for your dumb components to be independent of
framework, and to be re-used wherever. All dumb component should be
created as a custom web component, so any team can modify it.

## Before We Get To Nx

Before we get to Nx, we need to bring into focus that Nx controls too
much of the code. If the team at Nrwl decides to take the direction of
paid code, or documentation is lacking, you're locked in. It really
seems like a large price to pay, for tooling that can be created by my
own team.

For me, the eureka moment really came when I started using Web
Components. I was like at this point, ok, fine. I will use your app to
scaffold ngrx, and generate the initial workspace. However, when I have
to use you to actually build my app, that is when it becomes
problematic.

So, suffice to say, I am going to attempt to create this solution on my
own as well, for this one.

### Scaffolding Web Components Lib

Within Nrwl Nx there is the ability to create a none framework library,
which will include all of our framework agnostic code.

```
ng g lib ui --framework=none  
```

This will generate a `ui` directory structure, that will something like
the folliwing, within your application:

\[libs [ui [src [lib] \[index.ts,file] ] \[jest.conf.js, file]
\[tsconfig.lib.json, file] \[tsconfig.json, file]
\[tsconfig.spec.json, file] \[tslint.json, file] ] \[index.ts,file]
\[test.ts,file] ]

### Create An elements.ts File and Export

Inside of your lib folder, let's create a data-table component.

```
cd libs/ui/src/lib;
mkdir data-table;
```

Inside of that data table, let's go ahead and create a custom web
component.

```{caption="custom
export class GreetingElement extends HTMLElement {
  public static observedAttributes = ['title'];

  attributeChangedCallback() {
    this.innerHTML = `<h1>Welcome to ${this.title}!</h1>`;
  }
}

customElements.define('happynrwl-greeting', GreetingElement);
```

### Reexport in index.ts file

You will want to go ahead and re-export it in your web-element
component. This will simplify that way things work, and allow you to
re-use within your app.

## General Architecture of Inserting Web Element

### Changing Target

Because custom web elements are a relativley new technology, it will
require the target to be changed to ES2015.

### Importing library

Your app will require importing the library into your web application.

### Tell Framework To Take Chill Pill

Every framework will have a specific schema towards it's web
application. Custom Web Elements are outside of the regular schema of
every framework. So you will have to use the framework's prefered method
of "taking a chill pill". I.e. saying the schema for custom web
elements is cool, and should not be errored out.

### Actually Using Element

Actually going ahead and using element similar to how you would use a
component in any regular application. Now that we have specified these
four steps, let's actually bring them to our application.

## Inserting component in Angular App

### Change Target

In our `tsconfig.json` we will go ahead and change the output target to
`es2015`. Custom web elements are a relatively new technology, and
require es2015 by default to be bundled as part of the application.

### Change Target

Within our Angular application we will tell the schema that it should
allow for custom elements i.e. `CUSTOM_ELEMENTS_SCHEMA`. This is
primarily so it will allow for custom elements to be used within the
app.

### Insert Component in Angualr App

Inserting a web component within an Angular app, is done in exactly the
same fashion that a regular Angular component would be inserted.

## Inserting component in React App

### Update Target

Change the target in target in React to `es2015`.

### Importing Library

We go ahead and import library within our application.

### Adding Intrisic Types

This step is somewhat different within an Angular application. Instead
of adding to the schema, we will go ahead and create an `intrisic.d.ts`
file.

### Actually Using ELement

We then go ahead include this element within our application.