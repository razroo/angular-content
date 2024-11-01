---
title: Angular CLI
---
*The code created in this chapter are examples only and is not part of
the Razroo Employee Dashboard we'll be building. You can still follow along, 
but just take note that we'll start the creation of the Razroo Employee
Dashboard in the next chapter.*

The Command Line Interface - or commonly known as the Angular CLI - is
"responsible for automating away many of the challenges and headaches
that come with being a developer in 2017. By starting with a
configuration that works out of the box, baking in best practices that
have been discovered by the community over time, and by helping you
build more maintainable code, the CLI exposes some of the most powerful
capabilities of Angular in a way that is easier to get started, and
easier to get moving quickly when compared to rolling everything
together yourself."

Here are some commonly used CLI actions that can help speed up your
workflow:

* Create an application out of the box: `ng new dream-app-name-here`
* Generate a module: `ng generate module module-name`
* Generate a component: `ng generate component component-name`
* Generate a route: `ng generate route route-name`
* Generate a service: `ng generate service service-name`
* Serve application: `ng serve`
* Test application: `ng test`
* Lint application: `ng lint`

Here's a quick starter tutorial on how to use Angular CLI for a brand
new sandbox project. Start by installing Angular CLI using the following
command:

```bash
npm install -g @angular/cli
```

Inside the directory that you want to generate your application, run the
following:

```bash
ng new pixelIllustrator --service-worker
```

Using the CLI will help save us time by generating all the necessary
minimum files and folder structures required to create a robust Angular
application. The above commands will generate the following folders with
files as illustrated below: [^2]

\[system [e2e ] \[Node Modules ] \[src [app] \[assets]
\[environments] ] \[tests ] ]

## Ng New Notable Mentions

##### End to End Integration

Created for us is an e2e folder. We will be using this for integration
tests.

##### Linting

A `tslint.json` has been created. We can add linting rules that we so
choose here,and run linting using `ng lint`

##### App folder

Inside of the `src` folder, a folder has been created for styling,
components, modules, and unit testing. When you want to add a feature,
component, or any kind of code, you add it to this file directory.

##### Assets Folder

Any images, fonts, additional non-code asset go in this folder. When you
use the CLI to build for production, the CLI will automatically transfer
your assets over with the correct filepaths.

## Hold on - It's not going to be that easy

The Angular CLI is fantastic. It's removed a tremendous amount of effort
to bootstrap a project in to existence. It sets up your TypeScript,
Observables, routing, and styling. But there's more to Angular than
these things.

However, Angular CLI won't code your actual app for you. The purpose is
to expose and present to you the most powerful parts of Angular - but it
isn't the full package. Here are some things that are important but
excluded from Angular CLI:

* State Management
* Sass(The CLI will give us the option to do so)
* Workspace(Creating a mono repo using Nrwl Nx)
* Library(Also going to be created using Nrwl Nx)

We'll revisit the CLI again shortly when we begin building our
application. But before we get there, lets talk about `Nrwl Nx` and set
up our workspace.
