---
title: RxJS Pitfalls
---

RxJS is a powerful library to use. With that power, however, comes a lot
of complexity. With that complexity comes a lot of ways to get into
trouble. In this chapter, We will go through the most common pitfalls to
look out for when using RxJS. In addition, tips on how to avoid them, as
well as linking to external resources when I can.

 Mishandling Subscriptions
-------------------------

Alain Chautard calls this "Subscribing too early" within his [RxJS
pitfalls
article](blog.angulartraining.com/5-rxjs-angular-pitfalls-to-be-aware-of-160adfd402d8).
Essentially, this arises when you're writing a function whose
asynchronous behavior is of interest to a piece of calling code. The
problem arises when, within the implementing function, you subscribe and
handle side effects within an Observable that would have been of
interest to the caller.

In his article, Chautard shows us a LoginService class that has a
`login()` method which subscribes to the Observable returned by `put()`.
It looks something like this:

    /**
    * As seen within https://blog.angulartraining.com/5-rxjs-angular-pitfalls-to-be-aware-of-160adfd402d8
    */
    @Injectable()
    export class LoginService {
      constructor(private http: HttpClient) {}

      login(username: string, password: string) {
        this.http
          .put('http://localhost:8000/login', {username, password})
          .subscribe(data => {
              this.currentUser = username;
              this.authToken = data['token'];
          });
      }
    }  

Notice how any caller using `login()` would have no way of knowing when
the login was successfully completed. Furthermore, all error handling
would have to be handled by the LoginService code, which leads to a bad
separation of concerns. This happens because the code subscribes to the
observable at the call site, and does not give the client any way of
being notified of changes.

One thing we could do to fix this is return the Observable outright,
passing all data along to the client.

    @Injectable()
    export class LoginService {
      constructor(private http: HttpClient) {}

      login(username: string, password: string): Observable<{currentUser: string, authToken: string}> {
        this.http
          .put('http://localhost:8000/login', {username, password})
          .pipe(
            map(data => ({
              currentUser: username,
              authToken: data['token'],
            }))
          );
      }
    }  

Notice here that, rather than subscribing to the returned Observable
from `put()`,we use the map operator to return both the username and the
auth token to the caller, rather than having to store anything
ourselves.

While this works, it's often the case that you want the service itself
to store the returned data. For example, you may want to access
loginService.currentUser in multiple different components or contexts.
Therefore, it makes sense to store that information within the login
service itself. In the original article, Chautard uses tap() to save
information about the user. This is definitely a viable strategy,
however it has the implication that any component code would have to
rely on Angular's change detection mechanisms to determine any changes.
We can get a boost in performance by taking Angular's change detection
out of the equation.

