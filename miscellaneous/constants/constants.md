 Constants 
==========

 What is a Constant? 
--------------------

In JavaScript the idea of having a constant would be assigning a
variable, to a particular value. Whenever we would like that value,
instead of typing out the value, we would use the variable. At first,
however, it might seem counter-intuitive. Why use the constant value, if
it is literally named the same thing as the actual value?

``` {caption="Example of a Constant"}
// Update last updated value to have latest payload data
const LAST_UPDATED = "LAST_UPDATED";
new updateValue(payload, LAST_UPDATED);
```

 Benefits of a Constant 
-----------------------

###  Creates a Table of Contents 

When one creates a series of constants in particular file for a certain
component, one can peruse through the constant file, being able to see
all actionable items in one. For instance, the following:

``` {caption="Example of a Constant"}
// imagine these constants, are in a folder called ValueActionTypes
const UPDATE_VALUE = "UPDATE_VALUE";
const ADD_VALUE = "ADD_VALUE";
const DELETE_VALUE = "DELETE_VALUE";

//imagine the following code is in a new folder called valueActions
import * as types from "../ValueActionTypes";
import {BuyerValue} from './buyer-filter.interfaces';

export class UpdateValue implements Action {
  readonly type = UPDATE_VALUE;

  constructor(public payload?: BuyerValue, public keyName?) {};
}

export class AddValue implements Action {
  readonly type = ADD_VALUE;

  constructor(public payload?: BuyerValue, public keyName?) {};
}

export class DeleteValue implements Action {
  readonly type = DELETE_VALUE;

  constructor(public payload?: BuyerValue, public keyName?) {};
}
```

###  Communicate to Maintainers 

If using a constant value, it signifies to future maintainers of your
code that this is a value which is immutable. Further distinguishing
intent of application/snippet of code.

###  Helps Secure Values 

When typing in a string for a particular constant value, particular
diligence must be applied in order to make sure it is type
appropriately. Typing in the one place, allows the developer to type in
one place, and simply copy and paste value, from a singular expected
location(the const file) to 5 different places.
