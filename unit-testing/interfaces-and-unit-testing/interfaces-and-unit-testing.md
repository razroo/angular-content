---
title: Interfaces and Unit Testing
---

In unit testing it can be very difficult to keep in sync the mocked data
you are using with actual data used within app's actual live UI. The
easiest and most efficient way of doing this is creating interfaces.

The part where it becomes tricky is that generally data is used in
multiple places. We might have state that is contained in a separate
component, where the data originates from can be somewhere else. In
addition, the data might also be used in some other component as well as
in some other service.

 In Sync Data - Interface Architecture 
--------------------------------------

An interface at it's core is responsible for making sure that data
follows a pre-described schema. The part that is unintuitive in an
Angular setting is what happens when you have services, components,
state, and spec files all vying for the same data.

Do we use one interface for all of them, or different one's for each
file group? If we do end up using one interface, what sort of data
structure is it that we will use for all of these files.

###  Interface Architecture - The Dillema 

In an Angular application, there will be services, components, state and
spec files vying for the same data. The dilemma when it comes to
interfaces is that they need data in different ways.

Let us imagine that we have a data-table that we need to specify data:

-   Service - Used to determine status of checkbox logic. It only needs
    to know length of data, and actual data is irrelevant. Respective
    spec, only needs to be aware of similar data.

-   Component - Needs to know actual data, so that it can pass along
    observable stream component html. Respective spec needs to be aware
    of data.

-   State - Depnding on the reducer, or effect, it might need all of the
    data, or none of it. Respective spec will need to familiar of
    similar data.

 In Sync Data - The Solution 
----------------------------

It is actually counter-intuitive to create a singular interface for
one's service, state, component(s), and their respective specs. However,
if one does not use the same singular spec for all of them, one runs the
risk of them getting out of sync with each other. The data inside of the
object might make all the difference when it comes to causing unit tests
to fail.

The solution is as follows. There should be a singular interface that
exists for the root of the following files:

1.  Services\[Includes spec files\]

2.  State\[includes spec files\]

3.  GraphQL(Interfaces not used, but influenced by, and therefore
    important to be in the same directory)

4.  Component(Not in same folder as above)

This, however, requires that all the files be tightly coupled together.
In order to do this, we must create a well thought out folder/file
structure. This is what we will be calling Data Access architecture.

 Data Access - Folder Structure 
-------------------------------

Let's say we are creating an grid-form component, that will make use of
backend data. The data structure will look as follows:

\] \[queries \[.queries.ts,file\] \] \[mutations \[.mutations.ts,file\]
\] \] \[index.ts,file\] \] \] \[data-models \[src \[lib
\[.interfaces.ts,file\] \[.mocks.ts,file\] \] \[index.ts,file\] \] \]
\[data-services \[src \[lib \[.service.ts,file\]
\[.service.spec.ts,file\] \] \[index.ts,file\] \] \] \]

The expectation is that there will also be a sister folder/file
structure for these three in particular(data-graphql, data-models,
data-services). In th appropriate feature, it will have a state feature,
which will have the same name as the respective data-access
architecture.

\] \[+state \[user.action.ts,file\] \[user.adapter.ts,file\]
\[user.effects.spec.ts,file\] \[user.effects.ts,file\]
\[user.facade.spec.ts,file\] \[user.facade.ts,file\]
\[user.reducer.ts,file\] \[user.selectors.ts,file\] \]
\[px-user.module.spec.ts,file\] \[px-user.module.ts,file\] \]
\[karma.conf.js,file\] \[tsconfig.lib.json,file\]
\[tsconfig.spec.json,file\] \[tslint.json,file\] \] \[index.ts,file\]
\[test.ts,file\] \]

Using this folder/file structure we can enforce there being a single
interface used across all files within our app that are using data. The
idea is that the nomenclature will remain the same across

 Example of How Interface Might Be Used in Real Time 
----------------------------------------------------

Now that we have our folder/file structure in place, we can prove how
having a singular interface can be used to make sure all of our files
are in sync.

    export interface GridForm {
      column: string;
      row: string;
      pixelSize: string;
    }

 Example of How Data Mock Will Look Like 
----------------------------------------

In addition to our interface, we will have mocked data that will be used
in a number of different instances. It makes sense to have data in a
mock.ts file so that it can be re-used throughout app, without having to
re-create.

    cost GridForm = {
      column: '20';
      row: '20';
      pixelSize: '20';
    }

###  Service for Pulling in Pre-Populated Grid Form 

In our service, we will use the interface to determine what sort of data
we expect to be pulled in.

    getGridForm(projectId: string): Observable<GridForm> {
      const query = GridFormQuery;
      const variables = {
        projectId
      };

      const form$ = this.apollo.query<GridForm>({ query, variables });

      return from(buyers$).pipe(pluck('data'));
    }

###  Service Spec for Pulling in Pre-Populated Grid Form 

In the spec for our service, we will have one consistent piece of data
that will be used throughout the service spec:

    const gridForm: GridForm = {
      column: "20";
      row: "20";
      pixelSize: "20";
    };

Here we are using the interface to make sure that the mocked data used
with the service stays true to the data that is expected to be returned.
If the data ever changes in actual app, the interface will be there to
make sure our specs data mocks are up to data as well.

###  Reducer for populating state with appropriate Grid 

For simplicity sake within our app, we are going to take the data as is,
and pass it directly into our store to be used within app:

    export function gridFormReducer(
      state: GridForm,
      action: BuyerAction
    ): GridForm {
      switch (action.type) {
        case BuyerTypes.FormLoaded: {
          return {
            ...state
          };
        }
      }
    }

Here we have the interface telling our app that all data within our
reducer must consist of the three items we have specified in our
GridForm interface.

###  Reducer Spec for populating state with appropriate Grid 

      describe('gridFormLoaded action', () => {
        it('should populate the buyer entities and ids', () => {
          const action = new FormLoaded(gridForm);
          const state = gridFormReducer(initialState, action);

          expect(state).toEqual(gridForm);
        });
      });

Here we have a very simply unit test that once again has the same data
that is used across the app. By having an interface and using it for the
data within the interface we can make sure that the data for the reducer
spec is up to date with actual app.

###  Effect for populating state with appropriate Grid 

    @Effect()
    loadGridForm$ = this.dataPersistence.fetch(BuyerTypes.LoadGridForm, {
      run: (action: LoadGridForm, state: GridForm) => {
        const projectId = this.projectFacade.getProjectIdFromState(state);

        return this.service
          .getGridForm(action.payload, projectId)
          .pipe(map((gridForm: GridForm) => new GridFormLoaded(gridForm)));
      },

      onError: (action: LoadGridForm, error) => {
        console.error('Error', error);
      },
    });

In our effect, using the facade pattern. It is calling the effect,
pulling in data, and then having the appropriate action fired off, for
saying data is loaded. In our param for state, the most data heavy part
of our effect, we are once again using the same interface.

###  Effect Spec for populating state with appropriate Grid 

    const projectId = '123';

    describe('loadBuyers$', () => {
      beforeEach(() => {
        spyOn(service, 'getGridForm').and.returnValue(of(gridForm));
      });

      it('should work', () => {};
        const action = new LoadBuyers();
        const completion = new BuyersLoaded(gridForm);

        actions$ = hot('-a', { a: action });
        const expected$ = cold('-c', { c: completion });

        expect(effects.loadGridForm$).toBeObservable(expected$);
        expect(service.getGridForm).toHaveBeenCalledWith(projectId);
      });
    });

Here we are once again attaching an interface for gridForm, our data, so
that it is consistent across our application.
