---
title: Component Inheritance
---

JavaScript is built on the idea of prototypes. In short, a prototype is
an object that can be inherited by other prototypes. This allows you to
use classes in JavaScript without explicitly using the traditional class
syntax.

When it comes to inheritance, JavaScript only has one construct:
objects. Each object has an internal link to another object called its
prototype. That prototype object has a prototype of its own, and so on
until an object is reached with null as its prototype. null, by
definition, has no prototype, and acts as the final link in this
prototype chain.

 Extending Classes 
------------------

In Typescript land, we have the ability to use a class to extend a
parent class. A classic example of this is let's say we have the
following parent component:

``` {.typescript}
@Component({
    template: ''
})
export class BaseComponent {

    constructor(protected utilitiesService: UtilitiesService,
        protected loggingService: LoggingService) {
        this.logNavigation();
    }

    protected logError(errorMessage: string) { . . .}
    private logNavigation() { . . .}
}
```

If we were to try and inherit it, using the following child component:

``` {.typescript}
@Component({ . . . })

    export class ChildComponent extends BaseComponent {

    constructor(private childDataService: ChildDataService,

    utilitiesService: UtilitiesService,

                  loggingService: LoggingService) {

    super(utilitiesService, loggingService);

      }

    }    
```

We would unfortunately have to pass all parent providers into the child
component to extend it.

 Creating a Class to Store Injector 
-----------------------------------

What we can do, is create a class to store our store injector. For
instance:

``` {.typescript}
import { Injector } from '@angular/core';

export class AppInjector {
  private static injector: Injector;

  static setInjector(injector: Injector) {
    AppInjector.injector = injector;
  }

  static getInjector(): Injector {
    return AppInjector.injector;
  }
}
```

We are then able to inject this into the AppInjector:

``` {.typescript}
platformBrowserDynamic().bootstrapModule(AppModule).then((moduleRef) => {
   AppInjector.setInjector(moduleRef.injector);
});
```

 New and Improved Base Component 
--------------------------------

Our base component now uses the injector service in order to retrieve
all dependencies.

``` {.typescript}
@Component({
  template: ''
})
export class BaseComponent {
    protected utilitiesService: UtilitiesService;
    protected loggingService: LoggingService;

constructor() {
        // Manually retrieve the dependencies from the injector
        // so that constructor has no dependencies that must be passed in from child
        const injector = AppInjector.getInjector();
        this.utilitiesService = injector.get(UtilitiesService);
        this.loggingService = injector.get(LoggingService);
        this.logNavigation();
    }

    protected logError(errorMessage: string) { . . . }    
    private logNavigation() { . . . }
}
```

Now in our child component, we can simply do the following:

``` {.typescript}
@Component({ . . . })
export class ChildComponent extends BaseComponent {
  constructor(private childDataService: ChildDataService) {
     super();
  }
}
```

 Where Component Inheritance Really Shines 
------------------------------------------

Component Inheritance is of course, very valuable. However, having a
dumb and smart component seems to suffice in many scenarios. However,
what is very valuable is when using forms. Inheritance really shines in
those scenarios.
