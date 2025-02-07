---
title: Introduction to RxJS - The RxJS Airplane
---

 What is Reactive Programming?
-----------------------------

RxJS is a library based on the concept of Reactive programming. A great
founding paper discussing reactive programming for concurrent
programming can be found
[here](http://www-sop.inria.fr/members/Gerard.Berry/Papers/Berry-IFIP-89.pdf).

It discusses the benefit of Real Time Progamming a.k.a., reactive
programming.

In it, it discusses the two main benefits of Reactive Programming:

1.  Asynchronous

2.  Deterministic

That would be reactive programming in a nutshell.

Reactive programming makes sure that one function happens after another.
By its definition of being a set of pre-made functions, it gives
stability around the way we are transforming our data in Angular. I
always did, and still love the succinct quote on reactive programming by
Andre Statlz:

[^1]

That is, RxJS allows for cookie cutter code, so that after mastering
reactive progamming, you can apply those same operators time and time
again.

How Reactive Programming Allows for Cookie Cutter Code
------------------------------------------------------

Naturally, the next question becomes, well how does reactive programming
accomplish cookie cutter code. For the sake of brevity, let's jump into
a synopsis of RxJS. More effectively, let's talk about RxJS within the
context of Angular.

 RxJS's Importance in Angular 
-----------------------------

RxJS has a pretty big place in Angular. I would say that in your average
app, I would consider it as one of the big three, alongside Typescript,
and Ngrx. Even though these are independent libraries, when working on
enterprise Angular applications, I personally come across them on a day
to day basis. So, while they are independent entities to Angular, I very
much so consider them as part of the Angular framework.

 The RxJS Observable 
--------------------

The core of RxJS, is the ability to program reactively using
observables. The easiest way to understand an observable, is that it's
like a promise that can emit multiple values, over a series of time. (A
promise is an object that may produce a single value some time in the
future: either a resolved value, or a reason that it's not resolved
(e.g., a network error occurred)). RxJS offers the ability to create
observables, as well as manipulate them. In particular, there are four
scenarios to keep in mind, when it comes to creating an observable:

1.  promise

2.  counter

3.  event

4.  AJAX request

###  Promise 

Assuming we were using Apollo client to retrieve data from our GraphQL
requests, RxJS gives us the ability to transfer data we have retrieved
from our backend into an observable:

    import { from } from 'rxjs';

    // Create an Observable out of a promise
    const data = from(fetch('/api/endpoint'));
    // Subscribe to begin listening for async result
    data.subscribe((data) => {
      console.log(data);
    });  

In the above we are using the RxJS `from` method to convert the data we
have into an observable. This way, it can be accessed using subscribe.
You might be wondering what may be the benefit of using an observable
over JSON data and a promise in this scenario. Well, the benefit would
be that if we do plan on mutating this data in the near future, then it
will be beneficial to have data available as an observable. Primarily,
when data is mutated, your front end component will register the change.
In addition, being that other parts of our application are using
observables(for instance, through the use of subject and next, which we
will get to soon), being able to have them all follow the same logic, is
beneficial to our application.

### Counter

    import { interval } from 'rxjs';

    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(1000);
    // Subscribe to begin publishing values
    secondsCounter.subscribe(n =>
      console.log(`It's been ${n} seconds since subscribing!`));

### Event

    import { fromEvent } from 'rxjs';

    const el = document.getElementById('my-element');

    // Create an Observable that will publish mouse movements
    const mouseMoves = fromEvent(el, 'mousemove');

    // Subscribe to start listening for mouse-move events
    const subscription = mouseMoves.subscribe((evt: MouseEvent) => {
      // Log coords of mouse movements
      console.log(`Coords: ${evt.clientX} X ${evt.clientY}`);

      // When the mouse is over the upper-left of the screen,
      // unsubscribe to stop listening for mouse movements
      if (evt.clientX < 40 && evt.clientY < 40) {
        subscription.unsubscribe();
      }
    });

### AJAX Request

    import { ajax } from 'rxjs/ajax';

    // Create an Observable that will create an AJAX request
    const apiData = ajax('/api/data');
    // Subscribe to create the request
    apiData.subscribe(res => console.log(res.status, res.response));

Operators
---------

### Sophisticated Manipulation

Once an observable has been created, RxJS provides operators to
manipulate the data contained within an observable. The following is a
great example. Let's say that we have an observable. In this observable,
we have data for user settings. Specifically, there are settings for
currency preferences that we would like. Within our official schema, it
looks something like this:

    {
      settings {
        currency: {
          ...
        }
      }
    }  

We would like to make sure that when we subscribe to our data store
across the application, we pull in a specific subset of data. We can map
our data within our `ngrx/store` data selector.

``` {caption="settings.selector.ts"}
const getPostsCollection = createSelector(
  getAllPostEntities,
  getAllPostIds,
  (entities: any, ids: any) => ids.map(id => entities[id])
);
```

Without having to specify what data that is every time, we can map our
data to a specific data field. Here we are using the `ngrx/entity`
library, as well as the `map` method to create a collection of entities.
Very sophisticated, and allows us to pull in all the data we need within
the observable. This keeps logic outside of individual component, and
therefore re-usable.

### Link Operators Together

RxJS also offers the ability to link operators together. For instance,
let's say within our entity we want to filter out all numbers that are
odd. Then we want to square that number:

    import { filter, map } from 'rxjs/operators';

    const nums = of(1, 2, 3, 4, 5);

    // Create a function that accepts an Observable.
    const squareOddVals = pipe(
      filter((n: number) => n % 2 !== 0),
      map(n => n * n)
    );

    // Create an Observable that will run the filter and map functions
    const squareOdd = squareOddVals(nums);

    // Subscribe to run the combined functions
    squareOdd.subscribe(x => console.log(x));  

### No subscribe, No describe

In case you didn't get that title, it's a unit testing joke. But for
real, if you do not call a subscribe on your pipe, it will never be
called. Consider the pipe as the function(which under the hood it is),
and subscribe effectively calling the pipe(i.e. calling function). So,
if pipe not being called, that might be why.

### Common Operators

One of the biggest complaints that many have about RxJS, is that it's an
overly bloated library. A while back, a man by the name of Andre Saltz
who is very much so responsible for popularizing observables within
Javascript, created a library called XStream, to focus just on the
operators one needs to use on a day to day basis. Primarily, because
some people were complaining of the vast amount of operators they
happened to learn. (One can perhaps complain on the bloat that the RxJS
library adds, however, RxJS introduced tree shaking in verson 5.5)

Ironically, what this did do, is start to create transparency around
what would be considered a common operator. The RxJS then went ahead and
started creating what would be considered common operators. The
following are common operators listed by the Angular documentation:

@ l \*4c @ Area & Operators\
Creation & `from`,`fromEvent`, `of` Combination & `combineLatest`,
`concat`, `merge`, `startWith` , `withLatestFrom`, `zip` Filtering &
`debounceTime`, `distinctUntilChanged`, `filter`, `take`, `takeUntil`
Transformation & `bufferTime`, `concatMap`, `map`, `mergeMap`, `scan`,
`switchMap` Utility & `tap` Multicasting & `share`

I like to call these operators the RxJS airplane.

We will get into these at a very high level at a later time within this
book. It's important to have this table in mind, so that you know the
RxJS operators to keep an eye out for.

Subjects
--------

It's also a worth noting the use of subjects within RxJS, as they get
used quite often. A subject, in addition to being an observable, is also
an observer. This means that we can use `next` to add a value to an
observable. Depending on type of subject, the relationship with next
will change. Three subjects come up quite common, and are worth
mentioning simply to keep them in mind.

Before we get to the different types of subjects, let's first lightly
graze what an observer is(,in addition to the observable which we are
already familiar with). An observer is simply a set of callback function
attached to an observable:

    const observer = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };  

