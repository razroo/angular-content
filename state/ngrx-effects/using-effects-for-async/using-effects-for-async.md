---
title: Using Effects for Async
---

Effects in an ngrx setting are a secret weapon when is comes to creating
async events. For instance, let's imagine that after a piece of data is
loaded, we would like to display a toolbar, and then navigate to a
specific page. Using an effect, we can make this process quite simple.
We can download the data using an effect, and then once complete, we can
cause another effect to laod, that would cause the page to navigate to
another. This is a very common use case that could be used within our
situation.

 Understanding Architecture in totality 
---------------------------------------

As mentioned before, effects are a way to handle asynchronous data in
ngrx. As a result, it can be used to show really anything within the
app. For instance, let's say you would like to show a toolbar once a
certain something is downloaded within app. When we download that data
within the app, we would like to pass it into our store, so that our
data can be used across the app. Intuitively, one might decide that one
can do it all within the component. For instance, make the data request,
and then
