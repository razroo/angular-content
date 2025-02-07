---
title: Data Access Folder/File Structure
---
 Data Access 
============

When working within a GraphQL app, having a manageable way of accessing
data is important.

 Data Access Folder/File Structure
---------------------------------

    buyers
      state
        src
          lib
            data-access
              buyer.interface.ts
              buyers.service.spec.ts
              buyers.service.ts
              buyers.fragments.ts
              buyers.mutations.ts
              buyers.queries.ts
            +state
              buyers.actions.ts
              buyers.effects.spec.ts
              buyers.effects.ts
              buyers.facade.spec.ts
              buyers.facade.ts
              buyers.reducer.spec.ts
              buyers.reducer.ts
              buyers.selectors.spec.ts
              buyers.selectors.ts
            buyers-state.module.ts
        index.ts

 Data Access Deep Dive
---------------------

There are really four parts in one with regards to this folder/file
structure. They are:

1.  GraphQL

2.  Models

3.  Service/Facade

4.  State

 The Data Access Life-Cycle
--------------------------

The first thing is to specify fragments and queries for the GraphQL
request. At this time, one is to specify the the interface, which is a
UI carbon copy of the fragment. Next step is to create a service that
will be used for the GraphQL request. It will supply the proper params
for the GraphQL request. Then depending on the type of component that
the data will be used for. Creating an effect that will be used in
conjunction with the facade for providing data, that can be used across
the app is appropriate.

This is a standard process with regards to loading data, that allows for
repeating the process time and time across the app. In addition, it
tightly couples the elements of your app together. For instance, it will
use a singular interface across the app, which will then be able to be
used in unit tests, and actual app alike. Therefore, one can continue
mocking one's services, and by using interfaces make sure the data
passed through across different parts of app is the same.
