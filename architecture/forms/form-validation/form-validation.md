 Form Validation 
================

One of main reasons why one would choose to use the internal Angular
Form Group architecture is the way it eases validation. Angular has a
series of built in validators that can be used for the fields in your
form. Here are some current Angular validators available:

1.  min

2.  max

3.  required

4.  requiredTrue

5.  email

6.  minlength

7.  maxlength

8.  pattern

9.  nullValidator

10. compose

11. composeAsync

The validators are self-explanatory, with the exception of `compose`.
`compose` will allow you to combine multiple validators and return an
error map for them.

There is the ability to make custom validators, and most likely any app
you work on, us going to need it's own custom validators, but before we
go ahead and do that, let's see how we can integrate this with out
application.

Integrating Form Validators within Component
--------------------------------------------

Let's imagine that we have a newsletter component within our
application. We want to ensure the user uses an email pattern, and it is
also required. We write the following:

    ngOnInit() {
      this.newsletterForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]
        ],
      });

      get email() {
        return this.newsletterForm.get('email');
      }
    }

Using the above we have added two native angular validators to our
formControl field email.

This is the process where we would add Angular form validators to our
application. It should be noted that in Angular, when we want to use
multiple validators, we place them in a sub-array, within the array for
the `fb.group`.

Integrating Form Validators within HTML Template
------------------------------------------------

If we would like to integrate our form validators within our app, so
that when we click on the button, they get triggered, we would do the
following:

``` {caption="Integrate Form Validation with HTML"}
<ng-container *ngIf="email.invalid && (email.dirty || email.touched)">
  <mat-error *ngIf="email.errors.required">Name is required.</mat-error>
  <mat-error *ngIf="email.errors.email">Email is invalid</mat-error>
</ng-container>
```

In the above, we are creating a way of displaying the error if it
appears. It should only appear if a user has actually touched the email
field.

Custom Validators
-----------------

As mentioned before, odds are your application, will also need it's own
set of custom validators. Custom validators require their own function
that returns true, based on value pass through. That function is then be
hooked into the validators array. However, Razroo believes it is more
scalable if we create a directive that can be used to automatically
create validation for our form. In addition, if we create a separate
function for the directive, it allows us to re-use the functionality for
the directive without directly using the directive.

### Creating Custom Directive Validator

Let's create a custom directive validator for numbers. We are using the
NX workspace. In addition, we are using the Razroo reccommended folder
structure. A custom directive validator, will go in the common folder
for directives.

#### Generate The Directive

    ng g lib directive --directory=common  

Inside of newly created `CommonDirectivesModule`, we will create a
folder

    cd libs/common/directives/src/lib/;
    mdkir number; 

So now let's navigate to our number folder:

    cd number;  

and run the appropriate Angular CLI command for generating a directive,
and exporting it within our `CommonDirectivesModule`

    ng g directive number --export  

This will generate the following output inside of the terminal:

    CREATE libs/common/directives/src/lib/number/number.directive.spec.ts (224 bytes)
    CREATE libs/common/directives/src/lib/number/number.directive.ts (144 bytes)
    UPDATE libs/common/directives/src/lib/common-directives.module.ts (493 bytes)

#### Create The Function for Directive

Inside of the folder for our number directive, let's also create a
number validator file.

    touch validator.ts;
    touch validator.spec.ts

Inside of our `validate.ts` file, we will go ahead and create logic for
numbers.

``` {caption="number-validator.ts"}
import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export const number: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (isPresent(Validators.required(control))) return null;

  let v: string = control.value;
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v) ? null : {'number': true};
}; 
```

#### Hook In Validator Function to Directive

We will now go ahead and integrate the number function into our
directive.

``` {caption="number.directive.ts"}
import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { number } from './validator';

const NUMBER_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NumberDirective),
  multi: true
};

@Directive({
  selector: '[razrooNumber]',
  providers: [NUMBER_VALIDATOR]
})
export class NumberDirective implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    return number(c);
  }
}  
```

We now have the ability to use this as a directive within our
application. It should be noted that we are doing two unique things
within our directive.

