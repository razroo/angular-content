---
title: Integrating ngrx/store with Apollo Client
---

In many architectures, it is most likely going to make sense that it is
microservice based. That is, your data will be served over a slew of
different apis. The intent is that in a regular application you will be
using GraphQL. We will cover real quick, how to integrate GraphQL with
Apollo Client.

 What is GraphQL 
----------------

GraphQL is a backend data query language. It will allow you to use a
query to make a request, as opposed to having to supply, url, endpoint,
and type of request.

 The Benefit of Apollo 
----------------------

Apollo is a GraphQL client, used to help ease use of GraphQL http
requestswithin app. In particular:

1.  Allows the application developer to easily execute GraphQL queries,
    and configure transport-specific features like headers.

2.  Ensure that all GraphQL results currently being displayed in an app,
    are consistent with one another.

3.  Provide flexible ways to update the cache with results from the
    server when using mutations, pagination, subscriptions, and more.

 Dilemma When Using Apollo Client with \@ngrx/store 
---------------------------------------------------

Apollo will create its own inMemoryCache without dependency on Redux.
This creates two separate stores within the app when using
\@ngrx/store.One for ngrx/store, and another for the Apollo client. It
would be much easier if we had a singular cache/store for the app.

 Enter apollo-angular-cache-ngrx 
--------------------------------

apollo-angular is a series of packages for the integration of the Apollo
client with Angular. apollo-angular-cache-ngrx is a package officially a
part of one ofthe apollo-angular packages. It solves this exact problem,
and allows one to use\@ngrx/store as one Apollo Cache. The following can
be seen in the githubREADME.md for the apollo-angular-cache-ngrx repo.

 Installation 
-------------

We will be wanting to install the entire Apollo suite at this time.

    npm install apollo-angular apollo-angular-link-http apollo-link apollo-client graphql-tag graphql --save

As well as apollo-angular-cache-ngrx

    npm install apollo-angular-cache-ngrx —-save

 Usage 
------

    import {StoreModule} from '@ngrx/store';
    import {
      NgrxCacheModule,
      NgrxCache,
      apolloReducer,
    } from 'apollo-angular-cache-ngrx';

    @NgModule({
      imports: [
        StoreModule.forRoot({
          apollo: apolloReducer,
        }),
        NgrxCacheModule,
      ],
    })
    class AppModule {
      constructor(ngrxCache: NgrxCache) {
        const cache = ngrxCache.create({});
      }
    }

If one were to now make an Apollo GraphQL query in your Typescript
component,your current ngrx/store will be populated with the appropriate
Apollo data.You will be able to subscribe to it as usual. For instance:

      constructor(store: Store<any>, private apollo: Apollo) {
        this.store = store;
          apollo
            .query({
              query: gql`
                {
                  users {
                    status
                    id
                    name
                  }
                }
              `
            })
            .subscribe((initialData: any) => {
              console.log(this.initialData);
            });
      }

At this time however, we are not using GraphQL within the above fashion.
Nonetheless, your typical app will be using this sort of architecture.

 Bonus - Using Fetch Policy with Apollo 
---------------------------------------

In Apollo, there is the option to specify the fetch policy with regards
tocache.

      const fetchPolicy = 'network-only';
      const userActivities$ = this.apollo
        .query<any>({ query, variables, fetchPolicy })

Doing the above, will not cache your query. If you have data, which will
need to re-loaded once a request is made after initial load using a
fetch Policy with network only.
