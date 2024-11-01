---
title: Custom Declaration Files
---

Earlier we through all the steps necessary to fully understand what a
declaration file is. We brought up an example of the `moment.js`
library, and how they created their own declaration file. However, let's
say we needed to create our own custom declaration file, how would we go
around doing something like that?

Example Scenario - Taking a Step Back
-------------------------------------

Ok, so let's take a step back. In what situation would it arise that a
declaration file is not readily available, and we would have to create
one ourselves? It's recommended that you use the native Network
Information API for performance boosts.

It is currently experimental. As is the case with all experiemental
Javascript technology, the Typescript team has not included core type
definitions for it. So, we need to go ahead, and create our own custom
type definitions.

In addition, there will be times within your Angular application, due to
the requirements, you might need to create your own custom type
definition. This is mostly for security and potential conflict concerns.

For example, sometimes \"typings\" will be available for a particular
package, however, it might be produced by someone who you cannot trust
for your company based on security concerns.

The following is the cookie cutter process for creating a custom type
definition within Typescript in Angular.

Create a Custom Declaration File
--------------------------------

Just to re-iterate:

It is important to note that it is common practice to add the `*.d.ts`
suffix to a Typescript Declaration file. The `*.d.ts` makes it apparent
to anyone perusing through your files, that this is a decleration file.
The folder/file structure that we will be using, will drive that point
even more so.

So let's go ahead and create our typescript file. Let's also be aware of
our folder/file directory. We are going to create a lib module called
typings. Using `@nrwl/nx`

    ng g lib typings;
    "In which directory should the library be generated?": common
    "What stylesheet format would you like to use?": SASS(.scss)

In addition, within our `common/typings` folder let's create a
`network-information` folder, and a `network-information.d.ts` file.

    mkdir network-information;
    touch network-information.d.ts;

Hooking in our Declaration File to Typescript
---------------------------------------------

It is also important to note that as of Typescript 2.\* and greater, the
tsconfig.json has two properties available:

1.  `typeRoots`: Specifies the folder in which the Typescript transpiler
    should look for type definitions.

2.  `types`: Will target a specific file within your application.

Example Code as is in Nrwl Workspace
------------------------------------

In the root `tsconfig.json` file, the Angular CLI/Nrwl Nx has
automatically specify the root `typeRoots` config for use, which is
`node_modules/@types`. If we wanted, we could create our own package,
and specify another `typeRoots` to be used within Typescript.

``` {caption="tsconfig.json"}
{
  "compileOnSave": false,
  "compilerOptions": {
    "typeRoots": ["node_modules/@types"],
    "types": [],
    ...
  }
  "exclude": ["node_modules", "tmp"]
}
```

Inside of our tsconfig.json file, Nrwl Nx will automatically generate
for us the types that we will be using within our lib.

``` {caption="libs/common/services/tsconfig.json"}
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "types": ["node", "jest"]
  },
  "include": ["**/*.ts"]
} 
```

Adding Our Own Custom Type NPM Package
--------------------------------------

There are very few scenarios within Angular, where we would add our own
custom types. If you do find yourself having to add a custom type, let's
make it available to everyone - that is, let's open source our package,
and make it something everyone can use. So let's run through the steps
of creating our own NPM package.

### Creating a Github Repo

We have created a github repo entitled `network-information-types`. We
checked the box for initializing with a README, a .gitignore file for
Node,and a MIT license. We clone it locally by running:

    git clone git@github.com:razroo/network-information-types.git

### Running npm init

Next, we navigate to our newly cloned repo, and run:

    npm init -y

The `-y` tells the `package.json` that we want to use all default
options.

``` {caption="package.json"}
{
  "name": "project-name",
  "version": "0.0.1",
  "description": "Project Description",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "the repositories url"
  },
  "author": "your name",
  "license": "N/A"
}
```

### Install Typescript and modify tsconfig.json

First, let's go and install Typescript as a dev dependency:

    npm i typescript -D  

Next, let's create a `tsconfig.json` file and make it look like this:

    {
      "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "declaration": true,
        "outDir": "./dist",
        "strict": true
      }
    }  

Adding a index.d.ts File
------------------------

When creating a custom type definition file, generally we will follow a
four step process:

1.  Create Private Types

2.  Create Private Interfaces

3.  Create Public Interface

4.  Extend Public Interface, to be Used/Consumed by Typescript

In our scenario, we are creating an interface around navigator. So:

``` {caption="index.d.ts"}
// W3C Spec Draft http://wicg.github.io/netinfo/
// Edition: Draft Community Group Report 20 February 2019

// http://wicg.github.io/netinfo/#navigatornetworkinformation-interface
declare interface Navigator extends NavigatorNetworkInformation {}
declare interface WorkerNavigator extends NavigatorNetworkInformation {}

// http://wicg.github.io/netinfo/#navigatornetworkinformation-interface
declare interface NavigatorNetworkInformation {
  readonly connection?: NetworkInformation;
}

// http://wicg.github.io/netinfo/#connection-types
type ConnectionType =
  | 'bluetooth'
  | 'cellular'
  | 'ethernet'
  | 'mixed'
  | 'none'
  | 'other'
  | 'unknown'
  | 'wifi'
  | 'wimax';

// http://wicg.github.io/netinfo/#effectiveconnectiontype-enum
type EffectiveConnectionType = '2g' | '3g' | '4g' | 'slow-2g';

// http://wicg.github.io/netinfo/#dom-megabit
type Megabit = number;
// http://wicg.github.io/netinfo/#dom-millisecond
type Millisecond = number;

// http://wicg.github.io/netinfo/#networkinformation-interface
interface NetworkInformation extends EventTarget {
  // http://wicg.github.io/netinfo/#type-attribute
  readonly type?: ConnectionType;
  // http://wicg.github.io/netinfo/#effectivetype-attribute
  readonly effectiveType?: EffectiveConnectionType;
  // http://wicg.github.io/netinfo/#downlinkmax-attribute
  readonly downlinkMax?: Megabit;
  // http://wicg.github.io/netinfo/#downlink-attribute
  readonly downlink?: Megabit;
  // http://wicg.github.io/netinfo/#rtt-attribute
  readonly rtt?: Millisecond;
  // http://wicg.github.io/netinfo/#savedata-attribute
  readonly saveData?: boolean;
  // http://wicg.github.io/netinfo/#handling-changes-to-the-underlying-connection
  onchange?: EventListener;
}  
```

\[index.d.ts\]

Creating our own NPM Package (Continued\...)
--------------------------------------------

### Adding Ability to Build Typescript

We are going to be using Pika/pack within our application. It's one of
the easiest tool to use to build an npm library. It greatly eases out of
the box the need for building a package.json file.

We are going to tap into Typescript to build our application. Let's add
a build script to our `package.json` file.

    "build": "tsc"

Next, we are going to add some NPM scripts to our app so that we can go
ahead and build/test our type definitions.

More content needs to be written here:

Publishing Our NPM Package
--------------------------
