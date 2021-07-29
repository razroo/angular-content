---
title: Unit Testing Subscriptions
---

One of the more complicated things within an Angular architecture is
unit testing subscriptions. There are many scenarios within a UI
application where an observable cannot be passed directly to the html
for use with the async pipe.

The intent here, is to discuss how to unit test scenarios where
functionality is happening within subscribe block.

## Scenarios ##

I would like to bring up some scenarios where unit testing is important
within an Angular setting.

1.  We are using subscribe data for a form. So if data does exist, we
    can use the native Angular api for forms and reset the form with
    data given by the backend. If there is data, there will most likely
    be nesting. If not, null is returned. There are therefore some
    safeguards that need to be done by the front end inside of the
    subscribe block for those outlier use cases.

2.  Backend does not intend to filter for a certain scenario, as it is a
    one off dashboard, for some clients. It is up to front end to filter
    based on limited backend data.

3.  We have multiple projects for a user that they can use in their
    application. Data for the page will need to change when user selects
    a different project id. As a result, we will need to wrap data
    within the projectId we are using.

## Mocking a Facade ##

Within our facade architecture, we will be injecting the facade into our
Angular component/class. This allows us to mock the facade within our
unit test, and control how we can interact with it within the unit test.
In particular, we will always be passing in a observable, when is able
to be modified. However, what we can do, is change the dynamics of how
it becomes an observable.

Let's imagine that within our component we have a facade for the user.

```typescript
constructor(private userFacade: UserFacade) {}

ngOnInit() {
  this.userFacade.user$.pipe(
    takeUntil(this.destroyed$);
  )
  .subscribe(user => {
    this.user = user;
    this.form.reset(user);
  });
}
```

Here, we are mimicking the first scenario where we need the data for the
form reset we are using within the app. Let's say that we want to test,
that the data is indeed being passed over the user, and form reset. In
addition, want to set a safe guard, so that if a developer in the future
accidentally delete any of the lines of code:

```typescript
this.user = user;
this.form.reset(user);
```    

The unit tests will complain. So let's move over to the unit test.

## Unit Test ##

```typescript
@Injectable()
class UserFacadeMock {
  userSubject$ = new BehaviorSubject({...userMock});
  user$ = userSubject$.asObservable();
}

describe('ComponentClass', () => {
  let component: ComponentClass;
  let fixture: ComponentFixture<ComponentClass>;
  let userFacade: UserFacadeMock;

  beforeEach(async(() => {
    Testbed.configureTestingModule({
      declaration: [ComponentClass],
      provides: [
        {
          provide: UserFacade,
          userClass: UserFacadeMock,
        }
      ]
    }).compileComponents();
  }));

  beforeEach( async( () => {
    fixture = TestBed.createComponent(ComponentClass);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userFacade = TestBed.get(UserFacade);
  });
});
```

We have laid out the structure for our unit tests so that we can now
control the value of user by triggering the subject.

Let's write that unit test we meant to get around to:

```typescript
it('should properly pass in values from the subscribe block, to the' +
'component.user and component.form.reset', () => {
  const mockUserData: User = {...userMock};
  spyOn(component.form, `reset');
  userFacade.userSubject$.next({...mockUserData});
  expect(component.user).toEqual({...mockUserData});
  expect(component.form.reset).toHaveBeenCalledWith({...mockUserData});
});
```

## Dis-secting What We've Done ##

Looking back at what we've done, by hijacking the UserFacade injected
into our component and supplying it with a subject, we have given our
unit tests full freedom to test our subscribe blocks.
