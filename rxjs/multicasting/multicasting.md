---
title: Multicasting
---


I've seen Netanel Basel mention this, and he is most definitely right.
Of the entire RxJS bunch, multicase operators are the most complicated
topic to understand. That is primarily because it requires an
understanding of the fundamentals of `RxJS`. Hot and cold observables is
a feature of it.

share
-----

Share will create a new observable, that shares the observable that is
was called on. A great example of this is:

    // RxJS v6+
    import { timer } from 'rxjs';
    import { tap, mapTo, share } from 'rxjs/operators';

    //emit value in 1s
    const source = timer(1000);
    //log side effect, emit result
    const example = source.pipe(
      tap(() => console.log('***SIDE EFFECT***')),
      mapTo('***RESULT***')
    );

    /*
      ***NOT SHARED, SIDE EFFECT WILL BE EXECUTED TWICE***
      output:
      "***SIDE EFFECT***"
      "***RESULT***"
      "***SIDE EFFECT***"
      "***RESULT***"
    */
    const subscribe = example.subscribe(val => console.log(val));
    const subscribeTwo = example.subscribe(val => console.log(val));

    //share observable among subscribers
    const sharedExample = example.pipe(share());
    /*
      ***SHARED, SIDE EFFECT EXECUTED ONCE***
      output:
      "***SIDE EFFECT***"
      "***RESULT***"
      "***RESULT***"
    */
    const subscribeThree = sharedExample.subscribe(val => console.log(val));
    const subscribeFour = sharedExample.subscribe(val => console.log(val));  

Within an Angular setting, this method really isn't used. The Angular
framework will internally subscribe and unsubscribe using the async
pipe. However, I personally haven't noticed any performance issues as a
result. Nonetheless something to be aware of, so when the possibility of
using `share` arises, you have something to work with.
