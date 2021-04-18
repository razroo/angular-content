---
title: Routing
---

Routing is an integral part of any single page application:

[^1]

The idea is that routing is that it is its own internal state machine.
There are two things that are unique to state with regards to routing:

1.  Data to be pulled in based on page.

2.  UI to be shown based on page.

Base Href
---------

In any Angular application, there is going to be an initial point of
entry for routing. In your src/index.html you will need to add an
`<base href="/">`. This is added by the CLI by default, and not
something you have to worry about.

 RouterModule 
-------------

Routes in Angular, are singleton instance.

```ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    RouterModule.forRoot( [
      {
        path: '',
        component: AppComponent
      },
      {
        path: 'draw',
        component: PxGridComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ], { initialNavigation: 'enabled' })
  ],
})
export class PixelAngstAppRoutingModule {}
```

We are supplying all routes within the app routing module.

 RouterModule Options 
---------------------

Let's break down all the possible options that can be passed to the
router:

1.  url

        {
          path: 'draw',
          component: GridComponent
        },

    Here we are using the url for draw. So, for instance, let's say the
    url of our application is razroo.com, then razroo.com/draw, will
    display the grid component.

2.  id Many times within our backend, we are going to retrieve data,
    based on the user's id. Alternatively, it might also be the id for a
    specific api. Being able to tie in the id for that particular api,
    into the route is very powerful. Angular routing allows for this to
    happen:

        {
          path: 'hero/:id', 
          component: HeroDetailComponent 
        },

    The syntax of colon, following by text(does not have to be id),
    means that if we were to navigate to `razroo.com/draw/123`, it would
    register within our app, that we want to call the id of '123',
    withinthe draw route.

    Within our app, we are going to use this, so that we can use the
    custom pixel illustrator settings, that our user opted into.

3.  data - Allows us to place static data, that we can retrieve that is
    specific to the route. E.g. page titles, breadcrumb text, other
    read-only static data.

        {
          path: 'css', 
          component: cssComponent.
          data: { title: 'CSS' }
        },

4.  empty path - An empty path is our default route. I.e. when the app
    loads for the first time.

        {
          path: '', 
          component: HeroDetailComponent 
        },

5.  `**` path Two asterisks means that the route is a wildcard. It is
    particularly advantageous for error reporting:

        {
          path: '**',
          component: PageNotFoundComponent 
        }

 Router Outlet 
--------------

[^2]

    <router-outlet></router-outlet>
    <!-- Routed components go here -->

Let's say now we were to go to razroo/com/draw, the component for the
`draw` route will be placed as a sibling component i.e.

    <router-outlet></router-outlet>
    <px-grid></px-grid>  

 Router Links 
-------------

In order to actually navigate from one route to the next, you will need
to use the Angular equivalent of href. However, instead of the classic
functionality of href, routerLink, will instead reload the component,
based on the new url.

    <h1>Px Illustrator</h1>
    <nav>
      <a routerLink="/draw">Draw</a>
    </nav>
    <router-outlet></router-outlet>

### Active Router Links

In addition, Angular offers a way for determining what is the current
active link. Something that is very valuable from a UX perspective when
the app needs to show to the user, what menu item is currently selected.

    <h1>Px Illustrator</h1>
    <nav>
      <a routerLink="/draw" routerLinkActive="active">Draw</a>
    </nav>
    <router-outlet></router-outlet>

Now if the draw route is triggered, the class active will be added to
the \<a\> tag. The `.active` class can obviously be styled.

Multiple active router link classes can be added for a particular active
route as well:

    <h1>Px Illustrator</h1>
    <nav>
      <a routerLink="/draw" routerLinkActive="'active '">Draw</a>
    </nav>
    <router-outlet></router-outlet>

 Router State 
-------------

After each successful navigation lifecycle, Angular's internal system
updates what's called the `ActivateRoute` object. This can beaccessed by
using the Router service. Inside of the router service, by accessing the
routerState property, we can get to the plethora of properties.

 Router Events 
--------------

When a route get's triggered, Angular will internally trigger a series
of events, from when the navigation starts to where it ends. Angular
also exposes these series of events by using the`Router.events`property.
Once again, there is no need to go into all of the events, but at this
time, they total 17.

[^1]: Angular Documentation - Routing & Navigation
    https://angular.io/guide/router

[^2]: Angular Documentation - Routing & Navigation
    https://angular.io/guide/router
