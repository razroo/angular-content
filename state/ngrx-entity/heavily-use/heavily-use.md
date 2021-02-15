---
title: The Case for Using Ngrx/Entity by Default
---

 A Synopsis of Normalization
---------------------------

The idea of normalization in relational databases - a database
structured to recognize relations among stored items of information - is
to eliminate data redundancy, and anomalies with insertion, delete, and
updating.

Within a front end setting, it is mostly the backend that deals with a
large portion of eliminating data redundancy, and CRUD anomalies.
However, there are many use cases still with regards to Insertion,
Delete, and Updating anomalies, that can be solved by using
normalization within ngrx/platform.

Why Ngrx/entity is Exciting
---------------------------

\@ngrx/entity for me personally, is the most exciting part of
ngrx/platform for two reasons:

1.  It is a library based on computer science fundamentals of building
    relational databases.

2.  It actually introduces something novel to the Redux ecosystem
    (something I found that the Context and Hooks API didn't even give
    that sort of freshness).

Dis-secting a Real World Example of ngrx/entity
-----------------------------------------------

### CodeBox Interface

Let's imagine that we are building a Pixel Illustrator application.
Something similar to the
[following](http://charliegreenman.github.io/codeILL/). One of our
interfaces for the state contained within the codeBox, would look
something like this:

      interface CodeBox {
        id: string;
        color: string;
        xPosition: number;
        yPosition: number;
      }

Let's imagine we have an array of CodeBox interface(AKA CodeBox\[\])
that we would like to use. If we want to select a specific slice of data
within our database table, things can be a little bit tricky. We would
need to loop through all of the data, and then find the appropriate set
of data with the id/value that we want.

Instead, what would make our data table more efficient, is if we have an
array of ids that corresponds directly to our dictionary of data. In our
store we can add some extra key values such as selectedId. This way, we
can simply say the data that we would like is based on one, or two
parameters passed to a function. This can be re-used in other stores, as
data is structured the same way, and selected in the same fashion.

ngrx/entity follows this pattern
--------------------------------

Ngrx/entity is a library which follows this pattern, so that data used
within ngrx/store is normalized. This means, within the context of using
JSON data, that we have a dictionary, combined with an array of ids. The
index of the ids directly correlates with the key/value in the
dictionary. This is very powerful, and I will prove it by bringing up a
couple of situations.

### The Power of Ngrx/Entity Deep Dive

Scenario One:

Updating one dictionary data set. Let's imagine that we were to load our
Pixel Illustrator a set of coordinates to populate the pixel
illustrator. However, let's say we wanted to update one particular piece
of that data set, by only a smaller portion of data, when loading entire
data set, and then a larger portion when expanding details for
particular data set. Ngrx/entity allows us to maintain the same store,
but simply update the once piece of data in the dictionary.

Scenario Two:

We have two independent components pulling data from the same store, but
we do not want them to interact with each other. We would need to create
a unique id for both that would allow us to follow this pattern.
ngrx/entity naturally allows us to pass in a unique id, that allows us
to accomplish this correlation id pattern. This is such a powerful
pattern.

Scenario Three:

We have a data table, and we would like to know which set's of data we
have selected. We have the ability to pass in id, into another chapter
of data store, called selectedIds. So we can have a checkbox, select
multiple checkboxes, and know which data sets have been selected.

Scenario Four:

We want to delete, update, or upsert a certain subset of data. Being
able to pass in the id only, makes this process infinitely easier, and
the api more manipilating data, more re-usable.

Choosing Ngrx/entity as the Default
-----------------------------------

This leads to the point this chapter is trying to make. In any situation
with data, odds are that you are going to update, delete, upsert, or
pull in more data for a specific subset of data. This means, that
anytime that you are going to use more data, using ngrx/entity as the
default makes sense. The Nrwl CLI for ngrx/store follows this pattern.
