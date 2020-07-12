 Dependency Injection 
=====================

Dependency Injection from an Angular perspective pragmatically only
solves one real issue. That issue is Unit Testing. In an
Angular/Typescript setting a developer will have the ability to import
and export a file. So there's already is a way of decoupling different
services/classes from each other.

``` {caption="passing in without dependency injection"}
import { PostsFacade } from '@razroo/razroo/data-access/posts';  

@Component({
  selector: 'razroo-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: any[];
  allPosts$: Observable<Post[]> = new PostsFacade().allPosts$;

  constructor() {}

  ngOnInit() {}

}
```

Our class doesn't control how this value in injected. It goes straight
from the import into our class. However, if we were to do something like
this:

``` {caption="passing in with dependency injection"}
import { PostsFacade } from '@razroo/razroo/data-access/posts';  

@Component({
  selector: 'razroo-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: any[];
  allPosts$: Observable<Post[]> = this.postFacade.allPosts$;

  constructor(private postsFacade: PostsFacade) {}

  ngOnInit() {}

}  
```

Now it is our `BlogComponent` class that is controlling how the
`postsFacade` is getting passed through. This makes things particularly
easy when it comes to unit testing. It allows us to override the value
in our unit test, and create mocks for all services. *We will discuss
more on this in the chapters in the chapters involving unit testing, but
I just wanted to bring up the main reason behind unit testing here.*

Less obvious, and specifically if the `providedIn` is used, is
dependency injection also helps keep bundle sizes compact. This is done
by tree shaking, which refers to the compiler removing code from final
app, if it is not actually referenced by the app. If we do not use
`providedIn`, tree shaking will not be done.

It lets us to keep our configurations separate. While the ability to
export/import is an option within Typescript, dependency injection,
allows the framework to be completely aware of everything being used
within the framework. So, besides unit testing, this architecture can be
useful for using tokens which contain a particular value, and then being
overridden depending on environment of application(e.g. development vs.
production).

 Real World Example 
-------------------

###  Creating Injectable Service 

The DI(Dependency Injection) Framework, allows for an injectable service
class to be passed to a component. Let's say that we want to create an
injectable service, we would do the following:

    import { Injectable } from '@angular/core';

    @Injectable({
      providedIn: 'root',
    })
    export class PxCodeService {
      constructor() { }
    }

This code right here is doing two things:

1.  It is saying that this service is an Injectable.

2.  It is saying that this injectable should be provided in the root(aka
    the AppModule).

###  Including Injectable Service in Component 

Now if we would like to include this service in our component, we would
do the following:

    // code-box.component.html
    <div *ngFor="let codeBox of codeBoxes">
      {{codeBox.data}}
    </div>

``` {caption="Include Injectable Service in Component"}
// code-box.component.ts
import { Component }   from '@angular/core';
import { CodeBox }        from './code-box.interfaces';
import { PxCodeFacade } from './px-code.facade';

@Component({
  selector: 'px-code-box',
  template: './code-box.component.html',
  styles: ['./code-box.component.scss'],
})
export class HeroListComponent {
  codeBoxes: CodeBox[];

  constructor(pxCodeFacade: PxCodeFacade) {
    this.codeBoxes = pxCodeFacade.getCodeBoxes();
  }
}
```

Services that need other services
---------------------------------

Services can have their own dependencies. If we wanted to inject a
service, into our service, it would be as simple as doing the following:

    import { Injectable } from '@angular/core';
    import { Logger } from '../logger.service';

    @Injectable({
      providedIn: 'root',
    })
    export class PxCodeService {
      constructor(private logger: Logger) { }

      getLog() {
        this.logger.log('getting codeboxes');
      }
    }

As we can see in the above, our injected service, is taking another
injected service. By simply passing it into the constructor, similar to
how we do for our components, we can use it within our application.

 Dependency Injection Token 
---------------------------

Internally Angular uses dependency injection tokens for injectable
services, to reference what injectable it is using. As an Angular
developer, we also have the option to use these tokens directly within
our app. There are two different ways of providing tokens in Angular:

1.  Strings

        {provide: 'EmailService', useClass: MandrillService}

2.  Type Tokens

        {provide: EmailService, useClass: MandrillService}

3.  Injection Tokens

        new InjectionToken{provide: EmailService, useClass:} 

    Benefit of this approach, is that it avoids name clashes.

Tokens can be a useful way for providing a default value to be used
across the app, hijacking the value, and providing something else, in
the scenarios where it is not of use. An example of such, is within the
Angular Material Components. By default, the `MAT_DATE_LOCALE` will use
the existing `LOCALE_ID`. However, if you would like to override the
date locale across the app, all that needs to be done, is to overrride
the `MAT_DATE_LOCALE` token.

    @NgModule({
      providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
      ],
    })
    export class MyApp {}

This allows for numerous components across the app, using the same token
to be overridden.

Wrapping Up
-----------

The intent of this chapter, is to introduce the concept of dependency
injection in Angular. In addition, present the scenarios in which it is
used in a regular enterprise application. Dependency injection as a
pattern can be very complex, and I feel looking at the documentation,
the majority of use cases tend not to be used. So I wanted to keep this
simple. Unit testing, the other widely used part of dependency
injection, will be discussed in a separate chapter on unit testing.
