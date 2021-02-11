 Facade Pattern 
===============

 What is the Facade Pattern? 
----------------------------

The facade pattern is a classic. Anyone who has read the GoF book knows
that it is a mainstay of computer science. Quoting from the GoF book:

 A Look at your Typical Non Facade State Pattern 
------------------------------------------------

This pattern is particularly advantageous when it comes to ngrx actions.
Let's imagine we have the following action:

      // choose-size.actions.ts
    export class LoadChooseSize implements Action {
      readonly type = ChooseSizeActionTypes.LoadChooseSize;
      constructor(public payload: any) {}
    }

Now any time that we have to call an action we have to do two things:

1.  Have a store select within the component.

2.  Call a dispatch.

<!-- -->

      chooseSize: Observable<any>;
      // choose-size.component.ts
      import { Store } from '@ngrx/store';
      constructor(private store: Store<any>) {
          this.chooseSize = store.select('chooseSize');
      //..
      merge(
        this.updateSize\$.pipe(
          map((value: any) => new ChooseSizeUpdated(value))
        )
      ).subscribe(action => {
        store.dispatch(action);
      });

This is quite a bit of overhead. Using the facade pattern let's see if
we can simplify this process

 Create the Facade Service 
--------------------------

With a facade pattern, we have the ability to take the following two
items:

1.  Store select

2.  Call a dispatch.

and put them into the into our facade.

The facade should be treated as a service, and we will create a service
folder for our facade to go into.

The facade pattern looks like the following:

    export class ChooseSizeFacade {
     constructor(private store: Store<any>) {}

     chooseSize$ = this.store.select('chooseSize');

     UpdateChooseSize(ChooseSizeFormPayload): void {
       this.store.dispatch(new ChooseSizeUpdated(ChooseSizeFormPayload));
     }
    }

 Hooking Facade Into Component 
------------------------------

Now to call our action, all all we have to do is call the
ChooseSizeFacade service, and appropriate method.
