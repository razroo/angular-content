 Network Aware Predictive Pre-Loading 
=====================================

Lazy loading modules in Angular, allows for javascript loading to be
optimized. That is, so browser only loads the page the user is
navigating to. This helps to decrease the initial load time. However,
depending on how expensive including a module is, pre-loading can save
you time. Pre-loading is a strategy that allows for modules in Angular
to be loaded as soon as possible. Modules can be pre-loaded either all
at the same time, or a select few, or when a custom event happens. You
can check yourself how long it takes for a module to load, and the
potential value of pre-loading. Open up your developer console tool(I'm
using Chrome), navigate to the js section, of the network tab, and then
load the page you want to test.

![As we can see, it took 2ms to download the Razroo About
page.](architecture/lazy-loading/network-aware-preloading/network-preloading-console-screenshot.pdf){width="414pt"}

 Being Aware of How Much Time Pre-Loading Saves 
-----------------------------------------------

You might be curious as to how much time is actually saved with regards
to pre-loading? I was curious as well. I tried personally and the amount
of time saved is negligible. I also realize that the app I am working on
has a minimal amount of modules. I can see that for another app, wherein
there are multiple modules that are loaded. Therefore, let's throw out
an arbitrary number. If you have a module that is going to use more than
20 imports inside of it's module, then worry about a pre-loading
strategy. Regardless, it is something to be aware of, and here is how to
go around implementing pre-loading.

Pre-Load Everything
-------------------

While this strategy will rarely work for any real-world application,
there is an option to pre-load every module in Angular. To do so, you
would use `PreloadAllModules` as your preloading strategy:

    import { RouterModule, PreloadAllModules } from '@angular/router';

    @NgModule({
      imports: [
        RouterModule.forRoot(routes, {
          preloadingStrategy: PreloadAllModules,
        }),
      ],
    })
    class AppRoutingModule {}

 Custom Pre-Loading 
-------------------

What does make more sense in an enterprise setting, is custom
pre-loading modules. That is, pre-load the more expensive modules, and
do not pre-load those that are less expensive. In addition, make the
pre-loading happen at a time more convenient for the app. Let's dive
into what that means and how we can do that.

Angular offers the ability to pre-load specific modules(as opposed to
all of them at the same time, as we showed before). It offers a
`preload` method that takes two arguments:

1.  route - Route object to tap into, for the load function.

2.  load - Function that when run, triggers the module being loaded

### General Strategy

If we wanted to pre-load some modules, and did not want to pre-load
others, we would follow the following strategy:

1.  Give our route unique data(i.e. `preload: true`) to be used within
    our custom pre-loading function.

2.  Create a custom pre-loading function, that makes use of our unique
    data.

3.  Pass in custom pre-loading as a provider to the `preloadingStrategy`
    key.

### Strategy Exemplified in Code

#### Give Route Unique Data

``` {caption="app.routing.module.ts"}
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'books',
          loadChildren: () =>
            import('@razroo/razroo/books').then(
              module => module.RazrooBooksModule
            ),
          data: { preload: true }
        },
        {
          path: 'consulting',
          loadChildren: () =>
            import('@razroo/razroo/consulting').then(
              module => module.RazrooConsultingModule
            )
        },
      ],
      {
        initialNavigation: 'enabled',
        relativeLinkResolution: 'corrected'
      }
    )
  ],
  exports: [RouterModule]
})
export class RazrooAppRoutingModule {}
```

#### Custom Function For Pre-Loading

``` {caption="custom-preloading.ts"}
export class CustomPreloadingService implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}
```

*It is worthwhile to note that Razroo put's the `custom-preloading.ts`
util file in the `libs/common/services` folder.*

#### Pass in custom pre-loading as a Provider

``` {caption="app.routing.module.ts"}
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomPreloadingService } from '@razroo/common/ui/services';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        // ...routes go here
      ],
      {
        preloadingStrategy: CustomPreloadingService
        //...
      }
    )
  ],
  exports: [RouterModule]
})
export class RazrooAppRoutingModule {}
```

 Enabling Module Pre-loading on a Custom Event 
----------------------------------------------

We can extend the pre-loading architecture one step further. We can tie
in custom events into already existing custom pre-loading. In
particular, we will implement a strategy, that when a user hovers over a
navigation menu item, we can pre-load a module.

###  General Strategy For Event Driven Preloading

The general strategy will look somewhat similar to custom pre-loading,
with some modified/added steps.

1.  Give our route some unique data(i.e. preload: true) to be used
    within our custom-preloading function.

2.  Create a separate service that will be used to trigger a next on the
    observable contained in the custom-preloading function.

3.  Create custom pre-loading function, that makes use of our unique
    data. In addition, give it access to a `Subject`, so it can be
    triggerred, by an outside service.

4.  Pass in custom pre-loading service as a provider to the
    `preloadingStrategy` key.

5.  Use a mouseover function, that can trigger the service.

