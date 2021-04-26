---
title: Image Performance in Angular
---

Image optimization is unique in an Angular setting. This is because of
Angular's usage of routing for lazy loading, file bundling, and modules.
In many enterprise applications, the types that are better suited for
Angular, they are more data heavy, and less image heavy.

In addition, the dynamics of image optimization, is that this is
something that can be discussed at a later date. Having this
conversation might only be necessary when you are finally ready to
deploy application to prod.

However, this is something that can be done ahead of time, with minimal
effort. It only requires the following two steps:

1.  Aware of it.

2.  Implementing it is made easy to implement in less than 3 steps

That is what we are going to attempt to do.

Lazy Loading Images
-------------------

Lazy loading is the idea of loading an image only when necessary. It is
powerful primarily because non-critical images are loaded when needed,
allowing for a quicker load of content on page load. It is also useful
for the additional following reasons:

1.  It reduces data consumption, i.e. less work for the server side.

2.  Less workload for the browser.

3.  Improve webpage loading time.

A great way to see what images might need optimization, is to use
Lighthouse in Chrome DevTools to see what might need changing.

 Using lazysizes for Loading Images 
-----------------------------------

`lazysizes`, in my opinion is the most robust library for making use of
lazy loading libraries. Some of the benefits of using it as a library
include:

1.  Requires no configuration.

2.  test

3.  Fantastic Performance.

4.  Optional integration with [Intersection
    Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
    

5.  Supports [plugins](https://github.com/aFarkas/lazysizes#plugins),
    which include those such as the object-fit extension, effect plugin,
    and respimg polyfill plugin.

Angular Directive with Lazysizes
--------------------------------

### Adding Lazysizes

TODO
