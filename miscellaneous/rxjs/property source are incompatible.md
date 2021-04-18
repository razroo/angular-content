---
title: Types of property source are incompatible
---

## The issue: RxJS Error

Without calling out any company, or open source team, I use some libraries that meddle with the RxJS I have in my repo. In particular, their library will use a version of RxJS that is not compatible with the version of their library. Causing the effects in my ngrx/store to emit the error:

```ts
RxJS Error: "Types of property 'source' are incompatible"
```

Here is how to solve that.

## How to Solve

There is a simple solution that works, but it took me a while to find it. 
I can assure you this is the most efficient solution. Add the following 
configuration paths property into your app's `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist",
    "sourceMap": true,
    "declaration": false,
    "module": "esnext",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es2015",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2017",
      "dom"
    ],
    "paths": {
        "rxjs": [
          "node_modules/rxjs"
        ],
        "rxjs/*": [
          "node_modules/rxjs/*"
        ]
    }
  }
}
```

This will make it, so that whenever your app looks for anything rxjs related, 
it will be directed to the rxjs node_module. Not some alternate rxjs path, 
contained within a plugin. Once you do this, re-run your npm/yarn start and 
you will be good to go.


