---
title: Unit Testing Modules
---

Unit testing modules are a good little piece of architecture in Angular.
It allows you to put a number of providers into the module for unit
testing. Then you can just go ahead and import the module. In fact, even
if there is only provider being added to the module, it is still keeping
your app DRY'er - that is, Don't Repeat Yourself.

## Comparison of Using a Module Vs a Provider ##

I would just like to illustrate the point of how simple it is to use a
module vs a provider. The recommended use of a unit testing module is
for a facade. For us, we've been using a facade for our data-access
architecture.

This means that there is only one file that is required for us to
provide in our unit tests. However, lets pretend that we are attempting
to mock our UserFacade that we utilized as part of our user settings.

Our file would look like the following:

```typescript
import { NgModule } from '@angular/core';

import { UserFacade } from './+state/user.facade';
import { MockUserFacade } from './+state/user.facade.mock';

@NgModule({
  providers: [
    {
      provide: UserFacade,
      useClass: MockUserFacade,
    },
  ],
})
export class PxDataAccessUserTestingModule {}
```

If we want to mock the data that we are using within our app:

```typescript
describe('UserSettingsComponent', () => {
  let facade: UserFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PxDataAccessUserTestingModule],
    });

    facade = TestBed.get(UserFacade);
  });
  // ...
}
```

As components are wont to do, we will most likely be using the
UserFacade in a number of different locations.

## Pitfall of Using a Module ##

A module is a bit of a blackbox. We don't necessarily know everything
that is contained within it. So for any developer other than the one who
created the module, it might be a bit confusing when looking at the file
for the first time.

## Moving past the Pitfall of using a Module ##

It is important to put in place a convention for all places wherein a
module should be used.

When running through our SMAG architecture, the only place that deserves
a module, is for our data-access folder. Primarily, because our
data-services are usually only going to be used within our data-access
folder. So really a testing module only makes sense for our facade. So
as a convention, your team should always use a testing module for
facades within the context for your data-access folder.
