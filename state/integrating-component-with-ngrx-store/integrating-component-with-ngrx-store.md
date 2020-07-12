 Integrating a Component with \@ngrx/store 
==========================================

Another chapter has been dedicated solely to integrating a component
with \@ngrx/store. This is because it is a standardized process.
Observables are notoriously known for abstracting events, and therefore
allow the same code to be repeated. The following is what can be
expected to be repeated in your application, after initially generating
files.

Just for redundancy sake, there are six steps that go into setting up
state with any given component that are handled by the nx ngrx cli:

1.  Store

2.  Action

3.  Reducer

4.  Initial State (In some other framework it might be constants)

5.  Effects

All that is left is for us to now to do three things component side:

1.  Set ups actions in view layer (i.e. HTML) + action type.

2.  Select store, so that it can be used in component.

3.  Setup subject in component, so that it can be used with actions in
    view layer.

4.  Setup reducer in component, so that it can be used with

5.  Set up subscribe in component(to transfer model to controller) [^1]

This is pretty standard and this will be done in every standard
application. It is this simple and will follow this formula.

(And yes, you should be in shock in how seamless integrating state
management technology is at this point, because I am.)

 Re-iterating purpose of book 
-----------------------------

The point of this book, is to go through the architecture of the entire
angular ecosystem. So that someone can read this book and have the
confidence that they are building their Angular app the proper way, and
that they do not have to look elsewhere. That being said, I will not be
going into the whole code base of what is happening. However, I would
like to show an example of along the lines of what will end up
happening.

 Set up action 
--------------

For our action, we are going to create an action type, and simple
action, that is taking in a payload. Your action should not be doing
anything fancy, and if it does, then you are not doing it right.

    ChooseSizeUpdated = '[ChooseSize] Data Updated'

    export class ChooseSizeUpdated implements Action {
      readonly type = ChooseSizeActionTypes.ChooseSizeUpdated;
      constructor(public payload: any) {}
    }

 Set up store 
-------------

In any given component, we must setup a select for our store, in order
to tell \@ngrx/store, how we plan on interacting with it. The following
is standard code, like the rest of this chapter, that will be repeated
throughout any \@ngrx/store process.

    this.chooseSize = store.select('chooseSize');

 Creating a subject 
-------------------

What is a subject? It is both an observable and an observer?

1.  Observer --- It has the next, error, and complete methods.

2.  Observable --- It has all the Observable operators, and you can
    subscribe to him.

Therefore, in an Angular setting, using \@ngrx/store, subjects are our
friends. It allows us to have a singular event handler, to be used by
all html event handlers within component. In addition, it gives us a
subscribe. The general pattern in an Angular app will be as follows:

1.  Create subject in component

2.  Setup ElementRefs in Component HTML

3.  Merge subjects into singular subscribe

4.  Setup Reducer for action

 Creating a Subject - Code Dive 
-------------------------------

###  Creating Subject - In Component 

      import { Subject } from 'rxjs/Subject';

      updateSize$ = new Subject();

###  Setup ElementRefs in Component HTML 

      <input matInput placeholder="Columns" #columns>
      <input matInput placeholder="Rows" #rows>
      <input matInput placeholder="Pixel Size" #pixelSize>
      <button (click)="updateSize$.next({columns: columns.value, rows: rows.value,
        pixelSize: pixelSize.value})"

We are now going to feed our updateSize subject into an rxjs merge, and
map, to make it future proof.

###  Merge Subjects into Singular Subscribe 

    merge(
      this.updateSize$.pipe(
        map((value: any) => new ChooseSizeUpdated(value))
           )
        ).subscribe(action => {
          store.dispatch(action);
      });

 Setting up a Reducer for our App 
---------------------------------

      case ChooseSizeActionTypes.ChooseSizeUpdated: {
        return { ...state, ...action.payload };
      }

 Wrapping up 
------------

We have gone through the full gamut, of what it is going to look like
adding new elements of state into your app. This is the one part with
regards to state that will have to be done manually. Who knows, maybe
down the line, we will have more sophisticated technology, that will
allow us to have a command line interface similar to what we have now
using the Angular CLI.

Next let's talk unit testing.

[^1]: A subscriber is rarely setup in the smae component setting up the
    store to begin with
