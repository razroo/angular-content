---
title: Typescript Interfaces and Partials
---

Interfaces are a large part of data-access architecture. They are the
glue that makes sure that all parts of data-access are using the same
data schema.

Within the interface we have the option to use an optional or real
value. The question is, do we want to turn the interface into a real
representation of the data or do we want to leave it loose and set
values as required?

When you have your entire interface as a compulsory object, it forces
the mock to conform to this shape. This is useful for, for example, when
you want to test all services within a graphQL application, it will
complain that fragments do not match, your mock data tests will have
already caught it.

Solution to the Above Dillema
-----------------------------

In Typescript there is the option to use:

```ts
<Partial>
```

Partial will treat an interface that will require every data type, as if
all values are optional.

Where We Might Want a Partial
-----------------------------

So that being said, within our data-access architecture we have:

1.  GraphQL

2.  Models

3.  Service/Facade

4.  State

Our actual services, facades, and state can take full interface without
an issue. They are retrieving data from the back end. In addition, in
our mocks.ts file, we want to include the interface fully, to make sure
that all potential data is included in mock. The mock for the most part
is going to be used across the spec for services and effects.

Word to the Wise
----------------

Ideally interfaces should be a direct one to one correlation between
GraphQL queries within app. If any of these items are used, it should be
updated, and appropriately updated in the interface. It makes
considerable sense to create a tool around this.
