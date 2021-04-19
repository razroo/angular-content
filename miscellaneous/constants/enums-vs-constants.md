---
title: Enums vs Constants
---
When working with Typescript, which if you are using Angular, then you
most definitely are using Typescript. Care must be taken to look into
all the nuances that Typescript can offer.

## In a non Typescript Setting

In order to define a constant in a non-Typescript setting, we use the
const declaration to define variables:

```
  const UP = "UP";
  const DOWN = "DOWN";
  const LEFT = "LEFT";
  const RIGHT = "RIGHT";
```

## Enums an Introduction

Simply put, Enums allow us to define a set of named constants[^1](https://www.typescriptlang.org/docs/handbook/enums.html).

```
  enum PlaneActionTypes {
      Up = "[Plane] Up",
      Down = "[Plane] DOWN",
      Left = "[Plane] LEFT",
      Right = "[Plane] RIGHT",
  }
```

## Benefit of Enums over Constants

Enums allow us to organize a collection of related values. Think of them
as a class for values, wherein the value can only be a string , or
number.

## Current quirk of String Enums

String Enums, as opposed to number Enums, have to be constant
initialized with a string literal. To clarify, you might want expect the
following to work:

```
  const prefix = '[Button]'
  enum Direction {
      Up = `${prefix} UP`,
      Down = `${prefix} DOWN`,
      Left = `${prefix} LEFT`,
      Right = `${prefix} RIGHT`,
  }
```

However, this does not work , because this is not a string literal, i.e.
string only.

## Convention as a Result of Quirk

As a result of quirk, we need a way of specifying that this action is
happening in relation to a specific object. Even though we do have a set
using enums, when identifying the string on it's own, from a state
management (dev tool) perspective, or console perspective, it will be
beneficial to have the string literal, be explicit on it's own.. Please
reference above section, "Enums as an Introduction", for how this
translates to code in principle.

## Side Note - Why No All Caps in Enums?

A const in Javascript can actually be re-assigned to something else. For
instance:

```
const PLANE = 'blackbird';
PLANE = 'thunderbird';
// barf
```

It is therefore a good convention when using a const, to put it in all
caps, when the value is not attend to be re-assigned such as:

```
const PLANE = 'blackbird';
// woh, I was about to re-assign plane to thunderbird for some weird reason, but
// then I saw PLANE in all caps, so I didn't do it
```

However, this is not the convention with Enums, of course, because all
enums are never re-assigned. It is therefore not necessary to to write
in all caps.
