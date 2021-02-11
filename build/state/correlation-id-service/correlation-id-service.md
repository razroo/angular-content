 Correlation ID Service 
=======================

One of the more peculiar situations within an Angular application is
file upload. Generally, it is for the following three reasons:

1.  There is a before, and after state. What does the file look like
    before the upload, and what does it look like before the download.

2.  Depending on scenario, we might have multiple components on the
    page, and therefore need to make sure, that the state of one, does
    not affect the state of the other.

3.  State is contained within a single component, albeit there might be
    a number of different components on the same page. It would seem
    state is superfluous in this scenario.

4.  Following dumb/smart component architecture, in order to keep
    application dry, we are going to need to inroduce our state from
    some outside source, using event emitters.

The scenario that commonly applies to file upload can happen in many
other situations as well. While \@ngrx/store is something which is a
good idea for the majority of any enterprise application, it is not
necessarily the right choice in this scenario.

Identifying Bloat of \@ngrx/store
---------------------------------

\@ngrx/store bloat is real. To put into perspective, it requires an
action, a reducer, a facade, in better architectured solutions,
ngrx/entity, and selectors. In addition, state isn't naturally
re-usable, as it is an object. Lastly, and most definitely, not least,
special nomenclature must be put in place to make it, so state can be
re-used in the future.

Architectural Danger of Using a Service
---------------------------------------

Using a service in this scenario makes the most sense. Services can have
a direct 1:1 relationship for as what they need to do. In addition, it
can help circumvent circular dependencies in numerous scenarios, by
keeping heavy logic from the store. However, services by default break
away from the cookie cutter api's brought to you by the \@ngrx life
cycle. It is important to understand that if services are created, that
one needs to add proper due dilligence to make sure services are
properly used.

1.  Documentation for each method.

2.  Functions kept small.

3.  Readme.md in root of service lib, specifying methods used.

4.  Heavy Unit Testing

That would be it. Ideally these services are created sparingly, but they
have their advantages, wherein \@ngrx/store is obvious bloat.
