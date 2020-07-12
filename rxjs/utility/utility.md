Utility
=======

Utility functions in RxJS as are utility methods in programming, are
often re-used operators, which are helpful for accomplushing routine
RxJS tasks. However, the only common used utility on a day to day is
`tap`.

tap
---

`tap` can be used to perform an action, or a side effect. A great
example, and one used in an enterprise setting, is to navigate user to a
particular place based on particular action. For instance, let's say the
user log's out.

``` {caption="login.effects.ts"}
@Effect({ dispatch: false })
logOut = this.actions.pipe(
  ofType(LoginTypes.LogOut),
  tap([payload, username] => {
    this.router.navigate(['/']);
  })
)  
```

In the above, we are tapping into the action that specifies user has
logged out. In addition to our reducer logic wiping clean all the data
that was in the user's store, we are also navigating the user to the
default rout. This a perfect scenario for using `tap`, as we want to
create a side effect of navigating to a route. However, we do want to
return an observable/action (i.e. do not want to use `map`).
