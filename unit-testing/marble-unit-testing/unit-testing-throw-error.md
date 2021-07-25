---
title: How to Unit Test throwError
---

## Why I'm Writing This ## 

I’ve come across this scenario enough to know that it is a pain to test. So I’ve decided to write documentation for this, and put it here. Hope it makes your life easier.

## Background Information — When Does One Usually Use throwError? ## 

`throwError` is generally used within an Angular attempting to make an http request. For instance, let’s say you have a `userService` and you would like to pull in all users. This `userService` returns an observable, that an object for all data relating to a particular user. This data is then fed into the application vis-a-vis a `tap` or `subscribe`.

However, let’s say an error pops up, such as a bad wifi, an expired user token, or a system which is down. How can we let the application know that an error did indeed happen, and feed that data back to the “stream” to let it know that an error happened, but still return an observable. This is what `throwError` does. It returns an observable that contains a “throw Error” message.

## How to Unit Testing throwError using jasmine-marbles ##

The scenario here is that we have a method(i.e. a function inside a class), that is returning a `throwError`. We want to check and make sure that the function is indeed outputting the value passed to `throwError`.

```typescript
import { cold } from 'jasmine-marbles';
const mock404Error = {
  status: 404
}

const handleError$ = service.handleError(mock401Error);
const expected$ = cold('#', undefined, mock401Error);

expect(handleError$).toBeObservable(expected$);
```

The magic in the above code is the syntax for the `cold` marble.

1. It is using `#` as a marble, which is the equivalent of `throwError.
2. We are passing three params instead of the usual two. We keep the second param, which stands for value as undefined. We pass the value for the error to the third param. This will make it the equivalent to `throwError(mock404Error);`

As seen in the code above, we can now simply code: 

```typescript
expect(handleError$).toBeObservable(expected$);
```

and viola! Unit test complete. I hope this helps.