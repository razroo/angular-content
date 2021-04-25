---
title: Dependency Graph
---
A dependency graph is a simple way of seeing which components are
dependent on one another. The purpose is to show relationships and how
components are structured to form the overall architecture of your
application.

It can be generated in your console using `npm` commands. This allows
you to see parent child relationships at a glance. It also lets you see
how a component is reliant on another.

The following are the benefits of using a dependency graph:

1. Make sure app is following Parent/Child Component architecture.
2. Allows us to see what components are dependent on the one we are
   working on, so that we may run linting, or unit testing only, based
   on these components.
3. Visualize all components in use across app.

## Create a Dependency Graph

You can create a dependency graph using `npm`. You can generate a
dependency graph using `compodoc`, but this is usually regulated to demo
mode. When in development, if you're using `nx`, `nrwl` comes packaged
with a dependency graph.

```bash
  npm run affected:dep-graph;
  npm run dep-graph;
```

This will show you something like:

TODO
```
\*\*\*(Image of dependency graph goes here)\*\*\*
```


## Using Dependency Graph

```
// TODO will get around to soon enough !
```
