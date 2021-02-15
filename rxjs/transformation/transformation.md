---
title: Transformation
---

Transforming in RxJS is the process of modifying a value. It is quite a
common occurence within RxJS.

bufferTime
----------

`bufferTime` will collect a value until the provided time elapses. Once
time has elapsed it will emit values collected during that time as an
array. (It will not unsubscribe from the observable). A good example of
when we would want to use bufferTime, is if we want to give the user
notifications within their application. However, we don't want to flood
them with notifications. In addition, the updates within our application
are quite frequent, and are updated quite frequently. Think something
along the lines of a stock market application.

    this.notificationService.updates$.pipe(
      bufferTime(5000)
    ).subscribe(batch => {
      this.notifications = notifications;
    });  

RxJs Higher Order Mapping
-------------------------

Before we dive into these three values:

1.  `concatMap`

2.  `mergeMap`

3.  `switchMap`

It's important to note that they are all similar in one regard. It will
subscribe to an inner observable. This means that it allows for access
to the value, and will create an inner observable. This inner observable
can then be modified. Why create an inner observable? Well this get's
into something called higher order observables. Think about the way
classic promises work. Let's say we wanted to modify the data nested
twice within our promise:

    this.postService.getPosts().then(data => {
      const blogIds = data.map(data => data.id);
      this.analyticsService.analytics(blogIds).then(analyticsData => {
        this.analyticsData = analyticsData;; 
      });
    });  

In the above code, we have one promise inside of another promise. RxJS
allows us to do all of these within the same stream. It allows for the
observable stream to be more manageable and concise(i.e. avoiding nested
subscribes). These are what would be called higher order observables.

concatMap
---------

`concatMap` will map values to the inner observable, subscribe and emit
in order. Emphasis is emit in order, that is what `concatMap`
specializes in. A great way to visualize this, is let's say we wanted to
create a cascading effect within our application.

``` {caption="data-table.component.ts"}
getItems(ids: number[]): Observable<Item> {
  return from(ids).pipe(
     concatMap(id => <Observable<Item>> this.httpClient.get(`item/${id}`))
  );
}
```

In the above, the previous observable will emit first, causing a visual
waterfall effect within our app.

mergeMap
--------

`mergeMap` (similar to `switchMap` and `concatMap`), will create an
inner observable. The main difference, is that `mergeMap`, will merge
all observables into one(, as opposed to `switchMap`, which will cancel
all prior observables).

``` {caption="mergeMap example"}
  @Effect()
  loadAllBlogPosts$: Observable<any> = this.actions$.pipe(
    ofType(PokemonActions.loadPokemon),
    mergeMap(() =>
      this.postsService.getAll().pipe(
        map(posts => PokemonActions.loadPokemonSuccess({ posts })),
        catchError(message => of(PokemonActions.loadPostsFailed({ message })))
      )
    )
  );  
```

switchMap
---------

`switchMap` (similar to `concatMap` and `mergeMap`), will create an
inner observable. The main difference is that it will complete the
previous inner observable, so that only the latest observable is
re-used.

``` {caption="search-bar.component.ts"}
@Effect()
findAddresses: Observable<any> = this.actions.pipe(
  ofType(LocationActionTypes.FindAddresses),
  map(action => action.partialAddress),
  debounceTime(400),
  distinctUntilChanged(),
  switchMap(partialAddress => this.backend
    .findAddresses(partialAddress)
    .pipe(
      map(results => new FindAddressesFulfilled(results)),
      catchError(error => of(new FindAddressesRejected(error)))
    )
  )
);  
```

In the example above, we have set up our effect to handle search. It has
a

1.  `debounceTime` so that if user types multiple times within a 400
    milliseconds, it will only trigger once

2.  `distinctUntilChanged` to handle the use case wherein user deletes
    letters after typing, but returns to same word after deleting

3.  \...and then the magic! `switchMap` is used within our app, because
    once a new search is made, prior observables are no longer needed
    and can be removed.

It's interesting. While this has value, an alternative option could have
been used, i.e. `concatMap`. Due to the finicky nature of maps, and
complexity behind it, maps can also be considered as a way of
documentation. On documentation alone, it is useful to use the most
appropriate higher order observable. However, thinking about it again
now, there are always use cases that get overlooked. So choosing the
most appropriate observable, on top of unit tests, is the most bona-fide
way to sidestep potential bugs.

scan
----

`scan` actually works exactly like `reduce` does in regular Javascript
for arrays, but for observables. So, why did the RxJS team call it
`scan` instead of `reduce`? Well, it turns out there is one little
difference. `reduce` actually is an operator in RxJS as well. However,
`scan` will emit the value for every iteration, whereas `reduce` will
emit only the final value.

`scan` therefore as a combinator has more use than reduce does, because
it allows us to tap into the history of our state. (In fact, while we
won't go into that here, we can create a really low level state
management using `scan`)

So in an enterprise setting, where we already have use of `ngrx/store`,
why would scan be considered as a common operator? The truth is, that
within an enterprise Angular application, using `ngrx/store` there are
some really one of cases that use it. It is not an operator that I would
keep in mind, unless you are trying to introduce state to legacy Angular
application, that does not have state.

map
---

`map` will apply a projection to each value in source. For instance:

``` {caption="rxjs map example"}
// RxJS v6+
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//add 10 to each value
const example = source.pipe(map(val => val + 10));
//output: 11,12,13,14,15
const subscribe = example.subscribe(val => console.log(val));
```

A common occurrence within actual applications is to use map within a
`switchMap`, when using an `ngrx/effects`. That way, it returns the
`map` to the `switchMap`, and kills any other observables from
happening.

``` {caption="map example"}
@Effect()
loadAllBlogPosts$: Observable<any> = this.actions$.pipe(
  ofType(PokemonActions.loadPokemon),
  mergeMap(() =>
    this.postsService.getAll().pipe(
      map(posts => PokemonActions.loadPokemonSuccess({ posts })),
      catchError(message => of(PokemonActions.loadPostsFailed({ message })))
    )
  )
);  
```

Here we are mapping and returning an action observable to our effect.
This allows us to hook in a backend service to our general state
ecosystem.
