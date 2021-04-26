---
title: The Angular Service Worker - Implementing in App
---

A service worker is a a script that runs in the web browser that manages
caching for an application. Let's say you are offline and making a query
in your app, the service workers will make it so that request can go
through even without a network request. In short, having a service
worker can decrease dependency on a network and will greatly increase
user experience.

 Design Goals 
-------------

1.  Caching an application is like installing a native application. The
    application is cached as one unit, and all files update together.

2.  A running application continues to run with the same version of all
    files. It does not suddenly start receiving cached files from a
    newer version, which are likely incompatible.

3.  When users refresh the application, they see the latest fully cached
    version. New tabs load the latest cached code.

4.  Updates happen in the background, relatively quickly after changes
    are published. The previous version of the application is served
    until an update is installed and ready.

5.  The service worker conserves bandwidth when possible. Resources are
    only downloaded if they've changed.

 Manifest File 
--------------

To support the above design goals, Angular loads a manifest file. The
manifest describes the resources to cache and includes hashes of every
file's contents.

 Using Angular CLI to Enable Service Workers 
--------------------------------------------

Where we used ng new for the first time, we set it up with a flag for
service workers. For practical purposes, if you did not use the flag for
creating service workers, use the link
[here](https://angular.io/guide/service-worker-getting-started)\] and
follow through on the steps in the link.

For academic purposes, here is what the service worker flag does:

1.  Adds the \@angular/service-worker package

2.  Sets the Angular Cli serviceWorker option to true, so that it
    generates a manifest for every build

3.  Imports the ServiceWorkerModule, and registers the ngsw-worker.js
    file, which is the name of pre-build service worker script

4.  Creates a ngsw-config.json file, which configures defaults for
    service worker

 Simulating a Network Issue 
---------------------------

1.  Go to Chrome dev tools

2.  Go to the Network tab

3.  Check the Offline box

If you service worker is properly being used, then the page will load
normally, as opposed to the page displaying, \"There is no internet
connection\".

For further reading, by all means read through the documentation on
Service Workers, on the
[Angular.io](https://angular.io/guide/service-worker-getting-started).

 Some other architectural decisions 
-----------------------------------

### Available and Activated Updates ### 


There is an SwUpdate service available within app, after importing the
ServiceWorkerModule. It can be used to notify users, for instance, to
update their page(s), when the code they are running is out of date:

```ts
    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
```

### Checking for Updates ###

Within the same SwUpdate service, we can also check for updates, and set
up a subscriber of sorts, for instance:

```ts
  import { interval } from 'rxjs/observable/interval';

  @Injectable()
  export class CheckForUpdateService {

    constructor(updates: SwUpdate) {
      interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate());
    }
  }
```
