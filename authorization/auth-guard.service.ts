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
