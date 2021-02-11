---
title: Nrwl Schematics
---
Our Pixel Illustrator is set up with Nrwl, which means we'll need to
work with Nrwl schematics.

Setting this up is easier than setting up custom schematics within our
app. This does tightly couple our schematics with nrwl schematics, which
can sound counter-intuitive.

However, refactoring nrwl schematics into a custom schematics set up is
not hard, if your project needs to move out of nrwl.

In the previous chapters we created a schematic called the
px-schematics. All it did was generate files. For this task, we can
create our own custom angular schematics with nrwl.

## Workspace Specific Schematics

### Generate a workspace specific schematic

```
ng g workspace-schematic data-access
```

Go to /tools/schematics/data-access/index.ts, where we will add in our
custom code.

### Adding in External Schematics

```
externalSchematic('@nrwl/schematics', 'lib', {
  name: name,
  directory: schema.directory,
  tags: schema.directory ? `state, ${schema.directory}` : 'state, aero',
}),
externalSchematic('@nrwl/schematics', 'ngrx', {
  name: name,
  module,
  directory: '+state',
  facade: true,
}),
externalSchematic('@schematics/angular', 'service', {
  name: name,
  path: 'data-access',
  sourceDir: normalize(sourceDir),
  directory: schema.directory,
  app: schema.name,
}),
externalSchematic('@schematics/angular', 'interface', {
  name: name,
  path: 'data-access',
  sourceDir: normalize(sourceDir),
  directory: schema.directory,
  app: schema.name,
}),
```

First we include lib, so that we can choose which directory our
schematics should go in.

Next we include ngrx, so that state is automatically generated when we
create a data-access. As part of our data access, we would like to
create a service as well, that will act as our connector between our
GraphQL requests and our actual app.

In addition, we will be creating an interface file that will be used
across all parts of our Pixel Illustrator app.

### Adding GraphQL Files

One of the wonderful things about the Angular ecosystem is that there is
a lot of cookie cutter code that allows you to plug and play. But the
ability to create things from scratch is also a skill that gives you a
deeper understanding of the framework and codebase you're working on.

Creating your own schematics can be daunting, but the more you look at
it, the easier it is to understand how it all fits together. In a
nutshell, schematics is a file generation and templating system that
lets your team work under the same set of expectations and enforced
structure.