Based on the type of callback called, that is the value the observable
will have. So a subject is this observer type, in addition to the
observable type already familiar with. With this is mind:

``` {caption="using next on our subject"}
// RxJS v6+
import { Subject } from 'rxjs';

const sub = new Subject();

sub.next(1);
sub.subscribe(console.log);
sub.next(2); // OUTPUT => 2
sub.subscribe(console.log);
sub.next(3); // OUTPUT => 3,3 (logged from both subscribers)
```

In the above code, calling next will call all previous instantiated
observables. Note the final next, which is logged from both subscribers,
whereas the 2nd next, having only one subscriber instantiated, only logs
one amount.

### BehaviorSubject

`BehaviorSubject` As opposed to a subject, allows you to supply an
initial value. It can be useful when creating something such as a
re-usable component, and want to supply an initial value. In addition,
unit testing, and want to circumvent the extra code need to use next,
when mocking values.

    // RxJS v6+
    import { BehaviorSubject } from 'rxjs';

    const subject = new BehaviorSubject(123);

    // two new subscribers will get initial value => output: 123, 123
    subject.subscribe(console.log);
    subject.subscribe(console.log);

    // two subscribers will get new value => output: 456, 456
    subject.next(456);

    // new subscriber will get latest value (456) => output: 456
    subject.subscribe(console.log);

    // all three subscribers will get new value => output: 789, 789, 789
    subject.next(789);

    // output: 123, 123, 456, 456, 456, 789, 789, 789  

