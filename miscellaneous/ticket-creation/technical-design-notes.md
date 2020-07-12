 Technical Design Notes 
=======================

When creating a ticket, it is important that technical design notes be
written as a part of actual JIRA ticket.

 What are Technical Design Notes? 
---------------------------------

Technical Design Notes are a way to abstract the decisions one will make
towards architecturing an app.

 Benefits of Creating Technical Design Notes 
--------------------------------------------

It allows the app to be thought through before app is built. Saving time
on re-factoring code, ensure code quality, and retain confidence that
tickets will be done the way they should be done.

 When to Create Technical Design Notes 
--------------------------------------

Technical Design Notes can be cumbersome, and writing them does not make
sense in all instances. In one of two situations, technical design notes
should be created, when one, or more of the following is true:

1.  When Unit Testing is involved. For instance, let's say we have a
    filtering component, and we need to test what will happen if a user
    inputs a word with a space in it, or with a uppercase character.

2.  When strategy architecture is involved. For instance, we need to
    create a strategy for routing, or how we will end up pulling in
    data. Sometimes, it is something which will be an unknown, and
    saying this is what I am trying to figure out, and it is a unknown
    is more than perfect.

 What Goes into Technical Design Notes 
--------------------------------------

It should mention at a very high level, what should go into the
component. For instance, if I am building a filter, it should mention:

1.  That I plan on using ngrx/store in order to store filters.

    1.  Specifically as strings

2.  Will be using \<md-input\> material design component for filters.

3.  Will be writing integration test for filters individually, and how
    they will interact with each other.

4.  Will be creating filters for the following test scenarios.

    1.  Camel case

    2.  Space in filter

    3.  Pure text

    4.  Dates
