---
title: Combination
---

combineLatest
-------------

Combine latest allows us to combine multiple observables into one, and
have the subscribe emit when either of them are called. A common
enterprise example, is let's say, that we have a form. The form gives us
a search bar, but we would like to have our search bar, search against a
drop down as well.

``` {caption="search-form.component.ts"}
export class AppComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  get searchText() {
    return this.form.get('searchText');
  }

  get searchFor() {
    return this.form.get('searchFor');
  }

  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      searchText: null,
      searchFor: null,
    });
  }

  ngOnInit() {
    const searchText$ = this.searchText.valueChanges;
    const searchFor$ = this.searchFor.valueChanges;

    // combineLatest emits when any of the source observables
    // emits (provided that they have all emitted once to
    // begin with). that's why the console.logs start appearing
    // after values are selected for both form controls
    combineLatest(searchText$, searchFor$)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([searchText, searchFor]) => {
        console.log('searchText', searchText);
        console.log('searchFor', searchFor);

        // make a call to an API whenever either observable
        // emits
        // this.apiService.loadData(searchText, searchFor)
      })
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
} 
```

concat
------

One very useful use of concat within an enterprise setting, is that if
you have all of the data you need available. However, you would like to
make sure that they emit in proper order of each other. Using the
following:

``` {caption="concat-example.ts"}
import { concat } from 'rxjs/operators';

concat(printLog1, printLog2, printLog3); 
// printLog1 emits, then printLog2, and then printLog3
```

In a realistic scenario, this will come up in a situation such as we
would like to

``` {caption="search-bar.component.ts"}
export class AppComponent {
  searchStream$ = new BehaviorSubject('');

  constructor(private productsService: ProductsService) {}

  obs$ = this.searchStream$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((query) => 
      concat(
        of({ type: 'start'}),
        this.productsService.getByFilter(query).pipe(map(value => ({ type: 'finish', value })))
      ))
  );
}   
```

merge
-----

Merge allows us to \"merge\" multiple observables into one singular
observable. A great re-occuring real world example, is to group multiple
events into single observable. For instance, if we are trying to create
a music player:

``` {caption="player-buttons.component.ts"}
const start$ = fromEvent(this.startButton.nativeElement, 'click').pipe(mapTo(true));
const pause$ = fromEvent(this.pauseButton.nativeElement, 'click').pipe(mapTo(false));
const reset$ = fromEvent(this.resetButton.nativeElement, 'click').pipe(mapTo(null));

this.playerButtons$ = merge(start$, pause$, reset$, stateChange$).pipe(
  switchMap(val => {
    if(val === null) // reset 
    else if(val) // start
    else // stop
  }
);
```

By merging all of our events within a single observable, it tidies up
our code base, and allows us to deal with all of our events in a
singular fashion.

startWith
---------

There is a really old tweet by Andre Saltz, that is no longer available
for some reason. Regardless, the tweet goes something along these lines:

`startWith`, as the name implies, is a way to tell your observable to
start with a paticular value. With the advent of `behaviorSubject` which
allows you to supply the initial value, or the alternative scenario of
data being retrieved from the backend, with the use of Angular's `async`
pipe, wherein the initial value is superfluous.

However, there is one scenario wherein the `startWith` pipe does get
used alot within an Angular setting. That is in conjuction with
`combineLatest`. However, even in this scenario, I would like to argue
that `behaviorSubject` get's used more. [^1]

withLatestFrom
--------------

`withLatestFrom` will combine two observables with each other. However,
only when the value changes for the primary observable, will the
subscribe be triggered. If the secondary observable value changes, the
subscribe will not be triggered.

Let's use a common example that will occur within the enterprise
architecture set up by Razroo. Let's say that you are using
`ngrx/store`, and that you would like to determine whether, or not a
blog post exists already within our store. If the blog post already
exists within our store, then do make another HTTP request, as we have
the data we need already.

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

We are looking to see if current post already exists within our blog
store. If it does, then we do not make the request. If it does not, then
we go ahead and make the request once again.

zip
---

``` {caption="yin-yang.component.ts"}
const yin   = Rx.Observable.of('peanut butter', 'wine','rainbows');
const yang  = Rx.Observable.of('jelly', 'cheese', 'unicorns');

const combo = Rx.Observable.zip(yin, yang);

combo.subscribe( arr => console.log(arr));
// peanut butter, jelly
// wine, cheese
// rainbows, unicorns  
```

Expontential Backoff
--------------------

`zip` can be particularly useful using something called exponential
backoff. Exponential backoff is a technique wherein you retry an API
after failure. However, instead of retrying let's say every 5 seconds,
instead we increase the values exponentially after each consecutive
failure, with a maximum amount of retries. This can potentially be
really complex, but zip makes something like this alot easier:

    import { pipe, range, timer, zip } from 'rxjs';
    import { ajax } from 'rxjs/ajax';
    import { retryWhen, map, mergeMap } from 'rxjs/operators';

    function backoff(maxTries, ms) {
     return pipe(
       retryWhen(attempts => zip(range(1, maxTries), attempts)
         .pipe(
           map(([i]) => i * i),
           mergeMap(i =>  timer(i * ms))
         )
       )
     );
    }

    ajax('/api/endpoint')
      .pipe(backoff(3, 250))
      .subscribe(data => handleData(data));

    function handleData(data) {
      // ...
    }

The above code is a bit like ninja code, so let's go ahead and unpack
everything that is being done here.

1.  First we pass maximum amount of tires, and multiplier to increase
    exponentially.

2.  In our rxjs pipe, we first use `retryWhen`. This is an `rxjs`
    operator that takes in an observable, and then retries that for x
    amounts of time.

3.  within our `retryWhen` we pass a zip, so that we create x x amount
    of observable streams equal to the amount of `maxTries`

4.  We then pass the `retryWhen` index, and increase that exponentially.

5.  We then use the new value, and pipe that over to our timer, which is
    passed as the new `retryWhen` amount.

[^1]: To see why not to use startWith and go with behaviorSubject, check
    the addendum
