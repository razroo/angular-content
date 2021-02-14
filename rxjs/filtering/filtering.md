---
title: Filtering
---

debounceTime
------------

`debounceTime` means that if during the buffer time passed to
`debounceTime` method, another event is fired, it will cancel previous
stream. This is a very common use case that is used within search. It
can also be used it regular event handlers, to prevent from clicking a
submit button multiple times.(However, Angular's internal event handler
is usually pretty good at this.)

``` {caption="blog.effects.ts"}
@Effect() searchImage$ = this.actions$.pipe(
  ofType(fromBlog.SEARCH_BLOGS),
  map((action: fromBlogActions.SearchBlog) => action.query),
  debounceTime(300),
  switchMap(query: string) => this.blogService.getBlogBySearching(query))
```

The above is a common re-occuring pattern within the `ngrx/effects`
library. We will be debouncing our search, so that if a user searches
again within a given time, then it will cancel the previous observable.

distinctUntilChanged
--------------------

Adding a `distinctUntilChanged()` operator to your pipe, will make it so
that an observable is not changed if current value emitted, is the same
as the prior value. A great use case for this, is within the effect we
already used within our app.

``` {caption="blog.effects.ts"}
  @Effect() searchImage$ = this.actions$.pipe(
    ofType(fromBlog.SEARCH_BLOGS),
    map((action: fromBlogActions.SearchBlog) => action.query),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query: string) => this.blogService.getBlogBySearching(query))
```

The reason we are adding this, is that there is one use case we have not
handled yet within our stream. Let's say that a user types part of their
name `char`, proceeds to write `charlee`, and then shortly thereafter
deletes `lee`, because they decide for this site they would like keep
with their nickname `char`. The letters l, e, and were typed within the
500 `debounceTime` time limit. However, the deletion of the final letter
of `l` after the deletion of did happen after the `debounceTime`.
Adding`distinctUntilChanged` into the mix, makes it so that in this one
particular use case, the event is not fired again.

filter
------

`filter` in RxJS will very similarly to the method in Javascript, only
return those values which pass the condition. We can re-visit our code
snippet from the `withLatestFrom` example.

``` {caption="data-access-post.ts"}
pipe(
  ofType(LoadPost),
  withLatestFrom(
    this.store.pipe(select(postsQuery.getCurrentPost))
  )(this.store),
  filter([post] => !post),
  mergeMap([a] => s.getPost(a.id))
)
```

Here with are taking the currentPost. If it already exists, the filter
returns null, which makes the observable cancel itself, as the internal
engine of RxJS works.

take
----

`take` will specify how many times a value should be used. A very common
example within an enterprise setting, is to use `take(1)` to unsubscribe
from an observable.

    // RxJS v6+
    import { fromEvent } from 'rxjs';
    import { take, tap } from 'rxjs/operators';

    const oneClickEvent = fromEvent(document, 'click').pipe(
      take(1),
      tap(v => `'${v.screenX}:${v.screenY}`')
    );

    const subscribe = oneClickEvent.subscribe(clickLocation => {
      this.analyticsFacade.locationAnalytics(clickLocation);
    });
      

In the above code, we have a specific internal analytics service set up.
We want to see the first location that the user clicks on. After that
point in time, we no longer want to collect the user data. We have these
analytics set up because we want to know on average what is the most
attention grabbing part of our site.

takeUntil
---------

`takeUntil` operator will unsubscribe from the observable once it has
satisfied a certain condition. `takeUntil` is the cleanest way of
unsubscribing from an observable.

``` {caption="blog.component.ts"}
private unsubscribe$ = new Subject();

this.postFacade.blogPosts$.pipe(
  takeUntil(this.unsubscribe$);
);

ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
};
```
