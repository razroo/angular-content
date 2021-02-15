---
title: Data Access Interface
---

A benefit of having a data access folder to manage parts of our data is
in the architecture. It lets us see in a single interface all our
services, component, state, and respective files.

 The Beauty of a Singular Data Access Interface 
-----------------------------------------------

By having a singular data access interface, we can ensure that the data
is being formatted in the same way across the service, component, and
state.

In addition to this, it allows us to mock all of specs. By having a
singular interface used across the app, it forces the mocked
functionality to be in sync with our specs.

 Singleton Interface - An Example 
---------------------------------

For example, let's run through a singleton interface.

    export interface User {
      id: string;
      name: string;
      location: string;
    }

    //user.service.ts file
    getAllUsers(sort: object): Observable<AllBuyers> {
        const query = AllUsersQuery;
        const variables = {
          projectId: this.projectFacade.projectId,
          sort,
        };

        const allUserss$ = this.apollo
          .query<any>({ query, variables })
          .pipe(pluck('data'), pluck('allBuyers'));

        return combineLatest(allBuyers$, (allUsers: User[]) => allUsers);
      }

    //user.reducer.ts
      case UserTypes.UserLoaded: {
          const user = <User>action.payload;

          return {
            ...state,
            user,
          };
        }

    // user.effect.ts
    @Effect()
    loadUser$ = this.dataPersistence.fetch(UserTypes.LoadUser, {
      run: (action: LoadUser, state: UserStateModelState) => {
        const userId: string = action.payload;
        return this.service
          .getAllUsers(userId)
          .pipe(map((users: User[]) => new UserLoaded(user)));
      },

      onError: (action: LoadUser, error) => {
        console.error('Error', error);
      },
    });

    // user-page.component.ts
    loadUser() {
      this.userSevice.allUsers();
    }

    // user-page.component.spec.ts
    generateMockUsers(data): User[] {
      return {
        ...data
      }
    }

    mockUserService() {
      allUsers() {
        return users;
      }
    }

This lets us go through all the files which will touch data with type
annotations in the data access folder.

As we can see, having the same interface for all of them will ensure we
are using the same data. However, there are two things that we are doing
that aren't necessarily considered as intuitive:

1.  We have one singular interface for the entire project

2.  We are making sure that we use the same interface for our specs.

### how it works

By grouping together all of our data-access elements together in the
same folder, and keeping with one interface, it makes accessing data
much easier. In many other repos, they will put them all in different
folders, and maintain different interfaces, resulting in the potential
for the project not to be in sync.
