 Re-Usable State - An Anti-Pattern 
==================================

Creating re-usable state in an Angular application might be one of the
most important architectural decisions you might also make. It will also
have a lasting impacting on your future architectural decision. This is
because redux is agnostic by design across different frameworks.

Why Create Re-usable State?
---------------------------

If there is a component that is going to be used across different pages,
having a re-usable state will simplify the architecture.

The logic for reducers can be created once. This logic can then be
re-used numerous times within your app. However, having re-usable state
in \@ngrx/store is an anti-pattern.

Re-usable State - An Anti-Pattern
---------------------------------

Let's imagine that you have a re-usable data-table that you would like
to use on numerous pages.

There are certain pieces of logic that you want to use with your state.
You might want to create a reducer to determine which rows have been
selected, and if all have been selected. If all are selected, then it is
moved over to the selected key/value.

This logic should be mover over to state so that it can re-used within
the data table in order to be passed around and re-used within the app.

As soon as you are saying the component is going to be re-usable, you
are recognizing that there is need for there to be a dumb component and
a smart component. As soon as you are saying there is going to be a dumb
component, then any logic relating to the interface should remain within
the components logic itself. The only state that you will be needing, is
the data that is loaded. That part of state is simplified to a great
extent to where it makes sense to have state unique per each page.
