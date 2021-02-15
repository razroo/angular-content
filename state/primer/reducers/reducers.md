---
title: Primer - Reducers
---

Reducers are pure functions that take in data and return a new data
object. Immutability is ideal when using reducers, so that data is not
affected by mistake, when being passed down the pipeline. Reducers tend
to be universal across all frameworks and usually consist of:

1.  One exported function

2.  A switch:case statement based on action.type

 Example of Reducer 
-------------------

    export function reducer(state = initialState, action: book.Actions
    | collection.Actions): State {
      switch (action.type) {
        case: CodeBoxActionTypes.CodeBoxLoaded {
          return {
            ids: [ ...codeBoxIds ],
            entities: Object.assign({}, codeBoxEntities),
            selectedCodeBoxId: state.selectedCodeBoxId
          }
        }
        default: {
          return state;
        }
      }
    }

This reducer will be called whenever any action is called. However, only
if the action matches the case statement, will the reducer actually run.
