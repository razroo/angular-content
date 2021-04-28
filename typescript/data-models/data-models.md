---
title: Data Models
---

A data model is an abstract model that organizes different sorts of data
and how they relate to each other. An interface in Typescript is
essentially a data model. Coupling various functionality together is
arguably Typescript's greatest strength.

Imagine 40 functions using the same data model, which has required
properties. If we add a single required property, or change/update a
single required property, the compiler will complain on the 40 functions
that now to be updated.

This is valuable. There are many more benefits which are beyond the
scope of this chapter. However, introducing data-models does introduce
an interesting dilemma.

Dilemma with interfaces in Typescript
-------------------------------------

In any enterprise data heavy app, the majority of interfaces will be
created to be used in unison with data being retrieved from the backend.

In an Angular setting, this means that we will be using a service to
make the request. For our Pixel Illustration application, we will be
feeding the data through the entire ngrx/store pipiline for http
requests - which will look something like this: Effect \> Action \>
Action \> Reducer.

Inside of the component that will be consuming this data, we will also
need to use the interface - that is, if we want to tightly couple our
unit tests to our interface. To ensure this, we want to make sure that
there aren't any use cases that we do not test properly.

Data types can be unique. We might be missing as a result of data
type(array, dictionary, object), some particular use case. Integrating
data type with component as well is important. Keeping the following
scenarios in mind:

1.  Data Services

2.  ngrx/store pipeline (Data Access)

3.  Component (Consuming business logic)

4.  Unit Tests

What would be the ideal place for us to place our interfaces?

Data Models Directory Structure
-------------------------------

Data Models are unique in that they tie everything together. \"Data
Models\" also seems like an appropriate name for the folder containing
these interfaces.

It is important to note that not all interfaces will go into this
folder. Rather interfaces related to data being pulled in from backend,
as well as interfaces created as a result of interacting with data.

```
[libs
    [px-illustrator
      [data-models
        [src
          [lib
            [user
              [user.interface.ts,file]
              [user.mock.ts,file]
            ]
          ]
          [index.ts,file]
          [test.ts,file]
        ]
        [karma.conf,file]
        [README.md,file]
        [tsconfig.lib,file]
        [tsconfig.lib.json,file]
        [tsconfig.spec.json,file]
        [tslint.json,file]
      ]
    ]
  ]
```

Data Mocks
----------

You will notice that we have also coupled mocks with each interface.
These mocks help with unit tests. By keeping them with the interface, it
eases the ability to update when an interface is updated as well.

It's not as importance to keep them up to date, as long as the general
integrity of data is represented closely. As a rule, hooking mocks
directly into interfaces is the easiest way to ensure that unit tests
cover all use cases.
