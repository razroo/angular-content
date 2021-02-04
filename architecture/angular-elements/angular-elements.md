---
title: "# Angular Elements - Introduction"
---
 Angular Elements - Introduction 
================================

Angular elements is a feature that's been around since version 6. It's
been more than a year since the original release and works as a method
to modularize your application or add independent components to a
different app without the need to compile an Angular application.

In a way, Angular Elements is an ode to the portability factor that
harks back to the original days of Angular.js. What elements essentially
lets you do is build stand-alone components and allow you to export it
into a single JavaScript file.

It's a fantastic feature -  especially for micro-frontends and
transitional applications that are working with multiple and possibly
legacy technologies.

So how does it work?
--------------------

Angular Elements is an Angular feature that lets you create new DOM
elements. As we all know, JavaScript hooks onto the DOM to make visual
changes and instigate change based on our configurations and settings.
Angular is a framework that lets us do this quickly and easily.

However, there are a finite number of pre-configured DOM elements
available, with the extension of custom elements coming in with HTML5.
This means that your tags aren't limited to the h1 and p tags we're all
used to seeing. Custom elements allow you to create your own HTML tags,
based on your application's needs.

Angular leverages this feature through Elements by allowing us to create
our own custom elements and hook into it via our compiled Angular
script. So at the end of your coding session, your code could
potentially look something like this:

    <script src="angular-cart.js" />
    <custom-cart></custom-cart>

This little code snippet lives independently from the rest of your
application, making it highly portable and reusable. You could drop it
into a static HTML page and or a pre-existing codebase that may be using
a different or older framework or library.

So how do you go about creating an Angular Element?
---------------------------------------------------

1.  install Angular elements via the CLI using the following command:

          npm i @angular/elements --save

2.  Install the custom elements polyfill. A polyfill is essentially a
    piece of code that allows you to access APIs that the browsers are
    expected to provide. However, sometimes these features and
    functionality aren't readily available, so a polyfill fills in the
    missing content and ensures that your application continues to work
    as expected.

    This means that your application becomes backward compatible, to a
    certain degree, for older browsers.

          npm i @webcomponents/custom-elements --save

    Once you've done this, go into the poyfills.ts file, located in the
    src folder of your Angular application and import it into the file.

          import '@webcomponents/custom-elements/custom-elements.min';

3.  Build your component as per usual and then convert it into an
    Angular custom element by importing `Injector` from `@angular/core`
    and `createCustomElement` from `@angular/elements`

    Because this component is not declared or used by the router, you
    need to add your component to an `entryComponents` array under
    `@NgModule`.

    Then go down to your `AppModule` class and add the injector into the
    constructor and then bootstrap manually via `ngDoBootstrap()`

    Pass your Angular component you want to turn into an Angular Element
    to the `createCustomElement()` method. This method will help create
    a bridge that will convert your Angular code into native JavaScript
    code that will work with DOM APIs.

    The last thing you need to do is register it via

          customElements.define('your-custom-element-name-here',
          theCustomElementYouJustCreatedInThePreviousStep)

    At the end of it all, your code should look something like this:

          ...
          import {NgModule, Injector } from '@angular/core';
          import {createCustomElement} from '@angular/elements';
          ...
          @NgModule({
          ...
          entryComponents: [ CustomCartComponent ]
          })
          ...
          export class AppModule {
          constructor(private injector: Injector){}
          ngDoBoostrap(){
              const yourElement = createCustomElement( CustomCartComponent,
               { injector: this.injector});
              customElements.define('custom-cart', yourElement);
            }
          }   

    You can now use this custom-cart component by writing
    `<custom-cart></custom-cart>` in your HTML. If you npm run it, you
    should be able to run the component independently.

    Now all you have to do is run `ng build` to export it as a single
    JavaScript file.

Why would you use Angular Elements in the first place?
------------------------------------------------------

Unless you're working on a brand new project, possibly for a startup,
you're going to encounter legacy code. There's no escape from this
reality.

Many businesses often opt for a transitional approach towards upgrades
and new features, meaning that you're going to need a way for your front
end code to fit in nicely with the rest of the application.

Angular elements give developers this opportunity and present a clean
solution to a very common problem. Your feature code becomes extremely
modular and containerized in a way that truly isolates it from the other
code.

This creates a level of independence in your application building
process and modularizes your team's workflow.

Angular elements are also particularly suitable for delivering dynamic
applications that are made up of many complex components - such as a
dashboard that may require independent deployments for each part. When
you architecture your shell page and fill it with custom Angular
elements, it gives you the ability to create deployments that are
separate from another, reducing the potential impact and isolating
issues if something went wrong.

In a good way, Angular Elements can help you transition your legacy app
seamlessly into the future within creating contingent effects on your
current code. If you have an Angular.js app that needs to be upgraded,
Angular Elements is also a good way to go without creating conflicts in
your current deployed code.

Using Angular Elements can also move your data methods away from being
stored in the frontend and into a space that has more permanence through
APIs that connect to a backend.

How to get rid of zone.js
-------------------------

zone.js is how Angular makes change detection possible. It's an external
dependency that creates execution contexts, especially for async tasks.
It's also the thing that makes binding possible, along with any UI
changes we visually see when something changes.

However, zone.js has its own issues such as the occasional break in
\*ngFor loops. To give yourself more power and control over how and when
your code responds to change, you can turn off zone.js manually at the
global level in the main.ts file.

    platformBorwserDynamic().bootstrapModule(AppModule, { ngZone: 'noop'});  

Or if you just want to deactivate it for a particular component only,
you can do so inside the `@Component` decorator.

    @Component({
      ...
      changeDetection: ChangeDectionStrategy.OnPush
    })  

Now that you have zones turned off, you will need to manually tell
Angular when to render data. Import `ChangeDetectorRef` from
`@angular/core` and be sure to declare it inside your constructor. Now
all you have to do is call the `detectChanges()` method in order to tell
your application that a change has occurred.

Parting words
-------------

Angular Elements is one of those things that needs more emphasis within
the Angular community. It's a tool that increases Angular's ability to
adapt to different environments in a succinctly effective manner.

Elements also allow for a lightweight way to use Angular code without
the need to export an entire application, making effective micro-front
ends and transitional applications possible, especially in a space where
there is talk about Angular being too bloated to work with.

But it's not and we've come a long way since the original days of
Angular 2's original release. Elements let you create independent
features with the scaffold of Angular's structures and allow you to
export in a manner that is highly modular.
