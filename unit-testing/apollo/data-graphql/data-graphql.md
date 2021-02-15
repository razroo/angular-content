---
title: Data GraphQL
---

Assuming your app is using /hrefhttps://graphql.org/GraphQL, you will
have to choose a client to use with GraphQL. We will be using Apollo
Client. Why? It's one of the best clients for GraphQL. Within Apollo,
there are numerous different files that one can create to interact with
GraphQL.

Four Types of Apollo Client Files
---------------------------------

Most notably there are four different types:

1.  [fragments](https://www.apollographql.com/docs/angular/features/fragments)

2.  [queries](https://www.apollographql.com/docs/angular/basics/queries/)

3.  [mutations](https://www.apollographql.com/docs/angular/basics/mutations)

4.  [subscriptions](https://www.apollographql.com/docs/angular/features/subscriptions)

This chapter is not a time for us to go into detail for each. However,
the question is, where within our Angular Directory Structure should we
go ahead and put it within our app?

Dissecting the Purpose of Apollo Client Files
---------------------------------------------

It's important to understand that Apollo Client queries, mutations, and
subscriptions will not only be used with their respective data-service.
It is quite possible that multiple services will be using the same query
and in numerous ways. The fragments used for a particular GraphQL query,
mutation, or subscription, will be used within multiple Apollo client
files. It therefore make sense for the all Apollo client files to be
placed in their own distinct folder within the libs folder(assuming we
are using a mono repo), for the particular app. So now that we have
decided it should warrant it's own folder let's take a quick look at how
the Directory Structure might look like.

Data GraphQL Data Structure
---------------------------

\[libs \[px-illustrator \[data-models \[src \[lib \[user
\[\_user.fragments.ts,file\] \[\_user.mutations.ts,file\]
\[\_user.queries.ts,file\] \[\_user.subscriptions.ts,file\] \] \]
\[\_index.ts,file\] \[\_test.ts,file\] \] \[\_README.md,file\]
\[\_tsconfig.lib,file\] \[\_tsconfig.lib.json,file\]
\[\_tsconfig.spec.json,file\] \[\_tslint.json,file\] \] \] \]

As we proposed all files related to GraphQL are exclusively put into a
single data-graphql folder. This alleviates the potential issues we
mentioned above.
