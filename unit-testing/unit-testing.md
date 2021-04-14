---
title: Unit Testing
---
Unit testing has always been a hot topic. Why? Because it's an
opinionated space among many software engineers. Many managers who look
as unit testing as icing on the cake.

Good unit testing difficult and requires amounts of due diligence.

What unit testing allows us to do is assure the code we are implementing
is correct. It sets testing in place so that if another developer
changes something, such as the ordering of function parameters, a class
name, or a result of a function - it will break. Unit testing can also
be set in place to make sure a certain function is called, when a button
is clicked, or in what order functions are correct. In can be set in
place as automatic self correcting code.

Unit testing can also make our code self documenting. In addition, it
can give us the confidence moving forward knowing that this will work
the way it needs.

Unit testing is a beast and is hard to manage. It isn't directly related
to quality assurance and can easily go under the radar as the app can
still function without it.

However, research has been done on unit testing and that the application
will be harder to manage long term without it.

At this point in our application, the only thing that we have created
that deserves to be unit tested are the reducers. Let's go ahead and
unit test those:

```typescript
describe('Functionality for the ChooseSizeUpdated reducer', () => {
  const chooseSizeData = {
    columns: 20,
    rows: 20,
    pixelSize: 20
  }
  it('should update the chooseSize store as is approprate', () => {
    const action: ChooseSizeUpdated = new ChooseSizeUpdated(chooseSizeData);
    const actual = chooseSizeReducer(initialState, action);
    expect(actual).toEqual(chooseSizeData);
  });
});
```

The above is an example of what a sample unit test for a reducer would
look like in the chooseSizeUpdated reducer.

## Unit Testing as a Discipline

Unit testing is difficult, because it is a different discipline. In
particular, the above unit testing that we made, is a great example of
poor unit testing. We simply tested to make sure that all fields
properly made their way over.

However, there are a number of considerations to keep in mind:

1. What happens if we insert a string, instead of a number?
2. Is there any limit on the number of rows, or columns?
3. Should there be a limit on pixel size?
4. Should there be a 1:1 ratio between rows and columns, or vice versa?

## The Irony of a Product Engineer

You might think that the above requirements are pro-offered by the
Product and to be tested by QA. However, at the end of the day, if these
issues exist it will mean that the software you created will be
lackluster. \[This indeed extends to other parts of the app, however, we
are currently focusing on unit testing]. Therefore, try to take
ownership as an engineer.