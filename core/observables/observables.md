---
title: Observables
---

Observables are an integral part of any Angular application. There is no
way around not using observables there is some form of state management
within your application.

If your backend is using GraphQL + Apollo, your application is sure to
be using observables.

The reason observables are so popular and has made its way into
mainstream Angular is because it is so intuitive to use. An observable
will consist of two things:

1.  Publisher

2.  Subscriber

Think of a publisher as a way of saying here is the data, I want you to
watch. When something does indeed change, pull the data from the
subscriber. This allows for the publisher to take place in one piece of
your code, pass that through a facade of sorts, and then consume it in
another file.

 Rxjs - An Observable Example! 
------------------------------

We will be using `rxjs` as our library to create observables. It is used
internally by many Angular libraries, and for good reason. Functions are
imported as are any other Javascript/Typescript library. rxjs is a part
of the larger ReactiveX ecosytem. Once you've got rxjs figured out, you
can transfer your knowledge to other frameworks and languages such as
Java, Swift and Python.

    import { from } from 'rxjs';

    // Create an Observable out of a promise
    const data = from(fetch('/api/endpoint'));
    // Subscribe to begin listening for async result
    data.subscribe((data) => {
      // emit data returned from endpoint
     console.log(data);
    });

In the above code, we are using the native rxjs `from` function to turn
our code into an observable(this is what we defined earlier as a
publisher). We then subscribe to the publisher/observable, so that when
the data request completes, and the data is pulled in, the subscriber
will now emit the data, and make it available for the app to consume.

 Operators and Pipes 
--------------------

One of the most powerful features of rxjs, is that it offers the ability
to combine operators to allow for sophisticated manipulation of
functions. While this is not a real world example, it definitely helps
in order to better understand how pipeable operators work in the real
world:

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

In the above code, we are using two separate operators and chaining them
within our pipe. First we pull in odd values using the filter, then we
multiple files using the map. This can be a powerful way of using
chained operators within rxjs.

 Common Operators 
-----------------

Rxjs is full of numerous operators. However, there really are only a
certainamount of operators that are used.

@ l \*4c @ & Operators\
Creation & from, fromEvent, of\
Combination & combineLatest, concat, merge, startWith , withLatestFrom,
zip\
Filtering & debounceTime, distinctUntilChanged, filter, take, takeUntil\
Transformation & bufferTime, concatMap, map, mergeMap, scan, switchMap\
Utility & tap\
Multicasting & share\

 Naming Conventions for Observables 
-----------------------------------

A very popular convention for writiing observables within Angular, and
reallyany setting is add a trailing `$` to the end of the variable.

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

In the above component, `stopwatchValue$` is visibly an
observable,because it has the dollar sign. Why a dollar sign you ask?
It's a clever way of appending an \"S\" to the end of a variable, and
signifying that it is special. The s stands for stream - which is a
sequence of values over time.
