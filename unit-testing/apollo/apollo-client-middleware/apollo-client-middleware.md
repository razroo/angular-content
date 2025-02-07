---
title: Apollo Client Middleware
---

Middleware is a service layer one can put on top of application in
question. In particular, for an Apollo application, it will allow us to
intercept the current request and put in whatever we want.

## Middleware as Architecture ##

Middleware can be considered architecture because some plugins may not
support middleware. In addition, even if they do support middleware, it
might not be so apparent from documentation how one might go ahead and
do so. So much so to the extent, that it will considerably slow down
development, and a conversation will have to be had if research is worth
it.

## Middleware in Apollo ##

Apollo has a number of quirks with regards to its middleware. For now,
it adds typename to every query request. This can cause issues when it
comes to unit testing. Let's create middleware to remove typename from
the app:

```typescript
const stripTypenameMiddleware = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = omitDeep(operation.variables, '__typename');
  }

  return forward(operation);
});
```

Here we are stripping typename from the application.

## Adding projectId to Requests ##

Using middleware, we have the option to add a projectId to our requests.
Let's say that we need the data coming back to be specific to a certain
project. Instead of having to inject that on a request per request
basis, we would like to go ahead and have Apollo inject projectId as one
of the query requests.

```typescript
const attachProjectIdentifiers = new ApolloLink((operation, forward) => {
  combineLatest(
    this.projectFacade.projectId$
  )
    .pipe(first())
    .subscribe(([projectId]) => {
      operation.variables = {
        ...operation.variables,
        projectId: projectId,
      };
    });

  return forward(operation);
});
```

In this fashion, one can eliminate clutter from Apollo requests. In
addition, one can alter Apollo to have specific items in the response if
need be.
