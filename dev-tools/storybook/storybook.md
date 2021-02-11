---
title: Storybook
---
Storybook is a UI explorer for front end developers. It was initially
created for React but is now also available for Angular.

It makes organizing UI elements and keeping track of brand guidelines an
easier process for developers and designers.

## What is Storybook

Storybook is really good at two things:

1. Enables developers to create components independently.
2. Showcase components interactively in an isolated development
   environment.

It does this by creating an interactive showcase for each component.

## Using storybook within Nrwl Nx

Nrwl Nx offers Storybook out of the box, making integration an easy
process.

### Generatng configuration for Nrwl/nx

This an be done by running the following command:

```
nx g @nrwl/angular:storybook-configuration project-name
```

This will generate a storybook folder at the root of your workspace.
This will also generate a project specific folder for your application.

### Serve storybook using Nrwl Nx

```
nx run project-name:storybook  
```

### Cool Features Offered Out of the Box

Some cool features that are offered out of the box for Nrwl/Nx include
the following: