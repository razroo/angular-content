 Ngrx Effects 
=============

Ngrx Effects - A Primer
-----------------------

Ngrx effects can be one of the more ambiguous parts of the ngrx stack.
They are something that is supposed to happen when something else has
happened.

It will listen for a particular action, and true to Ngrx, return an
observable. In this observable one will have the option to do whatever
they want as well as publish(return) to the action stream.

The line, however, can be blurred as to what the difference is between
an ngrx/effect and a ngrx/store. It is important to distinguish them for
architectural reasons.

It can be difficult to determine the different use cases where someone
would use an effect, turning into a slippery slope.

###  Code Example 

    @Effect({ dispatch: false })
     userDeleted$ = this.dataPersistence.fetch(
       UserActivitiesTypes.UserDeleted,
       {
         run: (action: UserDeleted, state: UserStateModelState) => {
           this.snackBar.open('User Deleted', 'Ok', {
             duration: 2000,
             verticalPosition: 'top',
           });

           return null;
         },

         onError: (action: ActivityDeleted, error) => {
           console.error('Error', error);
         },
       }
     );

This code example, is a great example as to when someone might use an
effect. As we can see here, we have an action that is being triggered
for when a user is deleted. We then have an effect who's sole purpose to
have a snack bar open when action is called.

###  The Three Pillars of an Effect 

As we discussed earlier, knowing when to use an effect can be a tricky
thing to decipher. Think of it as having the ability to do the
following:

1.  Hook into State.

2.  Ability to do whatever when action is called.

3.  Publish an action back into the state management cycle.

In our scenario, for deleting a user we had two effects:

We called a GraphQL service to delete a user. We then retrieve the
result returned by the GraphQL service, and trigger another effect,
which is our snackbar effect. Yes, this logic can potentially be handled
by our view layer within our component.

We can use the service directly. Having all of this logic encapsulated
in our effect makes everything very clean.

###  Further Reading 

While this is out of the scope for this book, I would like to suggest
further reading of the following:

-   Use cases for using Effects -
    [https://medium.com/\@tanya/understanding-ngrx-effects-and-the-action-stream-1a74996a0c1c]("Understanding NgRxEffects and the Action Stream")

-   Use cases for NOT using Effects -
    [https://medium.com/\@m3po22/stop-using-ngrx-effects-for-that-a6ccfe186399](Stop using ngrx/effects for that)