1.  `Validator` - Our class is implementing `Validator` which is the
    same internal function used for validating a formControl.

2.  We are providing a value called `NUMBER_VALIDATOR`.
    `NUMBER_VALIDATOR` will cause the `NG_VALIDATOR` `injectionToken`,
    which is the Angular provided token for custom providers, to use the
    value of `NumberDirective`. The internal Angular `forwardRef` value
    is there to make sure that it doesn't error out if no value exists.
    (More on `forwardRef` in another chapter.)

#### Hook In Directive to Component Template

Now all we need to do, is hook the directive into the template for our
component.

``` {caption="newsletter.component.html"}
<mat-form-field [formGroup]="newsletterForm" class="email-field" >
  <input matInput razrooNumber formControlName="email" placeholder="Your E-mail" required>
</mat-form-field>

<ng-container *ngIf="email.invalid && (email.dirty || email.touched)">
  <mat-error *ngIf="email.errors.number">Not a number</mat-error>
</ng-container>
```

As you can see, all we had to add to our input is the directive for
`razrooNumber`. We can then the appropriate `mat-error` within our
application in order to hook into the respective error created for
number.

The reason is that within our number validator we are returning a
boolean.

### A Word on This Approach

If you were to take a look at the documentation, it offers two
approaches.

1.  Template Driven Custom Validators

2.  Reactive Custom Validators

This is my recommended approach for using directives, which is a bit
contrary to our general suggestion of using Reactive Forms. Reactive
forms are extremely valuable because they group the form as one. This
makes it easily accessible from the Typescript side of things.

Re-using custom validators, re-using functions as a utility function can
make the app more brittle than directives. This is because directives
are more explicit.

By doing this, we are separating the logic of validation from the actual
directive. Moving forward if your team, or other teams within your
organization would like to use different approaches, they do have the
flexibility to do so.

Cross Field Validation
----------------------

When I first came across the term \"cross field validation\", I was a
bit confused. I thought of it as a way for different field's validation
to be dependent on each other. After reading more, I found that \"cross
field\" validation is exactly that. We are validating our field based on
two field's correlation to each other.

For example, let's say we are working on a finance application. We only
want the \"Business Loan Amount\" input field to show, if yearly gross
income minus expenses, exceeds \$100,000. We would be able to set up the
internal Angular form validators, so that the loan-amount is invalid, if
this cross field reference(grosss) is not valid.

The one point to keep in mind, is that cross field validation is
distinct from single form validation in two regards:

1.  The validator will be used on two, or more form validators. This
    means, that we need access to the parent level formControl.

2.  The validator will need to be aware of the specific field that it is
    operating on. Therefore usability will be limited to the app, and
    most likely will not make sense to be re-usable.

### Sample Validator Logic

For the sake of brevity, we will not go through the steps we did
earlier, re: proper folder structure, directive generation, and
respective function. Just one note that I would like to make. We
mentioned earlier, that due to cross field validators usually being
unique to specific business logic, we prefer the use reactive form
validator functions. Therefore, as opposed to prior single field
validators going in the `common/directives` folder, multiple form
validators will go in the app specific folder (e.g.
`razroo/common/directives`).

However, we will go into the validator logic required for multiple
`formControl` values.

#### Creating the Service

``` {caption="loan-amount-validator.ts"}
import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoanAmountValidatorService {

  constructor() { }

  identityRevealedValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    const income = formGroup.get('income');
    const expenses = formGroup.get('expenses');

    return income && expenses && income.value - expenses.value > 100000 ? { 'loanAmount': true } : null;
  };
}  
```

As we can see in the above code, our logic is now tapping into the
entire `formGroup` control. We are:

1.  Targeting every field that we need.

2.  Creating logic, based on those two fields.

Cross form validation logic integration with our directive, is
straightforward and very similar to how single form validation works:

``` {caption="loan-amount.directive.ts"}
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { LoanAmountValidatorService } from './loan-amount-validator.service';

@Directive({
  selector: '[razrooLoanAmount]',
  providers: [{ provide: NG_VALIDATORS, useExisting: LoanAmountDirective, multi: true }]
})
export class LoanAmountDirective implements Validator {
  constructor(private loanAmountValidatorService: LoanAmountValidatorService) {}

  validate(control: AbstractControl): ValidationErrors {
    return this.loanAmountValidatorService.loanAmountValidator(control)
  }

} 
```

