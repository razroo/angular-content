---
title: When to Use @ngrx/store
---

When to use \@ngrx/store is an opinionated topic.

State is a single data object that can be accessed anywhere within the
app. How this happens changes from one state management framework to
another but the core is the same. However, the difficulty is that state,
being that it exists outside of the component, can contain quite a bit
of bloat.

Redux as evolution on Flux
--------------------------

Redux solved the same problem Flux did.

However it simplified the process.

![image](./state/when-to-use-ngrx/flux_v_redux){width="9.1cm"
height="6cm"}

It also more importantly standardized the Flux architecture as a
library.

\@ngrx/store - Integrated Reactive Programming with the Store
-------------------------------------------------------------

\@ngrx/store took redux one step further, and integrated observable with
the store. There is a fantastic founding paper on the benefits of Real
Time:
[Programming](http://www-sop.inria.fr/members/Gerard.Berry/Papers/Berry-IFIP-89.pdf)

In it, it discusses two main benefits of Reactive Programming:

1.  Asynchronous

2.  Detemrinistic

Andre Staltz stated the following: \"Reactive Programming raises the
level of abstraction of your code so you can focus on the
interdependence of events that define the business logic...\". [^1]

State is generally changed with events and being able to abstract the
level of state makes complete sense. It greatly abstracts, and
simplifies the process.

 An Example of an \@ngrx/store 
------------------------------

For instance, let's say that we have a user-settings data-access
feature. Our folder file structure might look like the following:

This, of course, would be in an enterprise setting which honestly this
book is geared towards. However, it definitely strikes home a very good
point. There is a ton of bloat to creating a store.

Understanding the Reality of State
----------------------------------

I think that looking at the above folder/file structure, it is very
important to realize that state has gone so far beyond what it was
originally intended to do. You will notice effects, a facade pattern. In
addition, quietly sitting inside of our reducer, is \@ngrx/entity. The
whole suite of \@ngrx is so robust that it deals with the entire life
cycle, of pulling in data, and integrating it with the client side. In
fact, if it wasn't for the bloat that it introduced, it would be able to
solve every single situation. However, we are trying to carry over data
into the client side in a scalable and maintainable fashion.

 Addressing the Problems State Alleviates 
-----------------------------------------

Problems that state solves:

1.  Avoiding Multiple Actors

2.  Avoid Extraneous \@Inputs

    1.  Pass down multiple levels to child, and send change back to
        parent

    2.  Siblings in a tree, might have to pass up and over

3.  Stops Event Bussing /marginparLook more into this one

4.  Decouples component interaction. Component does not know what
    changed, only knows what changed it.

5.  Allows for Component interaction via the Observable Pattern

6.  Client Side Cache if needed.

7.  Place to Put Temporary UI State

These are 7 things that state has to offer. If a component were to be
able to interact with another component on that page, by altering it's
data, it should have state.

###  Addressing Additional two Offered by \@ngrx/store 

Added into your classic \@nrwl/nx ecosystem, is:

1.  \@ngrx/entity

2.  Facade pattern for single

3.  Effects for asynchronous programming

The Mesmerism of \@ngrx/store
-----------------------------

So, as mentioned before, the \@ngrx/store ecosytem has grown into a
beast. In fact, an Angular developer working on an enterprise and data
heavy application might spend 60% to 70%(rough estimate) of their time
working within \@ngrx/store.

I was a little bit curious as to how this repetition might
psychologically affect the way that we as software engineers develop. In
particular, if we can introduce services that accomplish what
\@ngrx/store does, albeit less bloat, is it worth it for the team?

I found an interesting book, called, \"On Repeat: How Music Plays the
Mind\". It discusses a very interesting topic, of how we as humans
interact with music. In it, it discusses something known as \"The
Exposure Effect\".

It's something that we have all experienced with regards to music. You
will hear some music on the radio that you are not particularly fond of.
However, you will here it again the grocery store, movie theater, and
then the store corner once again!

By this time, you are hooked.

As the book discusses, as you are used to the repetition of the song,
you are already expecting the next piece of song, by the time you
working on the beginning of it. Repetition, allows for us as the book
argues, to look at a passage as a whole.

Arguably, the point can be made for software as well.

Within the application you are working on, the more you use that pattern
the more accustomed you are to it. In addition, and I can personally
attest to this, by the time, I am working on the facade, I am already
thinking of the effect that is going to tie into our service, and how I
am going to tie it into the component. Jumping out of this repetition
can counter-productive, even if there is less code involved by creating
a service.

 Attachments Service - Story Time 
---------------------------------

There are some very unique cases, where perhaps state shouldn't be used
on an objective level. I for one always felt that state has a bit of
bloat. However, after discussing with team members, I have begun to see
the way they think.

This particular situation was about a feature for attachments that the
app needed. In particular, multiple components on the same page, would
have attachments that would be uploaded to a server. Then, when the api
using the attachment would make a request, it would pull attachment from
the server, using it's id. If a service or \@ngrx/store was not used,
there would be a lot of repetition across the app. This led to the
dilemma, should a service, or \@ngrx/store be used.

 Business Requirements 
----------------------

One, is that multiple components on the same page were to use this
attachments service. Second, is that we want to show the user when a
certain attachment is loading, and when it is no longer loading.

 Argument for using a Service 
-----------------------------

In truth, the attachments were meant to be self contained within a
singular component. This would have made the service as very simple.
However, based on the business requirements, we would have had to create
a double nested correlation id. This means that a double nested
correlation id pattern had to be created.

One, to make sure that different components do not affect each other.
Two, the id produced on the front end, is different than the id produced
on the backend. We need to create an id that can be used by both. This
is done by creating a second Uuid, that is nested within the first one.
I.e. a dictionary inside of a dictionary.

So, really in this situation, there is arguably nothing that the store
has to offer. However, what has happened, using \"The Exposure Effect\"
is that we are now comfortable with the API for \@ngrx/entity.

Comfortable isn't accurate actually.

We are able to predict, \@ngrx/store as a whole. Any developer who
worked and will work within the app, can pick up on the code base easier
than a service, being that it is predictable. In addition, we have a
single place where we expect all of our data to be.

Creating a service like this might make sense for the person spending
the time thinking through the problem. However, for any other person, it
will be an incredibly uncomfortable experience reading through your
code. \@ngrx/store therefore at this point takes on it's new life as a
way to make sure code is consistent, even if it isn't the right choice
for your app.

 What Comes Out From Our Back and Forth 
---------------------------------------

Truly, any enterprise situation, wherein a data request is made from the
back end, it should be handled using \@ngrx/store and not services. This
is simply because, in any enterprise setting, the majority of situations
is more properly handled using \@ngrx/store.

1.  It allows for a cookie cutter api, that is used time and time again.
    The code bloat it creates, is alleviated by use of Nrwl Nx.

2.  Your application's performance will not affected as a result.

3.  From personal experience, business requirment change quite a bit.
    The odds of your service now being needed to re-written to
    accomodate it being used in multiple components, is also quite high.

 Final Note 
-----------

If you are building an enterprise app from the beginning and are
building a team, put this as part of the conventions right away. It will
make your life easier. If you have a team, and you haven't fully agreed
on this one, send them this article and start a conversation.

[^1]: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754\#why-should-i-consider-adopting-rp
