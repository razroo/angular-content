---
title: Introduction to @ngrx/store
---

There has been quite a series of progression with regards to state
management. Redux is the mature concept of state management including
actions, reducers, and a single application store. Angular's
\@ngrx/store, which is not front and center, is where redux meets Rxjs.
Rxjs is the JavaScript library for using observables.

What Makes \@ngrx/store Different than Redux?
---------------------------------------------

When considering this question, it is more important to consider what
reactive programming is. Reactive programming in particular introduces
two concept[^1]:

1.  Asynchronous - meaning one event fires after the previous one is
    complete, unlike synchronous which means they all fire at the same
    time, and might complete out of order.

2.  Deterministic - Always produces the same results. As a sideeffect of
    this, code becomes very much so cookie cutter, which is great in an
    enterprise setting, as it allows for greater re-use.

### Asynchronous

With regards to asynchronous programming, observables are not
necessarily reactive in the strictest sense.

This is because the client is working separate from the server. Events
with observables are most definitely reactive, and help, but many
applications are data heavy, and the immediate value ofobservables are
cut short. In addition, actual UI events from a browser perspective are
put in a call stack, and are asynchronous by nature. What does help, is
that baked into the framework is effects. Which does allow the UI to be
asynchronous, but it's not like it's anything crazy. This is something
which could easily be done with promises. However, \@ngrx/store doestie
it nicely into the store as a whole, allowing client state management,
without going into detail.

### Deterministic

When it comes to deterministic, this generally means in computer
science, that with one particular input, you will always have the same
output. However, when the term is used loosely, it generally means that
the code is cookie cutter.That is, that it can be re-used time and time
again.

Wrapping Up
-----------

This is really what \@ngrx/store tries to produce over other frameworks.
It offers the ability to re-use patterns time and time again. In
addition, by hooking it into the Rxjs lifecycle through observables, it
allows patterns and for code to be cookie cutter. This is really the
beauty of \@ngrx/store - it offers a end to end solution to for state
management. In particular, in the form of effects and observables.

[^1]: http://www-sop.inria.fr/members/Gerard.Berry/Papers/Berry-IFIP-89.pdf
