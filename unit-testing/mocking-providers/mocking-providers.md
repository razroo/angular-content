---
title: Unit Testing - Mocking Providers
---

Another important part of Angular Architecture is that one has an option
to import a service as is, or to mock it out. This will apply to facades
as well. Not doing so will leave your unit tests at the mercy of your
services and might have you unit testing your service as well as your
specific component.

In addition, and perhaps, more dangerous that if you are not careful you
might end having your data being retrieved from the back end while you
are unit testing.

## Re-iterating Previous Point ##

We have already discussed a previous point with regards to unit testing
and interfaces. The point is that we can use a single data mock to keep
all of unit tests in sync. This is indeed a very important point that
works in tandem with mocking providers, and we will touch on this in
this chapter.

## When to Mock Providers within App ##

The point of mocking service dependencies is in order to test the
component in an isolated environment. This should includes pipes,
services, and in our architecture especially facades. If it is a module
that completely focuses UI, then there is no need to worry about an
isolated environment because there is no logic to affect the component.

## Mocking Providers - Setting the Landscape ##

Just setting the landscape for what an example situation might be like
with regards to mocking providers.

In our Angular - The Full Gamut architecture, we have a facade which is
always going to be responsible for bridging the data retrieved by our
service, with our component. It is going to be service that will
ultimately be used in our component to retrieve data.

```typescript
gridForm$: Observable<GridForm[]> = this.store.pipe(select(getGridForm));
```

The above is an example snippet of our getGridForm.facade.ts file, that
will be responsible for pulling data from our store, using the
getGridForm selector already specified else where. If we were to pull in
this facade as is, it would end up actually pulling data from the server
while doing unit tests! That would be a cardinal sin.

```html
<form>
  <div>{{ (gridForm | async).row }}</div>
  <div>{{ (gridForm | async).column }}</div>
  <div>{{ (gridForm | async).size }}</div>
</form
```

## Mocking Providers Within Unit Test - A Primer ##

In our unit test in order to mock the above Observable gridForm\$
stream, we can very simply use the data mock we have specified in our
mocks.ts file.

```typescript
providers: [
  {
    provide: GridFormFacade,
    useValue: {
      gridForm$: of(generateMockGridForm()),
    },
  },
],
```

In this very simple scenario, we have just made it so that the data
returned within our component for our unit test, is using the central
mock being used elsewhere in our data-access architecture. This gives us
more control over what we want to do. We can make the data more complex,
to test different use cases per it block that we want to use.
