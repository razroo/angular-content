 Interfaces and Unions 
======================

In GraphQL, and more in particular because we are working on things from
the UI side of things, a Union type gives us the ability for one field
to contain more than one field. The best way to really think of it is in
terms of Typescript. A union type would be:

      type Book {
        title: String
      }

      type Author {
        name: String
      }

      type Result = Book | Author;

      type Query {
        search: [Result]
      }

As we can see, it is telling us that it can be one of the other with
regards to data type. So instead of returning irrelevant data, we only
return the data we need. This is beneficial for a number of reasons.

1.  It lightens payloads

2.  Allows for succint sorting, on front end. I.e. do not have to sort
    from the backend.

 Using Unions with Apollo Client 
--------------------------------

This is where at this time things start to get really interesting. Using
Apollo with unions/interfaces starts to become tricky. In particular,
the client has no idea what is going on from the server side of things.
Once we have different sorts of data for a singular query coming back
based on the type of data available, Apollo Client will just assume it
is a certain type if it returns all data for a specific type.

Apollo made the decision to use something called the
IntrospectionFragmentMatcher. It will look something like this:

    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: {
        __schema: {
          types: [
            {
              kind: 'INTERFACE',
              name: 'User',
              possibleTypes: [
                { name: 'User' },
                { name: 'UserWithReason' },
                { name: 'UserWithRound' },
                { name: 'UserWithBid' },
              ],
            },
          ],
        },
      },
    });

It tells Apollo Client for Angular that it expects the above types in
the interface for User. Where it starts to get really interesting is
that Apollo Client requires for IntrospectionFragmentMatcher to be used
regardless. So, in their documentation they recommend that a script be
used at build time, that creates a JSON file. This JSON file should then
be used in the IntrospectionFragmentMatcher. This is very cumbersome,
because if backend decides to throw something in for an already existing
interface, it will cause the backend to break for that query.

If you do not have an IntrospectionFragmentMatcher set up in your app,
and backend adds union, or interface types, it will cause that data to
break, and it will return an empty object.

 What to Know Ahead of Time 
---------------------------

What would be really helpful to know ahead of time is that this is an
issue that can only be solved by DevOps. It requires that back end and
front end are built at the same time. That way, they both get pushed
only once the new script is there. In this situation, there really is no
way about it. Having a mono repo architecture across your company will
greatly alleviate this process. [^1]

[^1]: I have created this issue to bring awareness to this
    [issue](https://github.com/apollographql/apollo-client/issues/4202),
    but nothing so far
