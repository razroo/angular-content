 Angular Router Guards 
======================

 Router Guards - A Primer 
-------------------------

A Router Guard is a simply a way to guard someone from going to a page
if they aren't allowed to go there. This is also a form of frontend
authentication.

The following are the find fundamentals of Angular Route Guards:

1.  CanActivate

2.  CanActivateChild

3.  CanDeactivate

4.  CanLoad

5.  Resolve

###  CanActivate 

It is used to determine if a certain route can be activated. An example
would be as follows:

    export class userGuard implements CanActivate {
      constructor(
        private router: Router,
        private userService: UserService,
        private userFacade: UserFacade,
        private projectFacade: ProjectFacade
      ) {}

      canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> {
        const userId = route.paramMap.get('userId');

        return this.projectFacade.projectId$.pipe(
          switchMap(projectId =>
            this.userService.getuser(userId, projectId).pipe(
              tap(user => {
                if (user && user.id) {
                  this.userFacade.userLoaded(user);
                }
              }),
              switchMap(user => {
                return user && user.id
                  ? of(true)
                  : _throw('Unable to retrieve user');
              }),
              catchError(error => {
                this.router.navigateByUrl(this.getPrimaryOutletUrl(state.url));
                return of(false);
              })
            )
          )
        );
      }

    }

The above snippet is a great example of how to tap into the power of
canActivate. Here we have two things going on. One if the user actually
has an id, and is actually a legitimate user, we will pass along the
userFacade which will populate our store, thus populating the page with
actual data.

###  CanActivateChild 

CanActivateChild is very similar to canActivate only it is for the
childRoute. Will not go into detail on this one, use documentation.

###  CanDeactivate 

TODO

###  CanLoad 

TODO

###  Resolve 

TODO