It turns out that we actually can subscribe inside of this method, so
long as we allow our client code to be notified of changes in auth
state. We can achieve this by leveraging
[ReplaySubjects](https://rxjs-dev.firebaseapp.com/api/index/class/ReplaySubject)
to store `currentUser` and `authToken` in an observable that clients
could subscribe to in order to get login info, as well as providing an
additional subject for error handling.

    @Injectable()
    export class LoginService {
      private currentUserSubject$ = new ReplaySubject<string>(1);
      readonly currentUser$ = this.currentUserSubject$.asObservable();

      private authTokenSubject$ = new ReplaySubject<string>(1);
      readonly authToken$ = this.authTokenSubject$.asObservable();

      private authErrorSubject$ = new ReplaySubject<any>(1);
      readonly authError$ = this.authErrorSubject$.asObservable();

      constructor(private http: HttpClient) {}

      login(username: string, password: string) {
        this.http
          .put('http://localhost:8000/login', {username, password})
          .subscribe({
            next(data) {
              this.currentUserSubject$.next(username);
              this.authTokenSubject$.next(data['authToken']);
            },
            error(err) {
              this.authError$.next(err);
            }
          });
      }
    }  

This allows our components to use the
[async\$](https://angular.io/api/common/AsyncPipe) pipe to subscribe to
changes to the logged in user. Components therefore don't have to rely
on Angular's built-in change detection, and can use [push-based change
detection](https://blog.angular-university.io/onpush-change-detection-how-it-works/)
for optimal performance.

A few additional things to notice in this example:

1.  We still return the observable, so that the client has direct access
    to the information, as well as the ability to handle any errors from
    the observable should they arise.

2.  We've passed in an argument of 1 to our ReplaySubjects. This
    argument is the "buffer" argument, which tells the subject only to
    retain the latest value it was given.

3.  We've kept our ReplaySubjects private here, and exposed them as
    readonly properties using asObservable(). We'll come back to that
    later in this article.

### What to watch out for

Subscribing to an observable whose asynchronous outcome is of interest
to calling code, without allowing client code to observe the results of
the outcome.

### What to do instead

Ensure the observable is returned, or make use of subjects and update
their state as part of a subscription to an observable.

Forgetting to Unsubscribe
-------------------------

Have you ever seen code like this?

```ts
@Component({...})
export class MyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemService.loadItemDetails(params['itemId']);
    });
  }
}
``` 

At first glance, this looks innocent enough, but there's a problem:
within `ngOnInit()` we subscribe to route params, but we never
unsubscribe. This is problematic because even when the component is no
longer being used, the fact that the activated route is a service that
exists outside the scope of the component causes the component to be
retained in memory! This causes memory leaks and can easily degrade
performance if left unchecked. This gets even worse as your component
grows in complexity and the number of subscriptions increase.

Instead, you should always be sure to unsubscribe to any subscriptions
you manually subscribe to. A good rule of thumb is: subscribe within
`ngOnInit()`, unsubscribe within `ngOnDestroy()`.

Here's how we could change the above code in order to handle this:

```ts
@Component({...})
export class MyComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.itemService.loadItemDetails(params['itemId']);
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
```  

We can also write a unit test to verify that all subscriptions are
cleaned up.

```ts
describe('MyComponent', () => {
  let fixture: ComponentFixture<MyComponent>;
  let itemServiceSpy: jasmine.SpyObj<ItemService>;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
      providers: [
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: ItemService, useValue: jasmine.createSpyObj('itemService', ['loadItemDetails'])}
      ]
    });

    itemServiceSpy = TestBed.get(ItemService);
    mockActivatedRoute = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(MyComponent);
    fixture.detectChanges();
  });

  // Verify the core behavior works
  it('calls loadItemDetails on param change', () => {
    mockActivatedRoute.paramsSubject$.next({itemId: 'itemIdParam'});
    expect(itemServiceSpy.loadItemDetails).toHaveBeenCalledWith('itemIdParam');
  });

  // Verify unsubscribe
  it('stops listening to param changes when destroyed', () => {
    fixture.destroy();
    mockActivatedRoute.paramsSubject$.next({itemId: 'itemIdParam'});
    expect(itemServiceSpy.loadItemDetails).not.toHaveBeenCalled();
  });
});

class MockActivatedRoute {
  /** Used within the test code to trigger a new param change */
  readonly paramsSubject$ = new Subject<Params>();
  /** Used by the component to subscribe to params */
  readonly params = this.paramsSubject$.asObservable();
}
```  

While the above practice works for a single subscription, this will
become unwieldy for multiple subscriptions. A clever solution to this is
to use a single parent subscription to manage all child subscriptions,
and then only call `unsubscribe()` on the parent subscriptions. Here's
how we could modify the above code to accomplish it:

```ts
@Component({...})
export class MyComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        this.itemService.loadItemDetails(params['itemId']);
      })
    );
    // Any other subscriptions could be added this way as well.
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
```  

Note that the unit tests will remain the same.

Alan Chautard again has an excellent post on this topic from his blog.

If you don't like the idea of putting subscriptions with `.add()`
blocks, you could also use `takeUntil()` in combination with a destroy
subject to handle this.

```ts
@Component({...})
export class MyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.destroy$),
    ).subscribe(params => {
      this.itemService.loadItemDetails(params['itemId']);
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```  

In most cases, you should try to use the `aync\$` pipe when possible.

Not dealing with errors
-----------------------

Error handling in RxJS can be tricky, because there's not only lots of
ways to handle it, but there are many ways it could go wrong.
Understanding how to deal with errors effectively is a key part of
building robust Observable APIs. If you haven't yet, I'd highly
recommend reading [Angular University's
RxJS](https://blog.angular-university.io/rxjs-error-handling/) error
handling guide. It is the most comprehensive guide I have seen on the
topic.

### What to watch out for

Dangling subscriptions.

### What to do instead

Add all subscriptions to a parent subscription, then unsubscribe() from
that parent subscription on destroy.

Reinventing the wheel
---------------------

While it's true that you [can recreate redux with a single line of
RxJS](http://rudiyardley.com/redux-single-line-of-code-rxjs/) code, it
doesn't necessarily mean you should. When you start to find yourself
managing a large amount of stateful data using Observables, you should
consider using a pre-built library such as NgRx, NGXS, or Akita. These
libraries will not only give you a lot of functionality for free, but
they'll save you from having to maintain your own bespoke solution, and
are already used and understood by developers outside of your team,
making it easy to onboard new developers.

If you currently have an app that you need to migrate over to one of
these state management libraries, I recommend starting off by
implementing a view facade to abstract your current logic, and then once
you have the facade in place, introduce your state management library of
choice. This will ensure your component's interaction with the
underlying state management system won't change at all, no matter what
that solution is, giving you a clean separation of concerns along the
way!

### What to watch out for

Replicating too much of what other state management libraries out there
are doing.

### What to do instead

Use an existing state management library. If dealing with existing code
that uses bespoke state management, start by refactoring out the view
facade and then introduce the state management library behind the
facade.

Exposing subjects as part of a read-only API
--------------------------------------------

Many times when writing services, you'll want to use a subject to be
able to write reactive state. However, we have to be careful not to
expose the subject itself to the outside world. This would allow any
client using the code to update the state of the service, which would
break the principle of data encapsulation.

Instead, you should make your subjects private and use `asObservable()`
to expose a readonly version of that subject for use by clients. Let's
take another look at that UserService we used to talk about mishandling
subscriptions:

```ts
@Injectable()
export class LoginService {
  private currentUserSubject$ = new ReplaySubject<string>(1);
  readonly currentUser$ = this.currentUserSubject$.asObservable();

  private authTokenSubject$ = new ReplaySubject<string>(1);
  readonly authToken$ = this.authTokenSubject$.asObservable();

  private authErrorSubject$ = new ReplaySubject<any>(1);
  readonly authError$ = this.authErrorSubject$.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    this.http
      .put('http://localhost:8000/login', {username, password})
      .subscribe({
        next(data) {
          this.currentUserSubject$.next(username);
          this.authTokenSubject$.next(data['authToken']);
        },
        error(err) {
          this.authError$.next(err);
        }
      });
  }
}
```  

Notice that for all of the subjects we used, we exposed them using
`asObservable()`. Within our `login()` method, users simply call that
method and the observables update themselves:

```ts
@Component({
  selector: 'app-login-example',
  template: `
    <ng-container *ngIf="loginService.currentUser$ | async as user; else loginForm">
      <h1>Welcome, {{user}}!</h1>
    </ng-container>
    <ng-template #loginForm>
      <form [formGroup]="form">
        <label>Username: <input formControlName="username" type="text" /></label>
        <label>Password: <input formControlName="password" type="password" /></label>
        <button (click)="loginService.login(form.get('username').value, form.get('password').value)" 
                [disabled]="form.invalid">
          Log In
        </button>
      </form>
    </ng-template>
  `
})
export class LoginExampleComponent {
  readonly form = this.fb.group({
    username: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });

  constructor(readonly loginService: LoginService,
              private fb: FormBuilder) {}
}
```  

Notice how the observable attributes can only be read from, never
written to. This prevents clients from being able to modify the internal
state of the service, ensuring clean encapsulation.

### What to watch out for

Exposing subjects as part of an API.

### What to do instead

Make the subject private and use asObservable() to expose it as a public
property.

Nesting subscriptions
---------------------

This is one that I've seen a lot of people do when they're first
starting out with RxJS. It's very similar to how people nest .then()
calls in Promises when they're first starting out using them. They'll
have some asynchronous pieces of code that need to be executed in
sequence, and they'll accomplish this by nesting one .subscribe() inside
of another.

For example, imagine that you were building a metrics dashboard
application. On load, it fetches a configuration detailing which data it
needs to load for a user. It then proceeds to load the data based on the
configuration. These are two different asynchronous operations. You want
them to be asynchronous so that you can begin to progressively render
parts of the page based on the config. Using nested subscribes, that
code might look like this:

```ts
@Component({
  selector: 'app-dashboard-page',
  ...
})
export class DashboardPageComponent implements OnInit {
  config: Config = null;
  data: Data = null;

  constructor(
    private configService: ConfigService, 
    private dataService: DataService) {}

  ngOnInit() {
    this.configService.getUserConfig().subscribe(config => {
      this.config = config;
      this.dataService.loadData(config).subscribe(data => {
        this.data = data;
        // ...
      });
    });
  }
}
```  

Notice how, even with two levels of nesting, we are slipping into
pyramid of doom territory. What's worse, we can't take advantage of our
async pipes because we have to store the returned data as properties on
the component instance!

Instead, you can use higher-order mapping functions in order to flatten
nested Observables into a single Observable. For example, the previous
code could be written as:

```ts
@Component({
  selector: 'app-dashboard-page',
  ...
})
export class DashboardPageComponent implements OnInit {
  config: Config = null;
  data: Data = null;

  constructor(
    private configService: ConfigService, 
    private dataService: DataService) {}

  ngOnInit() {
    this.configService.getUserConfig().pipe(
      tap(config => {
        this.config = config;
      }),
      mergeMap(config => this.dataService.loadData(config))
    }).subscribe(data => {
      this.data = data;
      // ...
    });
  }
}
```  

Here, we use the mergeMap operator to take the data returned from the
config service, and use it to produce a new observable using the data
service. That Observable is then passed down the rest of the operator
chain, and allows you to subscribe to it. This is better, but it's still
not quite ideal. We have to subscribe to the data in order to store it
on our component, and we also have to use tap() to add a side-effect of
storing the config object before it's replaced in the operator chain via
the mergeMap call.

A better strategy here is to not subscribe at all, and instead store
config and data as Observables.

```ts
@Component({
  selector: 'app-dashboard-page',
  ...
})
export class DashboardPageComponent {
  config$ = this.configService.getUserConfig().pipe(
    shareReplay(1)
  );
  data$ = config$.pipe(
    mergeMap(config => this.dataService.loadData(config)),
    shareReplay(1)
  );

  constructor(
    private configService: ConfigService, 
    private dataService: DataService) {}
}
```  

Note that we use shareReplay(1) above to safe-guard against multiple
subscriptions firing multiple HTTP requests. Let's look at what we've
accomplished here:

1.  We've completely removed the need for OnInit

2.  We've reduced the amount of code we've had to write

3.  We've removed all subscribing and side-effect code completely from
    the component, making it fully reactive! We could easily add
    push-based change detection to this component now, and take
    advantage of the async\$ pipe in order to manage Observable
    subscriptions.

Becoming proficient with higher-order mapping functions, and reactive
programming in general, will take some practice, but once you do your
code will become a lot cleaner. If you'd like to dive deep into how
higher-order mapping functions, and operators in general, work, I wrote
an article on that recently :)

### What to watch out for

Nested subscriptions.

### What to do instead

Use higher-order mapping operators.

Conclusion
----------

If you can eliminate most of these common mistakes from your code, you
wisll be well on your way to writing elegant async code with RxJS.
