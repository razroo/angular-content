---
title: Modules
---

Modules are an integral part of Angular. It's interesting, because in
some other languages, modules are a part of the language(OCaml comes to
mind). A module in a language like OCaml, is any code contained within a
file. It's similar in TypeScript. The module exposes objects meant to be
public by using the export keyword. In Angular, a module, is completely
unrelated to the system of modules used by Typescript are complementary.
It is simply a decorator attached to a class that ultimately get's
bundled together into a single class, for use with the app.

The Module Four, and the Fifth Wheel
------------------------------------

Angular provides five key/values to be used with a module:

```ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports:      [ BrowserModule ],
  providers:    [ Logger ],
  declarations: [ AppComponent ],
  exports:      [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

1.  imports - This takes in other modules, whose exported classes, are
    needed by this component. This can include, providers, declarations,
    exports, and imports, contained within the other module.

2.  providers - This is used to put all services used by components
    within this module. It should be noted, that as of Angular 6, the
    option to use `forRoot` was introduced. It greatly decreases the
    need for using providers, but it very much so still has it's place
    in Angular. Especially for unit tests.

3.  declarations - Components, directives, and pipes that belong to the
    NgModule are put here.

4.  exports - The components that should be able to be used in templates
    outside of this module, when this module is imported by other
    modules.

5.  bootstrap - The main application, i.e, the root component, which
    hosts all other app views. Only the root NgModule sets the bootstrap
    property, which is usually handled by the CLI/Nx. I consider
    bootstrap as the fifth wheel when it comes to modules for bootstrap.

Note this is not put in alphabetical order. Rather it is put in the
order that the CLI tends to order them. It is this way, because it is
the order in which these items are used within the NgModule declaration.