#### Creating the Directive

Here we are just pulling in the service, and tucking it into our
validate function. So, now using our prefferred approach of reactive
form validators, for cross field validation, integrating it, would be as
simple as this:

``` {caption="finance-calculator.component.ts"}
constructor(private fb: FormBuilder,
            private loanAmountValidatorService: LoanAmountValidatorService) { }

ngOnInit() {
  this.newsletterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  }, {validators: this.loanAmountValidatorService.loanAmountValidator});
}
```

#### Creating the error

Integrating the error within our app, is exactly as we would have done
for a singular field.

``` {caption="finance-calculator.component.html"}
<ng-container *ngIf="finance.invalid && (finance.dirty || finance.touched)">
  <mat-error *ngIf="finance.errors.loanAmount">Calculator</mat-error>
</ng-container>
```

Async Validation
----------------

An async validator, is a validator which returns an observable(promises
work too, but we do not reccomend using a promise within an Angular
setting). One other important note, is that the Observable must be
finite i.e. end. So adding something like `first` to the async directive
more than works.

A classic example with async validation is to see if a username is taken
already. In order to give the user instant feedback, we can make an http
request every time the user types in the input. A validator is a one to
one relationship, and is not meant to have a lifecycle beyond that of
the initial validation. Using state for something like this would be
overkill. However, we do use GraphQL within our application. So, we are
going to return an observable, and call first on it.

### Integrating Service with Component for Async Validation

The nature of async validators is they need to use the backend to
operate. Therefore using a directive is out of the question. It would be
too brittle, and a hack to make work. I am not going to discuss the code
behind service actually making request. Reason is, that use cases
wherein we would use asynchronous validation, is usually in an
enterprise setting, and it's one team building it for the entire
organization. I feel like the use case for something like this so rare,
albeit useful when the time arises. I want to discuss it more
conceptually, so you know when to use something like this.

So that being said, let's assume that we have a service that returns a
finite observable. It makes a request and determines whether, or not the
user email is already taken.

``` {caption="user-signup.component.ts"}
ngOnInit() {
  this.myForm = this.fb.group({
    name: ['', Validators.required],
    email: [
      '',
      [Validators.required, Validators.email],
      ValidateEmailNotTaken.createValidator(this.signupService)
    ]
  });
}
```

Within our template, we would do the following:

``` {caption="user-signup.component.html"}
<form [formGroup]="myForm">
<input type="text" formControlName="name">
<input type="email" formControlName="email">

<!-- Other related errors go here-->

<div *ngIf=" =myForm.get('email').errors && myForm.get('email').errors.emailUnavailable">
  This email is already taken. 
</div>
</form>  
```

 Performance Concerns 
---------------------

All validators are run after every form value change. As in, when an
input value is changed, the validator will be run after every
letter/number is added. Sychronous validators, which are not dependent
on the backend, generally do not suffer from performance issues in this
regard. However, when doing something like making an http request after
every time a letter is clicked, it can be expensive. There is a general
reccomended approach of making validators run on `blur`, or `submit`
instead. So, let's say in our app, we want the http request to only be
made if the user clicks off of the input, we would do something like the
following:

``` {caption="Updated user-signup.component.ts"}
ngOnInit() {
  this.myForm = this.fb.group({
    name: ['', Validators.required],
    email: [
      '',
      [Validators.required, Validators.email],
      ValidateEmailNotTaken.createValidator(this.signupService),
      {updateOn: 'blur'}
    ]
  });
}
```

A Final Note on Form Validators
-------------------------------

Form validation is an integral part of any application. The wonderful
way about how Angular does things really shine with the way they
approach form validation. Form validation is particularly difficult,
because due to it's repetitive nature, and existing outside of component
logic. By following the `common/directive` architecture for single field
validation, and the `<app>/common/service/validators` architecture for
cross field validation, your organization and app, will be in a very
good place to scale.
