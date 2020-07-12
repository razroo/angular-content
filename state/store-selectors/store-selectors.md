 Store Selectors 
================

Selectors are pure functions. Pure functions are functions which always
return the same result, given a certain parameter that take slices of
state as arguments and return some state data that we can pass to our
components.

Object That We Will be Working With
-----------------------------------

    {
      settings: {
        column: '20',
        row: '20',
        pixel: '20',
        draw: true,
        false: false,
      },
      colorPicker: {
        backgroundHex: '#191919',
        backgroundRed: '25',
        backgroundGreen: '25',
        backgroundBlue: '25',
        pixelHex: '#000000',
        red: '25',
        green: '25',
        blue: '25'
      },
      codeBox: {
        css: [
        {'123': {color: blue, x: 20, y: 17}},
        {'246': {color: orange, x: 20, y: 18}},
        {'246': {color: orange, x: 20, y: 19}},
        ],
        sass: false,
        less: false,
        js: false
      }
    }

Basics of Select using ngrx/store
---------------------------------

The simplest method is to grab state by the using store select method:

    export const settings$ = this.store.select('settings');

This will grab the store data for settings and return an observable. So
for instance, let's say inside of our component, doing:

      this.gridFacade.settings$.subscribe((data) => {
       console.log(data)
      });

will produce JSON for:

      {
        column: '20',
        row: '20',
        pixel: '20',
        draw: true,
        false: false,
      }

 Feature State in NGRX 
----------------------

Previously we discussed being able to select a certain slice of state
being using store.select. However, there are many scenarios wherein it
is not as simple as selecting the featureState and passing it to the
component. For instance:

1.  When using ngrx/entity, creating a dictionary of values, and an
    array of ids. In order to grab ids, entities, ids and entities, a
    specific entity, it's important to be able to have the a base
    feature selector to work off of.

2.  When having numerous nested peices of data, under one specific
    feature state slice. We can keep our code DRY [^1], by want be able
    to build off of nested data on a number of levels.

 Feature State in NGRX - An Example using Ngrx/entity
----------------------------------------------------

Ngrx/entity if not familiar already, will use what is called a
normalized database. It is a way of having the way of accessing
something independent of the actual data. Therefore, it easily allows
for an item to be created, removed, updated, or deleted. Ngrx/entity is
ngrx/store's solution to creating a noramlized database. Using feature
state with ngrx/entity is imperative in order to streamline all the
various ways of selecting ngrx/entity data. For instance, let's say we
had entities for our codebox, and we wanted to select data in a number
of ways:

1.  Select all entities

2.  Select all ids

3.  Select the current selectedId by using an Entity

In order to streamline this process, we would do the following:

    const { selectAll, selectEntities, selectIds } = codeBoxAdapter.getSelectors();
    const getCodeBoxState = createFeatureSelector<CodeBoxState>(
      'codeBoxStateModel'
    );

    const getCodeBoxEntities = createSelector(
      getCodeBoxState,
      selectEntities
    );

    const getCodeBoxIds = createSelector(
      getCodeBoxState,
      selectIds
    );

    const selectedBuyerId = createSelector(
      getCodeBoxState,
      state => state.selectedBuyerId
    );

    const getSelectCodeboxId = createSelector(
      getCodeBoxEntities,
      selectedBuyerId,
      (codeBoxEntities, id) => codeBoxEntities[selectedBuyerId]
    );

Introducing createSelector
--------------------------

You will have noticed that in the above code we have also introduced the
idea of a createSelector.

What a createSelector does, is take the value from a
createFeatureSelector base, and build on it. What we have done in our
app, for instance, is create a createFeatureSelector for codeBox, a
createSelector for codeBoxEntities, and then proceeded to pull from the
data nested data within those entities, by using the getSelectCodeboxId
selector.

In this fashion we are able to streamline the process of getting the
data we need, pass it to our facade. Pass it to the component.ts file we
are using, and then use it directly within the component.html.

Final Notes
-----------

There is more to be discussed on this topic, however, this covers about
80% of situations wherein selectors are used. By following this formula
it allows for selecting data to be cookie cutter. It is highly
recoemmended that ngrx/entity be used in addition, to make this cookie
cutter process easier.

### UI Architecture Notes

With regards to making data re-usable. As an app get's larger, the same
sort of data formulation repeats it's self. In cases that involve
pagination, sorting, and filtering, these are data sets that are going
to repeat themselves time, and time again. Please refer to the chapter
on re-using reducer logic, for a practical solution to this problem.

[^1]: Don't Repeat Yourself
