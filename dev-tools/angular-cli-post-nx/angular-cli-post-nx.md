---
title: Using Angular CLI in an Nx Workspace
---
Now that we've finished side stepping and created an nx workspace, let's
finally get creating our app.

Run the following inside the root of your workspace folder.

```bash
ng g app angularPixelIllustrator --routing
```

This will create an app called angular-pixel-illustrator. The angular
cli will automatically convert any camel casing to dash case. The
--routing flag lets the CLI know to add routing in for you.

Now you can run your app using serve.

```bash
ng serve
```

Using ng serve will open up angularPixelIllustrator app by default. As
we add more apps into the workspace, you'll need to flag which app you
want to open.

The app will open up at localhost:8080 or localhost:4200. If you're
unsure, check your CLI console. It will tell you which localhost server
your newly minted Angular application is running on.

It's time to create our first component. For our Pixel Illustrator, we
want a form. We will name the component chooseSize.

## Wait a Minute!

Before we go ahead and create our component, we need to tidy up our
folder architecture. This is influenced by Nrwl and NX, and the example
app introduced by ngrx/platform (repo
https://github.com/ngrx/platform/tree/master/example-app).

### Sidestep...

At the time of publishing this, there is a conflict between ngrx/store
and nx folder architectural style.

While this hasn't been experienced yet in the context of this project,
having awareness can help you understand the meta nuances of building an
application.

Nx is highly opinionated in terms of folder structure. The ideology that
governs nx folder structure is that everything should be turned into its
own module. All files related to that module should be encapsulated
inside of it. This includes pipes, services, interfaces, guards, and
enums.

In contrast, when it comes to ngrx prefers turning everything a library
that can be shared across the app.

## Phew, sidestep over, moving on

Whenever we create a component, we want to encapsulate it into a local
module. That way we can add state, pipes, services, you name it, and it
will be encapsulated into that component folder.

To create our module, run the following command:

```bash
ng g module choose-size
```

Sidenote: remember, if you have more than one Angular app in your
workspace, you'll need to specify the app name so the CLI knows where to
generate the module.

To create your component:

```bash
ng g component choose-size --export
```

The --export flag allows us to use the choose-size component without
having to manually export. The above command should have created the
following file files:

```bash
new file:   apps/angular-pixel-illustrator/src/app/choose-size/choose-size.component.css
new file:   apps/angular-pixel-illustrator/src/app/choose-size/choose-size.component.html
new file:   apps/angular-pixel-illustrator/src/app/choose-size/choose-size.component.spec.ts
new file:   apps/angular-pixel-illustrator/src/app/choose-size/choose-size.component.ts
new file:   apps/angular-pixel-illustrator/src/app/choose-size/choose-size.module.ts
```
