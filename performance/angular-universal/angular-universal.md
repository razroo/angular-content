---
title: Angular Universal
---

What is Server Side Rendering?
------------------------------

By default, Angular will render HTML on the page using JavaScript within
the browser. Server side rendering, however, will produce all of the
HTML off the browser and within the server. Normally, people come across
using Angular Universal for two reasons:

1.  Mobile app - JavaScript engines on mobile phones, while much
    stronger, are still lacking. In addition, while having the server
    generate the HTML instead of the client, can potentially boost
    battery performance of application.

2.  SEO reasons - Angular Universal will make your site static.

Another added benefit of Angular Universal, is that it has a very fast
FCP(first contentful paint). When you use Angular Universal for the
first time, this will immediately be apparent. It should be noted
however, the TTI(Time to interactive), wherein user will be able to
interact with the page, will still be loading in the background.

Angular Universal Actually Requires A Sever
-------------------------------------------

One thing that people using Angular Universal will be surprised, when
using it for the first time, is that it actually requires a server!
Looking back it will make sense, because obviously it is server side
rendering. However, the name \"Angular Universal\" doesn't exactly lend
to that assumption. Any web server will work with Angular Universal.

A Couple of Points to Keep in Mind
----------------------------------

### How Angular Universal Works

1.  Angular Universal uses the `platform-server` package under the hood.
    This provides low level features that don't rely on a
    browser(`XMLHttpRequest`, etc.)

2.  Server passes the client request (for application pages) to the
    `ngExpressEngine` which calls the Universal `renderModuleFactory`.
    This function inputs:

    1.  Template HTML page.

    2.  Angular `module` containing components.

    3.  `route` determining which components to display.

3.  The `renderModuleFactory()` function, renders view within the
    `<app>` tag of template.

4.  The server will then return rendered page to the client.

### Dynamic of Browser APIs with Angular Universal

A universal app works on the server side. Because of that, it needs to
create abstractions over classic APis such as `window`, or `location`.
There some bugs that might show as a result, if your app does anything
fancy.

Another really important point, is that a Universal app cannot interact
with a mouse, or keyboard event. Without some hack/workaround, it is
important to make your entire app routable.

### Using Absolute URLs - Serving on Browser vs. Serving on Server 

There is an interesting dynamic between serving on the browser, and
serving on the server. When serving on the browser, the paths for a url
are relative. When serving on a server, the paths must be absolute. So
why is it that this is indeed the dynamic?

Well, think of it this way. When generation is happening within the
browser, it is fully aware of everything going on from the client side
of things. The actual url is irrelevant. There could potentially be a
way of approaching this problem. However, after looking into the github
issues, for the angular github, one will find that this is actually a
surprisingly complicated issue. Given the way the package works out.

From a server side, it does not have access to the client side, so using
relative paths is not an option. You will need to create an interceptor
to pass a full url to your server, based on your client data. (It is
possible to do this on the server's side of things, but arguably less
overhead to do this on the client side.)

### Universal Template Engine

Within your `server.ts` file, you will write something similar to the
following:

``` {caption="server.ts"}
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
```

There are two notable items in the code above:

1.  AppServerModule - This is the bridge between the client and server.

2.  extraProviders - This one is optional, and is something that

The `ngExpressEngine` function returns a callback promise to the client.

### Security + Static Files

In order to ensure that all static files are delivered properly to
clients. Put all client side files in the `dist` folder. Only honor
requests for files coming from the `dist` folder.
