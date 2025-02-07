---
title: Marble Unit Testing
---

Unit testing observables, in fact, with observables is never really
easy. It's not the logic you would come across in other parts of your
application. In relationship to regular logic, where you have the option
to simply console out logic and see what is there immediately, you don't
have that option with observables.

Observables are a stream. It is an object with a series of functions. An
Observable as a stream contains more than one snippet of data in it's
entire lifecycle.

## Marble Unit Testing - A Primer ##

Marble unit testing is a very efficient way of unit testing observables.
It keeps in mind the following:

1.  Recognizing that an observable stream can emit any number of values
    after a specific set of time.

2.  An observable is always observing until actually complete

3.  It can emit a number of different things at the same time, or at
    completely different times.

## Great Example ##

Let's imagine that we get back a specific set of data as an observable.
However, within that set of data, we only want ids. Backend is tied and
they do not have the capacity to give us a pre-populated set of data for
id. Our code will look something like this:

```typescript
userIds$: Observable<string[]> = this.users$.pipe(
  map(users => {
    return users
      .map(user => {
        return user.id;
      })
  })
);
```

### Creating a unit test

In our unit test, we would like to make sure that when we pass a set of
data, id's are indeed being extracted and returning a new array. We can
do something as follows using marble tests:

```typescript
const usersMock: User[] = [
  {
    id: '123',
    name: 'Charlie',
  },
  {
    id: '246',
    name: 'Lisa',
  },
  {
    id: '369',
    name: 'Harley',
  },
];

it('should return buyer data for tier', () => {
  const expected$ = hot('(c|)', { c: ['123', '246', '369'] });

  expect(component.buyerTiers$).toBeObservable(expected$);
});
```

In this unit test, we expect our function to return.

```
['123', '246', '369']
```

As we are unit testing against an observable, we can potentially use
subscribe, to emit the value of the component function we are testing.
However, this can get a bit cumbersome, as it is a bit of code, and
throwing subscribes into a unit test can go curious places. In our
marble unit test, we can simply say that we have a hot observable that
contains x amount of values.
