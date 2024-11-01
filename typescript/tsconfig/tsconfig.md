---
title: Tsconfig
---

 What is the Tsconfig? 
----------------------

The tsconfig file corresponds to the configuration of the Typescript
compiler.

 What the Default Tsconfig Looks Like. 
--------------------------------------

Angular CLI will generate a tsconfig out the box:

      {
        "compileOnSave": false,
        "compilerOptions": {
          "sourceMap": true,
          "declaration": false,
          "moduleResolution": "node",
          "emitDecoratorMetadata": true,
          "experimentalDecorators": true,
          "target": "es5",
          "typeRoots": [
            "node_modules/@types"
          ],
          "lib": [
            "es2017",
            "esnext.asynciterable",
            "dom"
          ],
          "baseUrl": ".",
          "paths": {
            "@angularPixelIllustrator/*": [
              "libs/*"
            ]
          }
        },
        "exclude": [
          "node_modules",
          "tmp"
        ]
      }

 Notable Mention 
----------------

###  sourceMap 

Setting the source map to true will help debugging while using the
console in the browser.

When debugging unit tests, it will cause some issues to crop up.
Sometimes, it's easier to switch it to false until you want to get back
into debugging again. Alternatively, you can use the npm script for npm
run test using.

      --source-maps=false

 Using paths 
------------

For our current set up, we are using a mono repo. If we were to pull
components from within the lib folder, it would result in a overtly long
relative path.

However, tsconfig has an option to specify a specific path. If you look
above, in the tsconfig, you will notice that there is a default path for
libs called the angularPixelIllustrator.

In most cases the default name will suffice. However, in our scenario,
let's shorten the lib path. Here's how you do it.

    +      "@ill/*": [
    -      "@angularPixelIllustrator/*": [

Now when we'd like to import a module/component from the lib folder from
within our app, all we have to do is the following:

    import {module} from '@ill/color-picker';
