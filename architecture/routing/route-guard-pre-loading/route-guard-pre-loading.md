---
title: Pre-loading with Route Guards
---

In Angular, a RouteGuard is an interface that can be implemented to
determine if a given route request should be fulfilled or not. The core
purpose of a RouteGuard is to protect a route by applying authorization
to it. However, we can use a Route Guard for another purpose:
pre-loading data for a view.

 Motiviation 
------------

The reason for doing this is to change where in the request process the
loading of data happens. Instead of determining the route, rendering
view, and then loading data, we find the route, load the data we need,
and then render the view with the data already in hand. The question as
to why we want to do this?

We would change the order from A to B.

We want to change the data loading order from Figrue 1, to Figure 2.

 How It Works 
-------------

In addition to providing hooks for determining authorization,
RouteGuards provide a means for pre-fetching and caching data in the
store. This is an effect of the place that Route Guards occupy in the
processing of requests. Here's a look at a very simple Route Guard:

The canActivate() method is called by Angular to determine if the route
in question is allowed, based on the boolean return value. If we were
really using it for authorization, we could call out to a AuthService to
check a token or similar.

This simple version always allows the route to be activated.

    // Listing 1
    import { Injectable } from '@angular/core';
    import { Router, CanActivate } from '@angular/router';

    @Injectable()
    export class StoreLoadingGuardService implements CanActivate {
      constructor(public auth: AuthService, public router: Router) {}

      canActivate(): boolean {
        return true;
      }

    }

If we were concerned with authorization here, the .canActivate() method
would reach out to an authentication service to make it's determination.
For our purposes, though, lets use this code in Listing 1 to see how to
plug the Route Guard into our app architecture.

      // Listing 2
    import { Routes, CanActivate } from '@angular/router';
    import { ExampleComponent } from './example/example.component';
    import {
      StoreLoadingGuardService as LoadingGuard
    } from './auth/loading-guard.service';

    export const ROUTES: Routes = [
      //...
      {
        path: 'example',
        component: ExampleComponent,
        canActivate: [LoadingGuard]
      }
      //...
    ];

What Listing 2 says, is: when the route example is called, invoke the
LoadingGuard.canActivate() method we defined before. Right now, all that
will do is allow the route with a default return value of true. However,
we can do something more interesting by pre-loading our store.

 The Action 
-----------

Pre-loading data depends on the store being a central and persistent
object that holds application state. When modifying this state, we use
ngrx Actions, a la Redux. Below in Listing 3 is a simple Action for
loading data. This simple action allows for a load action and a load
success action for a Song data type. (Yes, that is correct, we are
pre-tending that we are building a music application, right now.)

    export const LOAD_ALL_SONGS = '[Song] Load All Songs';
    export const ALL_SONGS_LOADED = '[Song] All Songs Loaded';

    export class LoadAllSongs implements Action {
      readonly type = LOAD_ALL_SONGS;
      constructor(public payload?: any) { }
    }
    export class AllSongsLoaded implements Action {
      readonly type = ALL_SONGS_LOADED;
      constructor(public payload: string[]) { }
    }

The Store
---------

Our central state might look like the following:

      export interface State {
      songs: string[];
    }

    export const initialState: State = {
      songs: [];
    };

    export function reducer(state = initialState, action: song.Actions) {
      switch (action.type) {
        case song.LOAD_ALL_SUCCESS: {
          return Object.assign({}, state, {
            songs: action.payload
          });
        }

        // ...
      }
    }

This reducer simply applies the loaded songs to the state upon a
successful load. We will rely on this reducer to merge the data returned
by the action into the state.

The Effect
----------

In the ngrx/store style pattern, we use Effects to handle async calls:

    @Effect()
    loadAll$: Observable = this.actions$
    .ofType(song.LOAD_ALL)
    .switchMap(() => {
      return this.service.getAll()
      .map(songs => new song.LoadAllAction(songs))
      .catch(() => of(new song.LoadAllFailAction()));
    });

This is a simple effect that relies on a service (that has been
injected) to retrieve the set of songs, or invoke the LoadAllFailAction
action if an error is thrown.

Our store is in place. We can now focus on our new updated route guard.

 Modified CanActivate 
---------------------

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const loadedSongs = this.store.select(fromRoot.getSongs)
        .map(songs => songs.length > 0);

      loadedSongs
        .take(1)
        .filter(loaded => !loaded)
        .map(() => new song.LoadAllAction())
        .subscribe(this.store);

      return loadedSongs
        .take(1);
    }

This determines if the desired data is already present in the store. If
it's not, it loads that data, and then allows the route to proceed where
the view will have access to the data loaded into the central state.

 Unpacking 
----------

We use a store selector to pull the songs that are already present in
this.store.select(fromRoot.getSongs) and of non-zero length. This we
save in the loadedSongs const.

Next, we use take(1) to grab the first item in the dataset, and then
check if it's falsey with filter(loaded =\> !loaded) - the net result
being to run the .map() call on an empty dataset if the source contains
nothing. The net result is to skip loading the data in the next call if
there is already data present.

If the dataset is empty, then we map a call to the song loading service,
and subscribe the store to it's result, thereby loading the data into
the store. Finally, we unsubscribe from the source.
