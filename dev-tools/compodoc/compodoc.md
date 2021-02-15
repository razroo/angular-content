---
title: Compodoc
---
Compodoc is an automated documentation tool for your Angular
application. For small apps, having documentation can feel like
overkill. However, when your app grows and the size of your team
increases, good documentation practices from the get-go can save
developers from wasted time and overlapping code.

Test save

Having a documentation tool within your app is incredibly important.
Why? It increases visibility in the following areas:

1. Overview
2. Dependencies
3. Various types of Modules, Components, Services etc.
4. Routes
5. Documentation coverage

Why compodoc? Because it is the most comprehensive and easiest to work
with when it comes to auto generating documentation. It is also open
sourced and generates a static documentation of your application.

Here's how you install and use compodoc.

## Installing Compodoc

```
npm install -g @compodoc/compodoc --save-dev
```

## Adding to package.json

To ensure that compodoc gets shipped between team members and works as
expected, add compodoc to your package.json file.

```
  "compodoc": "compodoc -p tsconfig.json",
  "compodoc-serve": "compodoc -s tsconfig.json",
```

Now if we want to generate documentation, and we are in development
mode, we can simply run:

```
npm run compodoc-serve  
```

## Overview - Using Compodoc to Remove Dead Code

Compodoc has a section called overview. It allows you to see all of your
modules, components, and services. By doing so, you can see how they all
feed into each other.

![Compodoc
overview](graphics/compodoc/compodoc-overview-screenshot.pdf){width="414pt"}

In the above image, we can see how Compodoc works. The tree structure
allows us to see which components are feeding into which modules. If
there are too many lines, then it means that your app may need to be
refactored for a cleaner workflow. Stand alone components with no
attached modules is often a sign of dead code, which means it can be
cleaned through deletion.

## Dependencies

Seeing what dependencies your app is using is as simple as going to your
`package.json` file. However, if you've got more than a barebones
Angular app, the file is not visually appealing to look at. It's hard to
see how everything is interconnected with one another.

Compodoc solves this issue by creating a visual output. This allows us
to quickly capture relationships without having to slow down and
manually figure things out.

![Compodoc
overview](graphics/compodoc/dependencies/compo-dependencies-screenshot.pdf){width="414pt"}

`package.json` has a way of creeping up on a project, making it hard to
navigate. With compodoc, your meta information is presented in a way
that's easier to mentally digest.

## Various Types of Modules, Components etc.

Compodoc provide dropdowns of all modules, components, classes,
services, interceptors, guards, interfaces, and miscellaneous within
app.

This is good for two reasons:

1. It lays everything out. There is no secrets, or hidden surprises.
   You know exactly what's going on within the app.
2. Defines everything within your app - including but not limited to
   interceptors, guards, and interfaces. This information is good in
   team settings, where members may be working on islands of code that
   may need to connect to and impact on pieces created by others.

![Compodoc navigation of Modules, Components,
etc.](graphics/compodoc/nav/compodoc-nav-screenshot.pdf){width="414pt"}

## Routes

Compodoc also gives you the ability to visualize the routes that are in
your application, and which components are attached. This is useful for
large applications. The visualization also lets you mock the
relationships and help you see how the parts of your app is connected to
one another.

![Compodoc Routes
Example](graphics/compodoc/routes/compodoc-routes.pdf){width="414pt"}

You can also click through the routes. With compodoc, your documentation
becomes a meta living document that can help speed up your workflow by
turning your meta information into something visual.

## Documentation Coverage

Compodoc compiles documentation in one place. In contrast to other
available frameworks, this is a major perk because it gives you the
bigger picture approach to your application, while still having the
ability to drill down into the finer points.

For example, if you have a method within a component that looks
something like this:

```
/**
  * Display only completed todos
  */
displayCompleted() {
  this.currentFilter = 'completed';
  EmitterService.get(this.id).emit('displayCompleted');
}
/**
  * Display all todos
  */
displayAll() {
  this.currentFilter = 'all';
  EmitterService.get(this.id).emit('displayAll');
}
```

![Compodoc Documentation
Example](graphics/compodoc/documentation/documentation-coverage.pdf){width="414pt"}

Compodoc will take the JsDoc documentation and generate it in a way that
is simple to navigate.

## Pushing Documentation to Staging Area

As we did initially, is that we created a two npm scripts. One of them
for compodoc development, and the other compodoc production.

By running the following, you can generate documentation in your default
output folder.

```
"compodoc": "compodoc -p tsconfig.json",
```

This link can be pushed and bundled with your project so that everyone
has access to it.