---
title: Authorization
---
Authorization is a corner stone of any project. Many greenfield projects
will not have the ability to implement authorization right away as
backend will not have the capacity to do so.

However, one of the cool things about authorization is that one has the
ability to set it up ahead of time. When data from the backend comes in,
the authorization service and directives will be ready to do.

## Creating directives for our service

As an example, let's say that we have html that we want to disable, or
hide. We can do the following:

```{.django
<div [myHideIfUnauthorized]="updatePermission"> <!-- a property set or passed into the component –>
<div [myDisableIfUnauthorized]="updatePermission">
```

One is then going to want to create two different directives. One for
disabling if unauthorized:

```{.typescript}
import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { AuthGroup } from '../models/authorization.types';

@Directive({
    selector: '[myDisableIfUnauthorized]'
})
export class MyDisableIfUnauthorizedDirective implements OnInit {
    @Input('myDisableIfUnauthorized') permission: AuthGroup; // Required permission passed in
    constructor(private el: ElementRef, private authorizationService: AuthorizationService) { }
    ngOnInit() {
        if (!this.authorizationService.hasPermission(this.permission)) {
              this.el.nativeElement.disabled = true;
        }
    }
}
```

and another for hiding if unauthorized:

```{.typescript}
import { Directive, ElementRef, OnInit , Input } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { AuthGroup } from '../models/authorization.types';

@Directive({
    selector: '[myHideIfUnauthorized]'
})
export class MyHideIfUnauthorizedDirective implements OnInit {
    @Input('myHideIfUnauthorized') permission: AuthGroup; // Required permission passed in
    constructor(private el: ElementRef, private authorizationService: AuthorizationService) { }
    ngOnInit() {
        if (!this.authorizationService.hasPermission(this.permission)) {
              this.el.nativeElement.style.display = 'none';
        }
    }
}
```

## Creating a Guard for unauthorized

As the last piece of our unauthorized trifecta, we will be wanting to
create a guard. For reference on guards, please refer to the chapter on
guards.

TODO - Go more into depth on what this guard is doing.

```{.typescript}
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { AuthGroup } from '../models/authorization.types';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(protected router: Router,
          protected authorizationService: AuthorizationService) { }
    canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
          return this.hasRequiredPermission(route.data['auth']);
    }
    protected hasRequiredPermission(authGroup: AuthGroup): Promise<boolean> | boolean {
          // If user’s permissions already retrieved from the API
          if (this.authorizationService.permissions) {
               if (authGroup) {
                    return this.authorizationService.hasPermission(authGroup);
               } else {
                    return this.authorizationService.hasPermission(null); }
          } else {
               // Otherwise, must request permissions from the API first
               const promise = new Promise<boolean>((resolve, reject) => {
                    this.authorizationService.initializePermissions()
                    .then(() => {
                       if (authGroup) {
                            resolve(this.authorizationService.hasPermission(authGroup));
                       } else {
                            resolve(this.authorizationService.hasPermission(null));
                       }

                    }).catch(() => {
                        resolve(false);
                    });
            });
            return promise;
        }
    }
}
```

## Service Can Be Called Anywhere

We have the option to call the auth service anywhere in the app that we
want to, in addition to using directives and the guard. For instance:

```{.typescript}
private showMenuItem(authGroup: AuthGroup) {
   return this.authorizationService.hasPermission(authGroup);
}
```