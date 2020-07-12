 Services 
=========

What is a service in Angular? In Angular, a service is a way to define
business logic in a separate file and choose it in our appropriate
component when it makes sense to do so.

Services, even though they are a part of the core Angular framework, are
by definition created in order to alleviate the maintainability and
scalability of an application. However, it is still a part of core
Angular, and it is important to be aware of couple things.

 Creating a Service and ProvidedIn: Root 
----------------------------------------

In order to create a service, navigate to the folder you would like to
create your service and run:

    ng g service code-box  

This will create a service that by default includes
` providedIn: 'root',` It is important to keep in mind, that Angular
provides for services only the ability to add to the constructor
something called ` providedIn: 'root',`. It allows for the service to
injected without the need to include it in the respective module. It has
some performance boosts, besides level of convenience. We will get more
into that in later chapters.

 What Generally Goes in a Service 
---------------------------------

A service generally deals with data. This means making data requests,
and passing that data into our component. It's best to use Apollo Client
instead of Angular's internal http client as it has better GraphQL
support for our application. This is what a typical service would look
like:

    import { Injectable } from '@angular/core';

    import { Observable, from } from 'rxjs';
    import { pluck } from 'rxjs/operators';
    import { Apollo } from 'apollo-angular';

    @Injectable({ providedIn: 'root' })
    export class UserService {
      getUser(): Observable<User> {
        const user$ = this.apollo.query({ query: GetCurrentUser });

        return from(user$).pipe(pluck('data', 'getCurrentUser'));
      }
      constructor(private apollo: Apollo) {}
    }

In the above code, you will notice that we have created a `getUser()`
method for our `UserService`. By doing this, we have separated logic
from our component, and allow for our code to be more re-usabled. For
instance, if we want get the user data, we can simply include the
service in the appropriate component, and use the data as needed.

Including Service In Our Component
----------------------------------

If we would like to use this service in our component, we can simply
inject the appropriate service in our constructor.

    // code-box.component.ts
    import { Component }   from '@angular/core';
    import { User }        from './code-box.interfaces';
    import { UserFacade } from './user.facade';

    @Component({
      selector: 'px-code-box',
      template: './code-box.component.html',
      styles: ['./code-box.component.scss'],
    })
    export class HeroListComponent {
      user: User;

      constructor(userFacade: UserFacade) {
        this.user = userFacade.getUser();
      }
    }

You will notice in the above we included something called the
UserFacade. We will get to this in later chapters. Per our architecture,
services should always be fed through the facade file. Regardless, for
now, what should be kept in mind, is that including service in the
constructor, is all that is needed to consume the service.

Ending Off
----------

I would just like to end off saying that actually creating a service is
actually quite simple. It's a piece of architecture, so arguably from an
architectural perspective, it is one of the more complex pieces of
Angular. However, to create and start using, is a relatively seamless
process.
