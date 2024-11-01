---
title: Aggregation Pattern
---

Many times within any web setting, numerous apis will be feeding into a
single request. An example would be in an e-commerce setting wherein
data for a particular item, might come from numerous locations. The data
might come from one api, the analytics api might update, and then a
third api along the lines of data persistence will be called at that
time as well.

In a backend setting, usually we try and keep a single api request for
the business logic of a particular use case. However, there are many
times where this will be beyond the power of the developer. In can be in
antiquated apis,or in unique use cases.

 The Unique Challenge with Ngrx/effects
--------------------------------------

In an ngrx/effects use case, when a user is hitting a single service and
returning a single action, it is relatively straight forward.

This will look something like the following:

```typescript
    @Effect()
    getProductInformation$ = this.dataPersistence.fetch(
      ProductTypes.getProductInformation, {
      run: (action: GetProductInformation, state: ProductModelState) => {
        const { userId, productId } = action.payload;

        return this.service
          .getProductInformation(userId, productId)
          .pipe(
            map((product: Product) => new ProductLoaded(product))
          );
      },

      onError: (action: GetProductInformation, error) => {
        console.error('Error', error);
      },
    });
```   

In this example we fire off a service, and return the data from that one
service. We might even have the option to turn the map into a switchMap.
This can be used for numerous actions, originating from a singular
service. However,it immediately becomes a problem once we start to have
a single effect calling numerous services where one action is expected
to have all of its data.

Using the Aggregator Pattern
----------------------------

### Defining Types for Actions

```typescript
export type AggregatableAction = Action & { correlationParams?: CorrelationParams };

export type FailActionForAggregation = Action & { error?: Error, correlationParams?: CorrelationParams };
```

First we define the types for our different actions. Both will be a
standard action with the addition of correlationParams, which we will
use to make sure that we are calling the correct action.

### Passing in Params for Functions

```typescript
export function aggregate<T extends AggregatableAction,
    TAction1 extends AggregatableAction,
    TAction2 extends AggregatableAction,
    TFailAction extends FailActionForAggregation>
(
    action1$: Observable<TAction1>,
    action2$: Observable<TAction2>,
    failAction$: Observable<TFailAction>
): OperatorFunction<T, [TAction1, TAction2]> {
```

Now we go ahead and specify the params that we need to use for the
aggregator pattern. We are going to assume that there will never be a
situation where we will use more than two actions.

###  Creating a Filter Action 

```typescript
const filterAction = (sourceAction: AggregatableAction, t: AggregatableAction) =>
    t.correlationParams && sourceAction.correlationParams &&
    t.correlationParams.correlationId === sourceAction.correlationParams.correlationId &&
    t.correlationParams.parentActionType === sourceAction.type;
```

First:

1.  We confirm that the function passed in correlation params, and that
    oursource action has correlation params.

2.  We check to make sure that the correlationId of the correlation
    paramsmatches that of the correlationId of the correlationParams of
    the soruceAction

3.  The correlationParams action type, is equal to that of the
    sourceAction's type.

###  Creating Aggregated Actions 

```typescript
const getAggregatedActions = (sourceAction: AggregatableAction): Observable<[TAction1, TAction2]> => {
    let a1$ = action1$
        .pipe(
            filter(a => {
                return filterAction(sourceAction, a);
            }),
            first()
        );
    let a2$ = action2$
        .pipe(
            filter(a => {
                return filterAction(sourceAction, a);
            }),
            first()
        );

    let f$ = failAction$
        .pipe(
            filter(a => {
                return filterAction(sourceAction, a);
            }),
            first(),
            switchMap(b => {
                return Observable.throw(b.error);
            })
        );

    return race(forkJoin([a1$, a2$]), f$);
};
```

Here we use a forkJoin, to make sure we have the latest from all values.
Inaddition, we create a race condition, so that if the error emits, it
will return the error instead.

```typescript
    return (source: Observable<AggregatableAction>) => source.pipe(
        switchMap(sourceAction => getAggregatedActions(sourceAction))
    );
}
```

Then we simply return the result of the aggregated code.
