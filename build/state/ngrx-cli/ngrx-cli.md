 Ngrx CLI 
=========

Nrwl Nx cli is one of the best things you can do for your Angular
workflow. If you are using Nrwl Nx already and have a mono repo setup
within your organization, then it should be readily available.

 Why Use a CLI? 
---------------

One of the benefits of using a CLI is that it subtly enforces the entire
team to use a particular convention. With the Nx CLI for ngrx, this is
true as it strongly enforces conventions to be used as to how ngrx
works. In addition, within the ngrx arena it strongly enforces how
certain files should be built.

 Why use a CLI for ngrx 
-----------------------

Without a doubt the most frustrating thing about Angular before the CLI
came around is the amount of boilerplate that would be required in order
to work with Angular. As an example, having to create a scss + html +
action +reducer + effect and respective spec file for each next
component created.

The Nrwl Nx for the most part solves this. There is much more that can
be done on top of this in the future. Think of it as an automatically
generated code-based.

The two stages of Nx ngrx cli
-----------------------------

There are going to be two stages with regards to using the Nx ngrx cli.

One is to create root state.

This is going to be empty, and it is just there to hold the feature
reducers of the rest of the app.

The second stage is creating a feature reducer. Creating a root reducer
is something that you would only have to worry about if you are the one
responsible for creating the project for the first time.

Creating a Root State
---------------------

The whole idea of state in ngrx/store is that there is a single object
and all subsequent pieces of state are sub piece of state. Therefore all
pieces of state will be contained in a single object.

In order to have this done in your code, you will need to set up state
for your root, so that subsequent pieces of state can be added as child
object(feature), to the root state. This will only have to be done once.

In order to create a root reducer:

``` {language="Bash"}
  ng generate ngrx app --module=apps/<app-name>/src/app/app.module.ts --onlyEmptyRoot
```

Note, we have passed in the flag for onlyEmptyRoot, so that none of the
files for actions, reducers, and effects are created.

We simply want a module generated that we can use to import other
modules for state.

This will produce the following files:

Creating Feature State
----------------------

1.  libs/\<libname\>/src/+state/products.actions.ts

2.  libs/\<libname\>/src/+state/products.effects.ts

3.  libs/\<libname\>/src/+state/products.effects.spec.ts

4.  libs/\<libname\>/src/+state/products.reducer.ts

5.  libs/\<libname\>/src/+state/products.reducer.spec.ts

There is also the option to add a facade, which is highly recommended.
In addition, creating a separate selector file is extremely valuable.