###  Strategy Exemplified in Code 

We will be giving our route the same unique data for event driven module
pre-loading as we did for custom module pre-loading:

#### Give Route Unique Data

``` {caption="app.routing.module.ts"}
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'books',
          loadChildren: () =>
            import('@razroo/razroo/books').then(
              module => module.RazrooBooksModule
            ),
          data: { preload: true }
        },
        {
          path: 'consulting',
          loadChildren: () =>
            import('@razroo/razroo/consulting').then(
              module => module.RazrooConsultingModule
            )
        },
      ],
      {
        initialNavigation: 'enabled',
        relativeLinkResolution: 'corrected'
      }
    )
  ],
  exports: [RouterModule]
})
export class RazrooAppRoutingModule {}
```

####  Create a Separate Service to Trigger Pre-Loading 

We will be creating a separate service, that will be used within our
`CustomPreloadingService` to trigger preloading:

``` {caption="on-demand-preloading.service.ts"}
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class OnDemandPreloadOptions {
  constructor(public routePath: string, public preload = true) {}
}

@Injectable({
  providedIn: 'root'
})
export class OnDemandPreloadService {
  private subject = new Subject<OnDemandPreloadOptions>();
  state = this.subject.asObservable();

  startPreload(routePath: string) {
    const message = new OnDemandPreloadOptions(routePath, true);
    this.subject.next(message);
  }
}
```

#### Custom Pre-Loading Service

Now we will be integrating our `OnDemandPreloadService` with our
`CustomPreloadingService`

``` {caption="custom-preloading.service.ts"}
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { OnDemandPreloadOptions, OnDemandPreloadService } from './on-demand-preload.service';

@Injectable({ providedIn: 'root', deps: [OnDemandPreloadService] })
export class CustomPreloadingService implements PreloadingStrategy {
  private preloadOnDemand$: Observable<OnDemandPreloadOptions>;

  constructor(private preloadOnDemandService: OnDemandPreloadService) {
    this.preloadOnDemand$ = this.preloadOnDemandService.state;
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.preloadOnDemand$.pipe(
      mergeMap(preloadOptions => {
        const shouldPreload = this.preloadCheck(route, preloadOptions);
        return shouldPreload ? load() : EMPTY;
      })
    );
  }

  private preloadCheck(route: Route, preloadOptions: OnDemandPreloadOptions) {
    return (
      route.data &&
      route.data['preload'] &&
      [route.path, '*'].includes(preloadOptions.routePath) &&
      preloadOptions.preload
    );
  }
}
```

The most important piece with the above code, is that we are passing in
the preloadOnDemandService as an observable, to the preload function.
Therefore, we can tap into the internal Angular preload strategy and
re-load it whenever we call our `OnDemandPreloadService`.

#### Pass in Custom Pre-loading Service as a Provider

``` {caption="app.routing.module.ts"}
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomPreloadingService } from '@razroo/common/services';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        // ...routes go here
      ],
      {
        preloadingStrategy: CustomPreloadingService
        //...
      }
    )
  ],
  exports: [RouterModule]
})
export class RazrooAppRoutingModule {}
```

Here there is nothing particularly novel about what we are doing. We
simply inject our `CustomPreloadingService` into `preloadingStrategy`,
to tell Angular to use it as our preloading strategy.

#### Trigger Service

In our particular scenario, as would make sense for alot of
applications, is trigger module pre-loading on mouseover. For instance,
when a user hovers over a menu item trigger pre-loading. We can
therefore do something such as the following:

    <a
      [routerLink]="item.link"
      class="nav-link"
      (mouseover)="preloadBundle('books')"
      >heroes</a
    >  

    preloadBundle(routePath) {
      this.preloadOnDemandService.startPreload(routePath);
    }

Creating a Directive
--------------------

Using this method, we can also create a directive to allow the logic for
pre-loading to be re-usable.

``` {caption="preload.directive.ts"}
import { Directive, ElementRef, HostListener } from '@angular/core';
import { OnDemandPreloadService } from '@razroo/common/services';

@Directive({
  selector: '[razrooPreload]'
})
export class PreloadDirective {

  constructor(private elementRef : ElementRef,
              private onDemandPreloadService: OnDemandPreloadService) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    const pathName = this.elementRef.nativeElement.attributes.routerlink.value;
    this.onDemandPreloadService.startPreload(pathName);
  }
}
```

In the above code for the directive we are assuming that there is a
routerlink, on the a tag we are looking for. \[If there isn't, the
directive will return an error.\] In addition, we are tapping into the
native element, so that we can get the pathname we need. Should add,
that for the `routerlink` directive on actual element, not using a
forward slash. If you are using a forward slash, you will have to add in
logic to remove forward slash. This allows us to now simply add the
following:

      <a routerLink="books" razrooPreload></a> 

When the user mouses over, we will now be able to see in our chrome
console,that the appropriate module has been pre-loaded.

 Network Aware Pre-Loading 
