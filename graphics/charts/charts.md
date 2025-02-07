---
title: Charts
---
Having charts in your application might not seem like an architectural
decision. There is a very popular library library out there called d3.
This might not be the right place to bring it up as it is Angular
agnostic. However, data can be something that can be quite abstract. It
might be tempting to tag it all into a singular service, and load it in
the appropriate component. However, using the power on Angular, it would
allow for the compartmentalization of graphics, and makes Angular a very
powerful tool for the job.

## Install D3

```
  npm install --save d3
  npm install --save-dev @types/d3
```

## Interfacing D3

When using any framework in general with a graphics library, the proper
approach is to interface through that component. So instead of keeping
the framework really abstract, we can tie it to the DOM of the
component.

When we add an arc component, it adds an arc to the component. When we
add a tooltip component to the app, it adds a donut chart. It is also
important to note, that much of what will be discussed in this chapter,
such as models, or visuals are native to Angular. However, being that we
are bringing over something which is not in an Angular setting, I will
be discussing everything, to remove any confusion.

## Simplifying an Interface in the Context of Angular

The concept of dumb and smart components comes in handy for helping you
connect the dots. That is, having a component purely for visual
purposes, and propagating the need for retrieving data and handling
events to the smart component.

This is a very similar phenomenon with d3. Only the smart component is
going to be the donut chart and child components will be arcs and
legends.

The second cornerstone to understanding interfacing d3, is to create a
service, that will handle any non-feature specific d3 logic. Lets say we
would like to click on an arc, or hover over, and have a specific
function, we can turn that into a core service. Therefore, moving
forward, we would be able to attach this logic over to another component
if need be.

## Re-building Pixel Grid, interfacing d3 using Angular

Let us create a d3 rect component. Instead, we are going to call it the
pixel component. Inside of our pixel component, we are going to
interface it with width and height.

## ApplyClickableBehavior Service

In addition, we are going to want to create a service that can be used
on our specific element, as well as on other elements. It will look
something like the following:

## Hooking up Services to Directives

Now that we have our services, we are going to hook up services directly
to our directives. The directives are going to by default hook into the
native element of