 Http Interceptors 
==================

Http interceptor is a way to intercept an Http request before passing
them along. Some of the more popular reasons of doing something like
this include Authentication and adding default Headers to requests.

You can use Apollo Client middleware over over Angular's Http
Interceptors.

Dissecting Two Ways of Creating Interceptors
--------------------------------------------

You can either use GraphQL or a series of apis to create Http requests
using a regular RestSvc. This translates to:

1.  Angular's native `HttpInterceptor`

2.  Apollo Client / Apollo Link

Should We Even Use Apollo Link At All?
--------------------------------------

HTTP Interceptor is used under the hood for Apollo Client. The truth is,
this is a fundamental question that can be applied in many similar
scenarios. We are using a framework. One piece of it that it offers, is
not required by our application. Should we use it, or should we not?

1.  Are other teams using our framework, and if not will they have a
    chance to use our tech?

2.  Do we ever expect to use any framework beyond the one we are
    using(in our scenario Apollo Client)?

3.  If unexpectedly, which it always is. If unexpectedly, we end up
    changing over our framework, how difficult will it be to create this
    code once again?

4.  Ease of use for the framework, vs using native code.

    1.  Documentation better for one, over the other?

    2.  Integration for this particular aspect of framework easier
        granted already using other pieces of framework?

Using the above back and forth, it would make sense to use Apollo
Client's native functionality for middleware. To use HTTP Interceptors,
and then move over to Apollo Client for everything else, such as cache,
makes maintenance more cumbersome.

Understanding Interceptors In General
-------------------------------------

An Interceptor will generally take in the current outgoing request, and
pass in the next interceptor. Alternatively, it can transform the
response stream it's self.

Example of Interceptor using HttpInterceptor
--------------------------------------------

The following is a great example of how interceptors work. Let's say
that we want to console out an error whenever it happens. In addition,
we want to set up different errors based on how they happened. Something
simple like the above can setup error handling notifications across the
site for all users.

      return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 400) {
          this.dialog.error("There was an error trying to make your request. 
          If this continues to persists, please e-mail 401@razroo.com");
        }
      })
      );

Example of Interceptor using Apollo Client
------------------------------------------

Apollo Client out of the box offers out of the box middleware to
intercept an http request. Generally that this means, that there will be
a series of apollo functions in your lib folder.

    // authContext to set Authorization token for every request sent from client
    const authContext = setContext(async (request, previousContext) => {
      // Getting the token from the session service
      const token = await this.session.getToken();

      // return {} if token is not set yet
      if(!token) {
        return {}
      }

      // Set Authorization headers with token
      return {
        headers: {Authorization: `Bearer ${token}`}
      }
    });

Using apolloLink, we will combine all of the middleware we have created
throughout the `module.ts` file.

    // creating the conditional link for http and ws requests
    const link = split(({query}) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    }, ws, ApolloLink.from([authContext, error, afterwareLink, http]));

While in our code, for purposes of demonstration, we have only included
the chapter that includes the link. Other links are bundled together. We
can then include this general link in our apollo `app.module.ts` file.

    // creating the final Apollo client link with all the parameters
    apollo.create({
      link: link,
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only'
        }
      }
    });

In the above, we are including our link in the apollo create. This makes
it, so that all our middleware intercepts our apollo requests before
they happen.

Folder/File Structure for HTTP Interceptors
-------------------------------------------

Regardless, if using Apollo, or HttpInterceptors within your
application, it would make sense to create a special lib folder for
apollo within common. Within the special folder for apollo, we can
create a series of link functions and import them within the
`app.module.ts` file.

###  Authentication 

Authentication is the process of identifying an individual usually based
on a username and a password. There are certain situations wherein
intercepting the http request before it is made, is required for
authentication:

1.  Add Bearer Token - The word \"Bearer\" in \"Bearer Token\" is to be
    understood as \"give access to the bearer of this token\". It is a
    token generated by the server on initial login, and is to be used
    for every protected request within the app.

2.  Refresh Token - Refresh tokens are used when the original Bearer
    Token expires, and new ones are to be issued. [^1]

3.  Redirect To Login Page - This will be needed if the Bearer Token
    expired, and we need the user to go back to the login page to
    retrieve a brand new bearer token.

An old co-worker of mine, Sam Severance, once told a funny story, how we
was once working on the couch and his wife stopped by and asked him what
he was working on. He told her, \"Nothing too much, just
authentication\". She said, \"oh what's that?\". He told her, \"Oh, it's
just something that makes programmers run around like chickens with
their heads cut off\". I always thought it was a funny one.

I guess the point behind that story, is that authentication is such an
important piece of an application, and end's up being used in every
request. It therefore becomes:

1.  Relatively difficult to manage.

2.  High cost to application if software is mis-managed.

In addition, every time authentication is worked on for the first time
in an application, it tends to be specific to framework, and technology
within framework you are working on.

Other Interceptors to Be Aware Of
---------------------------------

There are many other interceptors to be aware of. It is important to
note, that Authentication is the main one. It is also possible to set up
global errors across the site based on different errors codes.

[^1]: Look into this, we might want Refresh tokens removed