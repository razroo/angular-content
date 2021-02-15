---
title: Primer - Actions
---

An action is a function which contains two very important pieces of
information:

1.  What the name(type) of the action is. [^1]

2.  The payload of the action. Which is a single object, containing all
    the data passed into the store.

An example of an Action in an Angular setting
---------------------------------------------

An Action is pretty generic across different frameworks. However, within
an Angular setting it means that we are using \@ngrx/store for
controlling state across our app and Typescript. An action will look
like the following:

    export class LoadCodeBox extends Action {
      readonly type = CodeBoxTypes.LoadCode;

      constructor(public payload: {id: string}) { }
    }

    export class CodeBoxLoaded extends Action {
      readonly type = CodeBoxTypes.LoadCode;

      constructor(public payload: CodeBox) { }
    }

This is an example representation of your classic action. It contains
the type of action. So that in you reducer, or effect, we can trigger
reduce(combine) data passed in, with data already present.

An example of using an Action in an Angular setting
---------------------------------------------------

Generally, an action will only be used in a variety of situations such
as an effect, facade, or guard. As a simple example, let's use it in a
facade.

      loadCodeBox(id) {
        new LoadCodeBox({id})
      }

Here we are calling the class by using new. It will call the action
whenever the facade is called.

This would be as simple as a primer can get for actions. It might seem
like there are more questions that came up as a result.

[^1]: Why this is important we will get to soon
