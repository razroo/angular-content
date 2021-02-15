---
title: Barrel File
---

 What is a Barrel File? 
-----------------------

A barrel File is a way to roll up exports from several modules into a
single convenience module.

The barrel itself is a module file that re-exports selected exports of
other modules.

![image](typescript/barrel-file/monkey-barrel){width="9.1cm"
height="3cm"}

 Barrel File In Practice 
------------------------

In the previous chapter we discussed doing something like the following:

    import {module} from '@ill/color-picker';

We are able to do this, because the nrwl nx layer on top Angular CLI,
will generate an index.tx file. This contains all the imports. Anything
that is within the component, that should be exposed outside the lib,
should be put in the index.ts - aka, the barrel file.

``` {caption="index.ts"}
export { IllColorPickerModule } from './src/ill-color-picker.module';
```

 Enforcing Barrel File With Tslint 
----------------------------------

In addition, Nrwl nx has a tslint add on called
nx-enforce-module-bounderies.

    // tslint.json
    "nx-enforce-module-boundaries": [
          true,
          {
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "*",
                "onlyDependOnLibsWithTags": [
                  "*"
                ]
              }
            ]
          }
        ],

Adding true as a parameter will make the tslint complain whenever we are
not using the barrel import when accessing a lib file.
