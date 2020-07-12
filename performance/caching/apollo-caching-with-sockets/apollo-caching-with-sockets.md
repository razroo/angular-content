 Apollo Caching with Sockets 
============================

The value of being aware of architecture is twofold. One is that one has
the option of preventing future catastrophes.

You will most like face a scenario where you're required to put together
a solution within a time intensive setting. Caching with Apollo will
help you in this scenario.

This is because you might include caching, but realize that sockets is
something that we would like included with the app. The development team
might decide to throw away caching, so that data can be updated.

 Apollo Caching with Sockets 
----------------------------

It should be noted that GraphQL offers three types of data queries:

-   Query

-   Mutation

-   Subscriptions

Subscriptions in particular is very similar to web sockets.

The package at this point which makes the most sense is
[subscriptions-transport-ws](https://github.com/apollographql/subscriptions-transport-ws)
