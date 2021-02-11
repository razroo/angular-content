 ngrx/router-store 
==================

Ngrx/store is an Angular flavored Redux styled state management library
that leverages Rxjs.

It deals with the management of data streams and propagation of change.
It is time bound, meaning that data tracking and histories are stored
for referencing and tracing.

Under the traditional model of routing, data is decentralized and sits
on each routing state. This means that if the route changes, history of
that data is lost. There is no past and future states, only the present
and navigating away discards any memory of such occurrences. This can
become quite a challenge to keep track of everything in medium to larger
sized applications, especially when navigation is expected to occur in
high frequency.

Ngrx solves this issue by creating a central storage space for routing.
This official library is called `ngrx/router-store` and is pre-defined
to automatically hook into your ngrx/store.

It keeps all your current application's data in one space - turning
parts of your browser's memory into a storage bucket for all your data
where all mutations occur only through explicit dispatch actions known
as reducers and becomes the application's single source of truth. It
allows for your application's events to exist in a unified manner rather
than decentralized across different parts, children, siblings, partials,
factories and routes.

`ngrx/router-store`, specifically, is the portion of NgRx module that
allows for listeners to be used for routing actions, meaning that data
is allowed to bestored, shared, consumed and mutated based on the
routing status from a single source. `@ngrx/router-store`, in a way, is
like an in-memory database for your application's route related data.

Why do we need it?
------------------

When data is decentralized and exists on the fly, it becomes prone to
errors dueto a lack of history tracking and mutations can occur from
different directions. Duplication can accidentally happen as we try to
replicate certain data indifferent states and parts of the application.

When relying on Angular's routing system, we rely on data persistence
through params from navigation/router state. If a child or sibling
component requires that data, it becomes coupled with the parent and
data needs to be presented again in order to be consumed. While factory
patterns may solve this issue, it can quickly get messy if external
entry is granted without explicit knowledge.

In larger teams, factory patterns may not be enough to control the flow
and history of data and human error may introduce inconsistencies in the
code.

ngRx solves this, along with the reduction of time and code overheads
needed to create factory patterns and singular storage spaces. The
library comes ready to be plugged into any Angular application with its
own set of Redux inspired approach to centralized state storage. Each
cycle in a router-store captures a snapshot of the route's state and its
associated data. When data is decoupled from routing, it allows your
application to become more agile and less dependent on data states
through route params.

How to install router store
---------------------------

Once you have your Angular app, you can use npm to install router-store
by using the following commands:

    npm install @ngrx/router-store –save

If you're using yarn:

    yarn add @ngrx/router-store

If you're project is created with Angular CLI version 6+, you can use
thefollowing command:

    ng add @ngrx/router-store

To check your Angular CLI version, use the following command:

    ng --version

To use inside your application, you'll need to import the
`StoreRouterConectingModule` and `routerReducer` from
`@ngrx/router-store` like so:

    import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

Router actions and why they might be useful
-------------------------------------------

An action is anything that you can do to your application. A router
action is an event that can occur against a specific route on your
Angular app. When it comes to routing, are 5 specific actions that can
occur and they are the request, the action of navigation, the aftermath
(also known as navigated), cancellation and navigation error.

Being able to access and track these actions allows you to control the
flow of route state storage management, access to data and the life
cycle process. When used in conjunction with route guards - a feature
that allows you to protect your views from rendering when there isn't
enough information or the right access permissions - router actions can
help with the resolutions of states and its consumption.

A request action always kickstart the process which then runs the
navigation action that determines if the dispatch should occur or not.
If guards are valid,a successful navigation will occur and result in a
router navigated action. If something went wrong due to exceptions or
lack of user permissions, the router action will return a
`ROUTER\_CANCEL` action and nullify any attempts toaccess the route.

A `ROUTER\_ERROR` action may occur during the navigation life cycle
andreturns the stored state before navigation occurred. This is
particularly useful as it allows the application to back track its
action and restore its former data -- a sort of back button without the
need for extra configuration or callto the router state bucket.

How to use a custom serializer
------------------------------

A custom serializer prevents the mutation of snapshot data during the
dispatchprocess. As data during the navigation cycle is prone to
mutability, a customserializer returns only what you need to be added to
the payload and store. Soin essence, it tracks the difference and change
of a particular state withoutmodifying the entire stored state snapshot.

A custom serializer can be implemented through the abstract
classRouterStateSerializer. It is, in a way, a middleman class that
processes thedifference between what the current state is, what is to be
changed and updatesonly what is necessary.

To create a custom serializer, you will need to import Params
andRouterStateSnapshot from \@angular/router, along with
RouterStateSerializer from\@ngrx/router-store

    import { Params, RouterStateSnapshot } from '@angular/router';
    import { RouterStateSerializer } from '@ngrx/router-store';

To create a custom serializer, export a class that
implementsRouterStateSerializer with an interface to ensure object
uniformity.

Using the serialize() method to convert the state object into a unified
format that conforms to your application's requirements. This often
comes in the form of mapping router state values to a predefined
interface that may look something like this:

    //to be used by the serialization process
    export interface RouterStateUrl {
      url: string;
      params: Params;
      queryParams: Params;
    }

The CustomSerializer class that implements the imported
RouterStateSerializerusing the RouterStateUrl interface created.

    export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
       //serialization code here
    }

Set up the serialization method to return a uniformed set of parameters
basedon the template set in the RouterStateUrl interface.

    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
          route = route.firstChild;
        }

        const {
          url,
          root: { queryParams },
        } = routerState;
        const { params } = route;

        // returning the object based on the RouterStateUrl interface
        return { url, params, queryParams };
      }

To use the custom serializer, implement it inside your \@NgModule and
call yourexported CustomSerializer class inside the
StoreRouterConnectingModule.

    @NgModule({
      imports: [
        StoreModule.forRoot(
          { router: routerReducer },
        ),
        RouterModule.forRoot([
          // routes
        ]),
        StoreRouterConnectingModule.forRoot({
          serializer: CustomSerializer,
        }),
      ],
    })

Benefits of using router-store with ngrx/store-freeze
-----------------------------------------------------

`ngrx/store-freeze` is a dev tool that can be used during the
development phase of an Angular application to prevent state mutation
when using`router-store`. It sits on top of `router-store` as meta data
that acts as an insurance against changes in state data during the
process of transfer to state storage.

As `router-store` provides snapshots of the `RouterState` during the
navigation life cycle, it is vital that snapshots passed do not change
during the process of dispatch as this will result the store cycle's
truthiness breaking due to inaccurate snapshot data.

While serialization already prevents this, `store-freeze` acts as an
additional safeguard with exceptions thrown when mutations do occur at
runtime. It automatically *'deep freezes'* the entire store state object
and dispatch actions, resulting in a read only effect before it gets
passed to the serializer. This allows errors to be caught before it gets
dispatched, serialized and passed into storage.