--------------------------

We've created an on-demand pre-loading strategy. When a user hovers over
a menu item, before they click, and navigate to route, it will already
begin to pre-load respective module for the route. It's a very clever
strategy, that uses the user's own intent to maximize the app's
performance. However, let's say in our pre-loading strategy, we have
three pages.

1.  About

2.  Product

3.  Application Page

The application page opens up a very heavy js bundle, that take's about
.25 seconds to load on a fast network. However, on a slower network it
might take around an entire second. In such a slow network, if the user
hovers over the larger Applications menu item first, and then the much
smaller About page,our pre-loading strategy might have the reverse
effect in such a slow network(the user will not have to wait longer for
the about page to load). If we want an air tight strategy that takes
care of all scenarios, it makes sense for us to go ahead and take
network connection into account.

### Network Information API

I have seen some blogs in this regards suggesting use of the network
information api, for figuring out the speed of the network. It's
actually interesting, W3C specs have included talks for the Network
Information API since
[2011](https://www.w3.org/TR/2011/WD-netinfo-api-20110607/). There have
been many discussions since then, landing on the latest version
solidified in [2014](https://www.w3.org/TR/netinfo-api/).

Before discussing how to use this API, it probably makes sense to go
ahead and discuss that for the API we plan on using, current usage is at
about 70%. It's worth noting that the lions share of the percentage is
with regards to IOS Safari(a whopping 10%), which does not support this
feature. In addition, Firefox currently does not support this feature.
However, Chromewhich is used by the majority of users between Android
and Desktop is at about 60% on it's own.

The API still has a bit more development required and this is not a fool
proof solution. But support is decent and this is relatively easy to
implement, let's go ahead and do so.

###  Strategy Exemplified in Code 

Since the Network Information API, is still experiemental technology,
Typescript will not support it as part of it's core library yet. So we
will simply declare a var for navigator to make it go away. Let's add a
has `GoodConnection` function to our `custom-preloading.ts` file, so
that we can tell whether, or not a user has a good connection.

``` {caption="custom-preloading.ts"}
export declare var navigator;
hasGoodConnection(): boolean {
  const conn = navigator.connection;
  if (conn) {
    if (conn.saveData) {
      return false; // save data mode is enabled, so dont preload
    }
    const avoidTheseConnections = ['slow-2g', '2g'];
    // 'slow-2g', '2g', '3g', or '4g'
    const effectiveType = conn.effectiveType || '';
    if (avoidTheseConnections.includes(effectiveType)) {
      return false;
    }
  }
  return true;
}
```

In the above function, we are using the navigator.connection effective
types, which tells us the connection that the user is currently
experiencing. If it is slow-2g, or 2g, we return false in this function.
We can now hook it up into the pre-emptive loading code we had before.

Because the network information api is experimental technology, let's
just add a custom type declaration in our file, to knock out any type
errors that we receive. Putting it all together, our file will something
like the following:

``` {caption="custom-preloading.service.ts"}
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { OnDemandPreloadOptions, OnDemandPreloadService } from './on-demand-preload.service';
export declare var navigator;

@Injectable({ providedIn: 'root', deps: [OnDemandPreloadService] })
export class CustomPreloadingService implements PreloadingStrategy {
  private preloadOnDemand$: Observable<OnDemandPreloadOptions>;

  constructor(private preloadOnDemandService: OnDemandPreloadService) {
    this.preloadOnDemand$ = this.preloadOnDemandService.state;
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.preloadOnDemand$.pipe(
      mergeMap(preloadOptions => {
        const shouldPreload = this.preloadCheck(route, preloadOptions);
        const hasGoodConnection = this.hasGoodConnection();
        if(shouldPreload && hasGoodConnection) {
          return load();
        }
        else {
          return EMPTY;
        }
      })
    );
  }

  private preloadCheck(route: Route, preloadOptions: OnDemandPreloadOptions) {
    return (
      route.data &&
      route.data['preload'] &&
      [route.path, '*'].includes(preloadOptions.routePath) &&
      preloadOptions.preload
    );
  }

  private hasGoodConnection(): boolean {
    const conn = navigator.connection;
    if (conn) {
      if (conn.saveData) {
        return false; // save data mode is enabled, so dont preload
      }
      const avoidTheseConnections = ['slow-2g', '2g'];
      // 'slow-2g', '2g', '3g', or '4g'
      const effectiveType = conn.effectiveType || '';
      if (avoidTheseConnections.includes(effectiveType)) {
        return false;
      }
    }
    return true;
  }
}
```

You will notice, that we have added an additional condition for preload
function. It now requires that it has a good connection, in addition to
`shouldPreload` being true.

If you would like to try it yourself, throttle the network speed using
the console and see that it doesn't download.

Congratulations, you are now an expert on knowing how to preload modules
on your own. This is a very interesting strategy, and if you were to
take if further, we can even begin to preload data, ahead of loading
pages as well.
