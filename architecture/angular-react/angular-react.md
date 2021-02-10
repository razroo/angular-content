---
title: Using React with Angular
---
A frustrating part of front end development is that changes within the
framework or library nowadays often occur faster than the rate of
development. In addition, different frameworks and major libraries have
different usages. Two of the currently most profitable front end
"ecosystems" are Angular + React. Sometimes, having something only
available in Angular can be cumbersome. Being able to break into the
React ecosystem, for instance, can be extremely valuable.

Microsoft came across the use case of needing to have React within their
Angular applications. They created the open source library called
[angular-react](github.com/microsoft/angular-react). It allows for the
ability to use React in Angular.

## Reasons to use React in Angular?

1. Internally one team built a very large component in React. Your
   Angular team would now like to use this React component, with
   limited overhead.
2. Industry trends push your team to migrate towards React. For
   instance, one time I was approached by a CTO of a company who
   mentioned he is coming across more React developers in the market.
   They might not architecture their React applications as they need,
   but that might be the benefit of React, for a startup. It doesn't
   require as much overhead. For their business, a lesser architected
   application might be beneficial, because their getting to the market
   and earning a profit is integral given the funding they have.
3. A very large component library is only available in React, and not
   in Angular. For instance, in the case of Microsoft, who actually
   created the open source library `angular-react`, they needed to use
   Office UI Fabric, which was only available in React.

### Sidebar - When Not to Use React in Angular

Intuitively, one can look at the ability to use React in Angular, and
think great! Ok, well hold on their Cowboy, or Cowgirl. It might not be
the best idea to create a Frankenstein of an Angular + React
application. The two ecosystems can clash with each other. Between the
way data is passed around, rendering, libraries used for state
management etc. However, if you find yourself gravitating towards one of
the three reasons above, using React in Angular, can be very beneficial.

## Performance Concerns of React in Angular

Obviously rendering React elements inside of Angular seems like a little
bit too go to be true, right? Well this is a partially correct
assumption. Let's dissect the logic within the `angular-react`. It
creates a layer around React methods, so that they are understandable by
Angular. It then will call React within Angular. The main fault with
this approach, is there will be two separate rendering engines at play.
So, if you attempt to have them both render at the same time on the same
component, from the browser's side of things, it can cause them to trip
over each other. The `angular-react` team has created a demo proving
this point
[here](https://microsoft.github.io/angular-react/performance/mixed).

Another performance concern, as exemplified
[here](https://microsoft.github.io/angular-react/performance/profiles),
is that there is one main difference between the two. With regards to
React within Angular, the rendering time, as well as paiting is
significantly higher. It will be visibilty noticable that it will take
more time to show the components when using React inside of Angular.

## Nature of the Library

I always try to do my background research on a library before I go ahead
and use it within my application. There are two red flags:

1. They created this library to use Office UI Fabric. I.e. rendering of
   singular components within an Angular setting.
2. It is a product team on Microsoft, that are the main maintainers for
   this library. Given the limited use case of this library, expect it
   to not be optimized for maximum performance, or when multiple
   components are needed. Honest, a React Elements approach makes more
   sense in this scenario.

In most applications I've worked on, the use case for `angular-react` is
very limited. Proceed to the next chapter on custom web components for a
better long lasting solution.