---
title: Life Cycle Hooks
---

Many modern frameworks and librarys involves a lifecyle - which means
there's going to be hooks. The lifecycle itself is similar in ideology -
if there's a component that's instantiated, and in between someplace, as
in about to change, and is undergoing change, or what not.

There is also always a part in the lifecycle where the component is
being destroyed/is destroyed. Angular is no different. I would like to
go through the different part's of Angular's life cycle hooks, as it
definitely is very important when it comes to development. I would also
like to discuss the top 3 most important life cycle hooks when it comes
to Angular development.

 Lifecycle Example 
------------------

Before we get into what the entire lifecycle is, it might be helpful to
visualize a lifecycle hook:

```ts
export class PeekABoo implements OnInit {
  constructor(private logger: LoggerService) { }

  // implement OnInit's `ngOnInit` method
  ngOnInit() { this.logIt(`OnInit`); }

  logIt(msg: string) {
    this.logger.log(`#${nextId++} ${msg}`);
  }
}
```

The above code is hooking into the onInit lifecycle hook. (Hook is
exactly what it sounds like. Angular will hook into that particular part
of the lifecycle, and implement a certain piece of code). When the
component is initialized, it will log out a certain message. OnInit from
personal experience is the most used lifecycle hook, so something to
keep in mind.

 Angular Lifecycle 
------------------

At this time, Angular has eight lifecycle hooks, in this order, more, or
less:

1.  ngOnChanges() - Triggered whenever Angular sets, or resets the
    data-bound input properties. It is called before ngOnInit, and
    whenever one, or more data-bound input properties change.

2.  ngOnInit() - This one was already featured in the code above! It
    get's called after Angular display data-bound properties, and set's
    the directive, or component's input properties.

3.  ngDoCheck() - This is called after an ngOnChanges, or ngOnInit. This
    was created, so that Angular can check on updates it won't check on
    it's own. [^1]

4.  ngAfterContentInit() - Triggered after html is populated. It is
    called once after the first ngDoCheck().

5.  ngAfterContentChecked() - After content in html is checked by
    Angular, this will be called. Called after ngAfterContentInit() and
    every ngDoCheck() thereafter.

6.  ngAfterViewInit() - Triggered after not only view for component is
    initialized, but child view is initalized as well. For a directive,
    will trigger once view it is in, will initialize.

7.  `ngAfterViewChecked()` - Responds after Angular checks the
    component's views and child views and the view that a directive is
    in. Called after the ngAfterViewInit() and every subsequent
    ngAfterContentChecked().

8.  ngOnDestroy() - Cleanup just before Angular destroys the
    directive/component. Unsubscribe Observables and detach event
    handlers to avoid memory leaks.

 Three Lifecycles Used Most Often 
---------------------------------

The three lifecycles that are used most often are:

1.  ngOnChanges()

2.  ngOnInit()

3.  ngOnDestroy()

When a component initializes, usually we subscribe to some data that we
have(if not familiar with subscriptions no worries, will get to that
soon.). Sometimes, if we are working with a graphical compoent, for
instance, like a chart, we would like to update the component whenever
we get new data passed into our input. In addition, subscriptions that
we pass in from the outside, mainly using state, will still stay around,
and soak up our web application's memory. So, it is also quite a common
occurence to use `ngOnDestroy()` to manually destroy subscriptions.

Angular documentation presets an example on what lifecycle hooks look
like in real time. It is low key incredible, and you should check it out
[here](https://stackblitz.com/angular/lpdbkmkrryv).

There is more detail to go into with regards to these lifecycles.
However, I strongly believe that a fundamental perspective, by reading
this you know everything. This book will discuss important points of
Angular architecture regarding these hooks, and they can be see here: //
Places to put data for hooks can be seen here.

[^1]: Example of what that would look like should go here.