### ReplaySubject

`ReplaySubject`, in addition to allowing an initial value, will also
store the old values.

    // RxJS v6+
    import { ReplaySubject } from 'rxjs';

    const sub = new ReplaySubject(3);

    sub.next(1);
    sub.next(2);
    sub.subscribe(console.log); // OUTPUT => 1,2
    sub.next(3); // OUTPUT => 3
    sub.next(4); // OUTPUT => 4
    sub.subscribe(console.log); // OUTPUT => 2,3,4 (log of last 3 values from new subscriber)
    sub.next(5); // OUTPUT => 5,5 (log from both subscribers)  

In the above code, we have given our `ReplaySubject` a buffer size of 3.
Therefore, every next we have, before instantiating another subscribe,
will introduce buffer size of 3. This can be useful for instance, when
we are using something such as a timeline, or a table of contents, need
to access to an observable, and want to keep track of all previous
selections of user.

Naming Conventions for Observables
----------------------------------

Hands down, my favorite naming convention in an Angular application is
the use of a dollar sign `$` as an indicator of an observable.
Observables started becoming popular before the use of Typescript. While
Typescript/RxJS does have the type annotation of `<Observable>` to
indicate an observable, I still approve of the trailing `$` to indicate
an observable.

``` {caption="Observable Naming Convention"}
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html'
})
export class StopwatchComponent {
  stopwatchValue: number;
  stopwatchValue$: Observable<number>;

  start() {
    this.stopwatchValue$.subscribe(num =>
      this.stopwatchValue = num
    );
  }
}  
```

### Why Dollar sign was chosen as a convention

You will notice in the above code, for the Observable `stopwatchValue$`,
we add a `$` to the end. This is to signify that this value is a stream.
In many languages such as Java, there is a concept called a stream.
While similar, there are some distinct difference such as:

1.  Observables are asynchronous as opposed to Streams, which aren't.

2.  Observables can be subscribed to multiple times.

3.  Observables are push based, streams are pull based.

Nonetheless, being that streams existed before, and have this sort of
naming convention, it bled it's way to it's cousin the observable.

### Benefits of Naming Convention

The benefits of this naming convention are two-fold:

1.  When scanning through code, and looking for observable values

2.  If you want a non-observable value to store observable value, it can
    simply have no dollar value. This can then be used without a dollar
    sign, and makes for really transparent code.

That pretty much wraps the introduction to RxJS, as I would have liked
to have been introduced to RxJS. I hope you like it, because I really
wanted to help on this one.

[^1]: This quote can be found in his excellent article on why you should
    consider adopting Reactive programming principles in your app
    https://gist.github.com/staltz/868e7e9bc2a7b8c1f754\#why-should-i-consider-adopting-rp
