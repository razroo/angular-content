---
title: Re-using Reducer Logic
---

In any state management setting, we often encounter business logic that
is repeated throughout a feature state.

Let's say that we have a fileUpload service that is going to be used in
our app. The purpose of this service, is to upload a file, and return a
FileMetadataId to be used in another api.

The logic for this state management work flow will be the same for
actions, facade, reducer, and effects. The question is how can we make
our state re-usable so that it we can use it in multiple reducers
without having to re-write logic?

 Strategy 
---------

The strategy for how we would create a re-usable state is as follows:

We would have a facade/action that would pass in an actionTypeName along
with the regular payload.

The effect would be passed this unique actionTypeNamem which would then
call the appropriate facade/action for when data is uploaded, using
re-usable service.

We would then pass in uploaded data from the action.payload into the
reducer. To make sure that reducer logic can be re-used, we pass a
special param for the reducer function called actionTypeName.

We then compare the actionNameIdentifier passed in from the
action.paylod to the actionTypeName passed in from the reducer. If they
are equal to each other, then we allow for the reducer logic to happen.
Let's take a closer look at this approach.

Creating a re-usable Facade and Action
--------------------------------------

Our UploadFile action will pass the following:

-   actionNameIdentifier - For allowing us to re-use reducer

-   entityId - Primarily for allowing us to use the ngrx/entity api

-   file - Using the name html input api, File is what will be passed in
    from the input.

<!-- -->

    export class UploadFile implements Action {
      readonly type = UploadActionTypes.UploadAttachment;
      constructor(public payload: { actionNameIdentifier: string, entityId: string;
         file: File; name: string}) {}
    }

In our Facade, would have the following:

    uploadFile(actionType: string, file: File, entityId: string): void {
        this.store.dispatch(
          new UploadFile({ actionNameIdentifier, entityId, file })
        );
      }

Most notable, we pass in a parameter called actionNameIdentifier. This
will be compared against created by the reducer to make sure we are
targeting the featureState that we would like to work with.

Higher Order Reducers
---------------------

A higher order reducer borrows it's name from a higher order function.

A higher order reducer is very similar. It allows us to create a
reducer, that can be passed into another reducer, to create single
combined reducer.

    export function attachmentReducer(
      state: UploadState = initialState,
      action: UploadAction,
      actionTypeName: string,
    ): UploadState {
      const { actionNameIdentifier } = action;
      if (actionNameIdentifier !== actionTypeName) return state

      switch (action.type) {
        case DraftActionTypes.UploadAttachments: {
          return attachmentsAdapter.addAll(action.payload, {
            ...state,
            loaded: true,
          });
        }
      }

      return state;
    }

You will notice that in the above code, we have created a param for
actionTypeName in our reducer.

In our action, we are passing in a similar unique identifier called
actionNameIdentifier. In our reducer we compare the actionTypeName
created in the reducer, against the actionTypeName in the action, in
order to re-use reducer logic, for any feature state we would like to
use it.

Combining Higher Order Reducer with Feature State Reducer 
----------------------------------------------------------

Higher order reducers are fantastic. However, many times, the higher
order reducer only solves one specific problem of state with regards to
a particular component.

So, without us being able to combine multiple higher order reducers
within the app, a higher order reducer would be worthless. That being
said, we would be able combine reducers by doing the following:

    import { reducers } from './reducers';
    @NgModule({
      imports: [
        ...
        StoreModule.forFeature('userModule', {
          userReducer,
          attachments: attachmentReducer('userReducer'),

        })
      ],
      ...
    })
    export default class UserModule { }

Now, any action that is made that matches the name for feature state we
are working on, will update the state for the respective reducer.

Re-Using Effects
----------------

Effects are really a bridge from an action, to service, back to an
action again. We are therefore able to re-use effect by simply passing
in the actionNameIdentifier and making sure that it makes it's way back
to reducer once again.

    @Effect()
      uploadAttachment$ = this.dataPersistence.fetch(
        DraftActionTypes.UploadAttachment,
        {
          run: (action: UploadAttachment, state: UploadState) => {
            const { actionNameIdentifier } = action;
            return this.filesService
              .uploadFile(action.payload, FileLocation.ATTACHMENTS)
              .pipe(
                map((file: FileMetadata) => {
                  return new AttachmentUploaded({
                    id: action.payload.id,
                    file,
                    actionNameIdentifier,
                  });
                })
              );
          },

          onError: (action: UploadDraftAttachment, error) => {
            console.error('Error', error);
          },
        }
      );

 Ending Notes 
-------------

There is some discussion along the lines of whether, or not this pattern
makes sense.

Some scenarios where one might be tempted to use a pattern like this,
might not be ideal. Therefore, it is worth noting to re-assess the
reason for which you would like to re-use state. Perfectly valid reasons
for which to use a re-usable reducer includes pagination, sorting, and
potentially filtering.
