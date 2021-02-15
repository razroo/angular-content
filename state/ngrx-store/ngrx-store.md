---
title: State Management - @ngrx/store
---

Ngrx/store is a layer on top of Redux.

It is a state management tool that was originally created, in order to
solve two way binding performance issues within Angular. It then
extended as a way to bring redux to Angular with the use of Observables.

Let's dive into integrating \@ngrx/store into our app.

 Using nx ngrx to Generate State 
--------------------------------

###  Create root state using nx ngrx 

First we are going to generate an empty root, for our StoreModule, as
well as our EffectsModule.

Our StoreModule is responsible as a singular store object,which will be
holding all of store data. Our EffectsModule is a singular effects
object, which will be holding all of our effects.

``` {language="Bash"}
ng generate ngrx app --module=apps/angular-pixel-illustrator/src/app/app.module.ts --onlyEmptyRoot
```

###  Create component state using nx ngrx 

Next, we are going to create state for our choose-size component. This
is done with ease using nx ngrx.

Run the following command:

``` {language="Bash"}
ng generate ngrx choose-size --module=apps/angular-pixel-illustrator/src/app/components/choose-size/choose-size.module.ts
```

This will generate the following files:

``` {language="Bash"}
create apps/angular-pixel-illustrator/src/app/components/choose-size/+state/choose-size.actions.ts (684 bytes)
create apps/angular-pixel-illustrator/src/app/components/choose-size/+state/choose-size.reducer.ts (869 bytes)
create apps/angular-pixel-illustrator/src/app/components/choose-size/+state/choose-size.effects.ts (859 bytes)
create apps/angular-pixel-illustrator/src/app/components/choose-size/+state/choose-size.effects.spec.ts (1070 bytes)
create apps/angular-pixel-illustrator/src/app/components/choose-size/+state/choose-size.reducer.spec.ts (364 bytes)
```

And update the choose-size module,

``` {language="Bash"}
update apps/angular-pixel-illustrator/src/app/components/choose-size/choose-size.module.ts
```

###  High level overview of nx ngrx 

So, you might be wondering, what do those files that nx ngrx generated
actually do? It will generate three files:

1.  Action

2.  Reducer

3.  Effect

In addition, nx will add Typescript enums for the action types. It will
also add a respective spec file(unit testing) for the action + reducer
file.

[]{style="background-color: darkgray"}

Unit testing an action, would simply say when an action is dispatched,
expect it to be of a certain type. However, enums, as well as type
checking, fulfills that obligation. Therefore, if one is using
Typescript along with enums, there should be no reason for writing unit
tests.

###  Installing Redux Dev Tools 

A state environment is incomplete without proper devtools. In
particular, beingable to see an action fired, as well as the complete
state of any given time,is invaluable.

Google, \"redux Devtools\" It is offered by remotedev.io.

With the chooseSize ngrx nx command, we just made, you should see
something like this:

![image](state/ngrx-store/redux-store){width="13cm" height="9cm"}
