---
title: Ngrx Entity
---

The Ngrx repo, until recently, is similar to your regular redux app. It
included actions, reducers, selectors. There has been efforts to go
ahead and create libraries for aspects of ngrx that can perhaps be
re-usable.

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule,],
```

One of these is \@ngrx/entity.

 Ngrx Entity at a High Level 
----------------------------

At its core, ngrx entity is an API for manipulating and querying entity
collections. In particular:

1.  Reduce boilerplate for creating reducers that manage a collection of
    models.

2.  Providing CRUD operations for managing entity collections.

3.  Extensible type-safe adapters for selecting entity information.

This architecture works well when creating data as a single source of
truth. Let's say in your application, you have a data table on every
page that pulls in data. Throughout every page, you have a way of
manipulating this data. Ngrx/entity will allow for this
architecture to be fluid, and have all manipulation of data be within a
singular area.

 Example of Ngrx Entity 
-----------------------

Within our app we the ability to illustrate a pixelated character using
pixels. Every time that a pixel within the grid is selected, we are
going to add it to our store. This store is going to be used to display
the code version of the app. In addition, we are going to have to remove
the pixel when clicked on within our store. In addition, if we have
selected a new color, and we select a new pixel with that color, that
pixel should be updated with the proper color. What we have just
described is a perfect CRUD app.

 Installing ngrx/enity 
----------------------

```bash
npm install @ngrx/entity --save
```

 ngrx/entity - A Step Back 
--------------------------

Let's step back for the time being and look into what ngrx/entity
actually does.

Ngrx/entity will create a list of ids and a dictionary of entities.
Let's brush up on entity, list, and dictionary:

That being said, a sample ngrx/entity data structure will look like
this:

```ts
  ids: [
    '3QOZBAAAQBAJ',
    'y4nmOe0-WD0C',
    'lS5SAQAAIAAJ',
  ],
  entitites: {
    '3QOZBAAAQBAJ': {
      name: 'Lebron',
      id: '3QOZBAAAQBAJ'
    },
    'y4nmOe0-WD0C': {
      name: 'Kyle',
      id: 'y4nmOe0-WD0C'
    },
    'lS5SAQAAIAAJ': {
      name: 'Sarah',
      id: 'lS5SAQAAIAAJ'
    }
  }
```

 Adapter Pattern - A Primer 
---------------------------

Before we go ahead and discuss what an ngrx/entity adapter is, let's go
through a quick primer on the adapter pattern in general. As explained
in the book, Design Patterns: Elements of Reusable Object-Oriented
Software, an adapter pattern:

 Introducing Ngrx/entity adapter 
--------------------------------

The ngrx/entity adapter, similarly, will take in data, and wrap it
inside of ids and entities. So the adapter can be considered as
something that will modify the data. The default adapter that comes with
ngrx/entity, takes two default values:

-   selectId: A method for selecting the primary id for the collection.

-   sortComparer: A compare function used to sort the collection. The
    comparer function is only needed if the collection needs to be
    sorted before being displayed. Set to false to leave the collection
    unsorted, which is more performant during CRUD operations.

The selectId is the more important default value. This will be the
default UUID that will be used within the app. The general idea is that
some sort of id will be returned by the database for that particular
item. One will then be able to use that id for all crud operations. In
addition, most likely pass in that id for your Rest Service, or GraphQL
query.

 Ngrx/entity Adapter Example 
----------------------------

Creating an example adapter, might look something like the following:

      export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
      selectId: (emailStore: any) => emailStore.id,
      sortComparer: false,
    });

There will then be a series of adapter methods returned by ngrx/entity.
Without going into them in detail, here they are:

-   addOne: Add one entity to the collection

-   addMany: Add multiple entities to the collection

-   addAll: Replace current collection with provided collection

-   removeOne: Remove one entity from the collection

-   removeMany: Remove multiple entities from the collection

-   removeAll: Clear entity collection

-   updateOne: Update one entity in the collection

-   updateMany: Update multiple entities in the collection

-   upsertOne: Add or Update one entity in the collection

-   upsertMany: Add or Update multiple entities in the collection

 addOne example 
---------------

In our app we will be using a series of different ngrx/entity methods.
However, we will be using addMany as for the most part many of the
methods are very similar.

Let's focus on a specific reducer chapter within our app.

```ts
case gridTypes.added {
    return {
      adapter.addOne(action.payload, state)
    }
  }
```

That would really be it. It will insert a unique id for that specific
pixel. In addition, it will go ahead and new entity within the entities
object.

 Identifying Different Entity Selectors 
---------------------------------------

So far ngrx/entity has given us an adapter, which allows us to choose
the id we would like to use for our entity dictionary, as well as our id
list. However, what if we wanted to retrieved all of our ids, or all of
our entities? It can be a bit cumbersome. So thankfully enough, you saw
it coming, ngrx/entity offers entity selectors out of the box.

```ts
// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUsers = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;
```

It is important to recognize that these selectors will not actually
produce state on their own. What they do is return a function when used
in conjuction with the createSelector function, will return the
appropriate entity.

 How to use getSelectors 
------------------------

These selectors are then meant to be used with the createSelector
function. The following is an example:

```ts
export const selectUserIds = createSelector(
  selectUserState,
  fromUser.selectUserIds
);``
```
    
Now one will have a state that specifically returns ids for a specific
list.

 Using updateOne 
----------------

Just to show how convenient ngrx/entity is. Let's say in your app you
wanted to update a specific field. For instance, in our app it is going
to be the color for a specific pixel.\] All you would need to do is the
following:

```ts
case gridTypes.updated {
  return {
    adapter.updateOne(action.payload.id, state)
  }
}
```

The only difference between the signature for addOne and updateOne, is
that with updateOne, you are just supplying the id to be updated.

 Wrapping Up 
------------

Using ngrx/entity will greatly increase the efficiency of your app.
Being able to use a CRUD app in this fashion, will simplify the
architecture across the app, where this state can be used in numerous
places.
