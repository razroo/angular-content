Introducing Nrwl Nx
===================

The Greatest Strength of Angular
--------------------------------

One of the greatest strengths of Angular 2+ ecosystem is consistency.
Due to this, Angular is more advanced and comprehensive in comparison to
other front end framework CLIs.

Angular CLI Falls Short with State Management
---------------------------------------------

One of the shortfalls of Angular's CLI is that it doesn't support state
management. It's recommended that you use `NGRX` for statement
management.

Why?

Statement management is unwieldy. For every new reducer, a new constant
file, as well as an action, effect, and proper unit testing files are
needed. Angular has its own state management system, which is not always
the greatest for larger applications. It's easy to lose states between
the different directional flows, causing unnecessary errors.

`NGRX` solves this by explicitly simplifying the process.

NX CLI
------

`NX` is built by a team called Nrwl.

The team is considered one of the thought leaders in the Angular space.
A majority of the team members are from the core Angular team and the
project can be seen as an offshoot enhancement of Angular.

Nrwl built a CLI around state management to solve the issues faced in
applications that relies heavily on data being updated at the right
place and time. The only caveat is that you need to set up the NX
Workspace in order to access the commands available through `NX`

Introducing the NX Workspace
----------------------------

A concept that the Nrwl team introduces to Angular is the idea of a
'workspace'. Historically, Google has always worked with a monorepo
mentality. An article by CACM highlights how, for the past 16 years,
Google has worked with a centralized monorepo that worked well in the
beginning. However, has the code base grew, in conjunction with the
number of developers, the cost trade-off has also increased to match.
[^1]

This idea is polarized by what's happening at Facebook's approach to
scalability. In contrast to the monorepo approach, they use a singular
repository for everything. [^2]

The benefits highlighted by the Nrwl team for breaking the monolith
includes: [^3]

1.  Unified versioning

    1.  Everything at that current commit works together

    2.  A label or branch can capture the same

2.  Promotes code sharing and reuse

    1.  Easy to split code into lib modules

    2.  Easy to consume implement that code and the latest changes to it

3.  Easier dependency management

    1.  One node\_modules for all code

    2.  One build setup (like the AngularCLI)

4.  Refactoring benefits

    1.  Code editors and IDEs are \"workspace\" aware

    2.  Can have a single commit for a refactor that spans applications
        in the domain

5.  Consistent developer experience

    1.  Ensures all necessary dependent code is available

Some of the biggest disadvantages include:

1.  Taking time to limit access to part of workspace.

2.  One upgrade in a lib, changes all areas.

3.  Make it overkill to work on a small feature.

Why We Love the Idea of a Workspace
-----------------------------------

##### Code Re-use

In any large application, code re-use is key. When workspaces are not
implemented, a separate `npm` repo is required. You also need to
coordinate libraries and shared code.

Workspaces make it easier to share code and give visibility to other
workspaces without it being a walled off application. The apps inside
the workspace can be standalone - but have the ability to tap into the
required libraries if needed.

##### It Emphasizes Smaller Modules

Using the tree directory as your referencing point can become cumbersome
over time. As a result, a workspace encourages a modular approach to
building features. This often results in smaller modules, services and
components.

Let's Begin Building The Pixel Illustrator
------------------------------------------

Let's start by installing the Angular CLI and then the Nrwl schematics
extension. There are some differences in the code structure between what
the Angular CLI generates and what the workspace creates. The schematics
work to patch up the differences so you can still use the Angular CLI
within a workspace without a hitch.

    npm install -g @angular/cli
    npm install -g @nrwl/schematics

The `nrwl/schematics` package comes with a binary for creating a
workspace.

In the directory of your choice [^4], run the following command:

      npx create-nx-workspace angularPixelIllustrator

You will be presented with a few questions. Here are the options to
choose for this project:

    ? What to create in the new workspace empty [an empty workspace]
    ? CLI to power the Nx workspace Angular CLI  [Extensible CLI for Angular applications. Recommended for Angular pro
    jects.]

This will create a folder called `angularPixelIllustrator` and will
contain the following files/folders:

    apps/
    libs/
    .angular-cli.json
    tslint.json
    test.js
    tsconfig.json
    tsconfig.spec.json

Nrwl nx notable mentions
------------------------

### apps folder

All application that we will be creating will go into the apps folder.

### libs folder

All code intended to be shared by any one of our apps, will be created
in the libs folder. It is a secret weapon.

### tsconfig, test, and linting

This is where the universal configurations for Typescript, unit testing,
and linting will live. It will be accessible and used across all
applications apps folder, in addition to all the libraries in the lib
folder.

[^1]: [Google's Mono Repo -
    https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext](https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext)

[^2]: [Facebook -
    https://code.facebook.com/posts/218678814984400/scaling-mercurial-at-facebook/](https://code.facebook.com/posts/218678814984400/scaling-mercurial-at-facebook/)

[^3]: <https://nrwl.io/nx/why-a-workspace>

[^4]: Personally, I have a directory called GithubProjects.