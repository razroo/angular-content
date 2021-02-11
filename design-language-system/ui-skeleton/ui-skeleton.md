  
============
---
title: UI Skeleton
---

Real data, very rarely, will be immediately available.

Even if your app has a very quick backend service, due to other web
applications the user might be using, bandwidth can affect the time it
takes to load.

It can be a very uncomfortable experience for the user if they are
unaware of what is happening. That's why loaders are important.

Within a design language system, a UI Skeleton, or Ghost Elements, as it
should probably be called, is a good idea.

It often comes in the form of gray boxes marking out the UI components
awaiting action. It gives the user a rough indication that something is
coming soon. It is a very simple way of easing anxiety of the user, and
allowing them to be aware of all times, that something is loading.

 One True Way of Implementing Ghost Views 
-----------------------------------------

There are three options of implementing Ghost Elements.

1.  Creating an Overlay Ghost Element

2.  Creating an Inline Ghost Element

3.  Inline Ghosts with Async Loads

Why not to use an Overlay Ghost Element
---------------------------------------

I would personally not recommend using an Overlay Ghost Element. It
requires that developers determine when Ghost it removed. In addition,
it requires for layouts to match the "Real" DOM layouts. However, DOM
layouts are changing all the time, and this solution is not a good long
term solution. Most definitely not an enterprise solution.

 Why not to use an Inline Ghost Element 
---------------------------------------

There is an option to have a css only option. That is, that the css
class changes based on whether, or not the data is available. The only
real issue with this solution, is that it will be more of an off/on
switch with regards to transitioning between a ghost element and an
inline element.

 Why use Inline Ghosts with Async Loads
--------------------------------------

This is a very sophisticated solution, which I first saw from a one
Thomas Burleson. The idea, is that we create a queryState function:

    /**
     * Wrapper function to easily determine async state
     */
    export function queryState<T>(item:AsyncItem<T>) {
      return {
        isPolling : (item.state === AsyncItemState.POLLING),
        isLoading : (item.state === AsyncItemState.LOADING),
        isLoaded  : (item.state === AsyncItemState.LOADED)
      };
    }

Then, inside of our component, we can go ahead and call the queryState
within our component.

    export class UserListComponent {
      state = queryState;
      user$ = this.facade.users$;
    }

Here, we can create numerous states including polling. This is a more
robust solution than using plain css.

 Ghost Elements Always? 
-----------------------

There are scenarios wherein a ghost element might not be the ideal
scenario.

Key Take Aways
--------------

1.  Angular Animations can be implemented as re-usable recipes.

2.  AsyncItem is a general pattern used to decorate server entity items
    with 'client side data state'

3.  Each Ghost component is a custom component crafted for that specific
    component. The odds of it being re-usable is next to none.

4.  Ghost grades and annimations are re-usable.

Ghosts might simply be css.
