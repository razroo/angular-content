---
title: Understanding Rendering
---

Rendering is an integral part of Angular's structure. Because of its
nature as a framework, the default way of doing things can be a bit
slower than needed. As an engineer and as you get to understand the
framework better, you will find that there are performance boosts baked
into the framework to increase your app's speed. Rendering within
Angular is definitely sits in the performance category. Let's dive into
the different ways of rendering on the web so we can bring that over to
Angular.

Terminology
-----------

@ l \*4c @ Rendering and Performance Terminology\
Rendering & Performance\
SSR & TTFB\
CSR & FP\
Rehydration & FCP\
Prerendering & TTI\

### Rendering

1.  SSR: Server-Side Rendering - Rendering a client-side, or universal
    app to HTML on the server

2.  CSR: Client-Side Rendering - Rendering an app in a browser,
    generally using the DOM.

3.  Rehydration: \"Booting up\" JavaScript views on the client such that
    they re-use the server-rendered HTML's DOM tree and data

4.  Pre-rendering: Rendering a client-side application at build time, to
    capture it's initial state as static HTML.

### Performance

1.  TTFB: Time to First Byte - seen as the time between clicking a link
    and the first bit of content coming in.

2.  FP: First Paint - The first time any pixel becomes visible to the
    user.

3.  FCP: First Contentful Paint - The time when request content (body,
    header etc.), becomes visible.

4.  TTI: Time to Ineractive - The time at which a page becomes
    interactive (events wired up, etc.)

 Setting Proper Frame of Mind - When Rendering Happens 
------------------------------------------------------

When trying to understand how rendering worked, awareness of when things
happens can help decrypt the mystery. When I was able to put into
perspective that it happens in two scenarios:

1.  Navigation

2.  Events

Server Rendering
----------------

Server rendering will generate all of the html for page based on
navigation. It's important to keep in mind the two scenarios above, and
that server side rendering only happens for the navigation side of
things. Events will still have the client side render changes.

This will produce a fast first paint, and a fast first content paint. In
addition, it allows for a fast time to interactive. The one draw back
with regards to this approach, is the Time to First Byte. Being that we
have to generate all of the content in the server first, it takes longer
than usual to generate the page. Within the Angular context, it has
something called Universal, which is a bit of a mix and much between
server and client.

Static Rendering
----------------

Static rendering, is where we generate the full set of html content
ahead of time. This checks all boxes with regards to performance i.e.

1.  Fast TTFB, fast FP, fast FCP, fast TTI.

2.  Fast FP

3.  Fast FCP

4.  Fast TTI

You might be familiar with tools like Jekyl, Gatsby, or Hugo that
accomplish this. The main drawback with this approach, is that if we
have dynamic content that we don't know ahead of time what the html page
is going to look like, static sites are not able to accomplish this
task.

Server vs. Static Rendering
---------------------------

So let's say that you are coming across a situation where you cannot use
static rendering. But you would like to use static rendering. The only
issue in this is that your page is dynamic. The server side rendering is
not an end all be all solution. There will need to be some sort of
caching solution offered in this regard, for server side rendering to be
truly effective.

 Client Side Rendering 
----------------------

Client side rendering is what usually happens by default in an Angular
application.

1.  logic

2.  Data fetching

3.  Templating

4.  Routing

One of the more notable downsides is as follows:

1.  Performance concerns for mobile

Universal Rendering - Server + Client Side
------------------------------------------

Universal rendering is the happy medium between server side and client
side rendering. Navigation requests(full page loads + reloads) are
accomplished by the server side. The actual HTML is delivered by the
server. The JavaScript and data needed is embedded into the document.
The one downside to SSR, is that it might look like it is fully loaded,
but a user will not be able to interact with until the JavaScript is
fully embedded. On devices such as mobile, this can take a couple of
seconds. The one outlier with regards to SSR, is that if you can find a
use case wherein the content will be highly cacheable, then SSR might be
a good candidate.

Up and Coming Technologies
--------------------------

There are some technologies that are on the horizon that are useful to
keep an eye on. There are two in particular, streaming server rendering
+ progressive rehydration.

### Streaming Server Rendering

This allows for you to send HTML in chunks, so that the browser can
progressively render as it's recieved.

### Progressive Rehydration

With this approach, individual pieces of an application are booted up
over time as opposed to an entire application. This will help reduce the
amount of JavaScript required for an application as it is aware of what
it is that the user specifically needs. This also helps prevent one of
the major concerns of SSR rehydration, wherein a server rendered DOM
tree rebuilds itself.
