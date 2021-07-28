---
title: Unit Testing Performance
---

Unit Testing isn't one of those things that we equate with performance.
There are tools that allow one to a unit test by a specific folder. In
addition, there is parallel unit testing for the pipeline so that unit
tests can be sped up. However, as apps get larger so do their unit
tests.

From a developer perspective, it is valuable to run all unit tests to
make sure that when larger impacting edits are made that none of the
unit tests are failing. Unit tests will be run when a push request is
being made. In addition, they are going to be run when deploying. So
there is enough going on to say that being conscious of performance
boost is an important factor.

 Component and Integration Testing 
----------------------------------

It is quite common that many enterprise apps will take advantage of
integration testing within their unit tests. However, creating the
component within the unit test is intuitively, and is the most expensive
task one can do within a unit test.

Avoiding creating a component unless needed is the ideal. The ideal
scenario when creating a component looks something like this:

```typescript
describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
})
```

Here we are setting a TestBed, configuring the test module, and then
compiling the component. While in practice there is nothing wrong with
this, but for every run, this will re-compile our components. So, if
there is a way we can get around re-compiling our component, this would
obviously go a bit quicker.

There are a couple of approaches. One of them involves using something
called ng-bullet. I am bit skeptical of using something like this, as I
can see it causing some issues among the build. The second approach is
to only compile the component if you need it. It would be a good to
suggest Jest which is a faster way of running unit tests. For current
karma/jasmine unit tests to be mindful of how you are writing unit
tests.

## Component Testing ##

There are three different ways of unit testing a component:

1.  Isolated Unit tests

2.  Shallow Unit Tests

3.  Integrated Unit Tests

Of the three, Isolated Unit Tests, score high on a performance level. It
will not cause the component to re-render itself. However, by using an
isolated unit tests, we are simply testing the logic of the component,
without testing how it interacts without actual html. This usually only
works in certain scenarios.

In most scenarios, there will be a requirement of running the TestBed
which can cause performance issues when running a large amount of tests
and can be dealt with.

## Running tests in Parallel ##

The next item in the checklist is to separate your tests into separate
modules so that they can be run separately. You will then be able to run
the tests in parallel. This will allow for the tests to run quicker.

## Karma Parallel ##

Karma Parallel is an npm package that be used to run unit tests in
parallel. It would require for the karma config to be updated
accordingly. The one downfall of the karma config.

## Ng-Bullet ##

There is a fantastic library that has been written to accommodate for
some performance boosts with regards to Angular Unit Tests.

In short, there has been discussion around increasing the performance of
Angular Unit Tests for quite some time. The way that the new Angular
compiler will work, will greatly decrease time it will take for
Karma/Jasmine unit tests regardless. I would imagine this is the reason
why those working on Angular, have decided not to comment. However,
Ng-bullet is a possibility to be used for those that seriously need the
performance boost in their Angular App.

 Style Cleanup 
--------------

The biggest improvement with regards to performance boosts comes with
improving memory leaks. The largest memory leak is caused by CSS. If you
do not clear your css in your unit tests, your karma tests will
consistently append hundreds if not thousands of \<style\> tages to your
body. This will incredibly slow down how fast your unit tests run. This
can be alleviated by adding an afterAll to your unit tests:

```typescript
export function cleanStylesFromDOM(): void {
  const head: HTMLHeadElement = document.getElementByTagName('head')[0];
  const styles: HTMLCollectionOf<HTMLStyleElement>
  | [] = head.getElementsByTageName('style');

  for (let i: number = 0; i < styles.length; i++) {
    head.removeChild(styles[i]);
  }
}
afterAll(() => {
  clearStylesFromDOM();
});
```

The above functionality will improve performance of unit tests by five
fold.
