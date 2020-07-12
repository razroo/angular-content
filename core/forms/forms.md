 Forms 
======

I think forms is still one of the most complicated pieces of UI you will
ever come across. Each input in a form has a unique piece of
functionality to it. It can be one of the most frustrating pieces of UI,
because there is no way to make it truly re-usable as a result.

It can be frustrating to explain to business as to why it is taking so
long, as a form seems truly simple to make. Over the course of this book
we will discuss why it is that, that is the case, as well. In addition,
we will discuss ways that we can alleviate the pain of forms. In the
meantime let's discuss the fundamentals of forms.

 Let's Get Something Out of the Way 
-----------------------------------

Angular offers two ways of handling forms:

1.  Reactive Forms

2.  Template-driven Forms

Whether or not someone should choose reactive forms, or template driven
forms is a large area of debate in an Angular setting. I strongly
believe that if you have chosen Angular as your framework, then you are
most likely a medium sized or large corporation. In which case, you need
your forms to be scalable, with the ability to test well.

In addition to being less prone to bugs. There is a fantastic article by
a one Netanel Basel, where he claims that we need to say goodbye to
Angular Template-Driven Forms[^1].

There is an equally amazing comment left by a one Ward Bell. It sums in
totally the following, which I must credit to Deborah Kurata:

### Template Driven

1.  Easy to use

2.  Similar to Angular 1

3.  Two-way data binding -\> Minimal component code

4.  Automatically tracks form and input element state

###  Reactive 

1.  More flexible more complex scenarios

2.  Immutable Data Model

3.  Easier to perform an action on a value change

4.  Reactive transformations DebounceTime or DistinctUntilChanged

5.  Easily add input elements dynamically

6.  Easier Unit Testing

The easier unit testing would be enough for me to go with Reactive
Forms. However, there is also the additional reason that Netanel Basel
mentions, that very much so resonates with me, and that is readability.
The ability to look at a data object with the ts file to see all of the
form related items within the app is highly informative.

Angular's documentation it's self sort of says something along the same
way. So if you are working on an enterprise app, it's best to stick with
reactive forms. If you do want to explore the subject of template driven
forms on your own, I invite you to go ahead and read through the Angular
documentation
[here](https://angular.io/guide/forms-overview#setup-in-template-driven-forms).
Now that we have established that we will be using Reactive forms, let's
get into what they are all about!

 Common Foundation of Forms 
---------------------------

1.  `FormControl` - Tracks the value and validation state of an
    individual form control.

2.  `FormGroup` - Tracks the same values and status for a collection of
    form controls.

        import { Component } from '@angular/core';
        import { FormGroup, FormControl } from '@angular/forms';
         
        @Component({
          ...
        })
        export class CodeEditorComponent {
          codeForm = new FormGroup({
            row: new FormControl(''),
            column: new FormControl(''),
          });
        }

    The codeForm property, now has access to all of the formControls
    within the app.

3.  `FormArray` - Tracks the same values and status for an array of form
    controls.

4.  ` ControlValueAccessor ` - Creates a bridge between Angular
    FormControl instances, and native DOM elements.

 Reactive Forms 
---------------

It's important to get a really get handle on what Reactive means.
Reactive means that your code is:

1.  Asynchronous - An action happens, and something happens right after.
    Even though this can happen in regular javascript code, ideally if
    something is asyncrhonous, it is baked into the framework, making it
    more of a default.

2.  Deterministic - Given action a happens, always action b, will
    happen. Reactive forms do this, wherein a user can be sure a certain
    thing will happen granted an input is affected.

###  Reactive Form Example 

Reactive forms are an embodiment of the above, and I would like to show
off an example:

    import { Component } from '@angular/core';
    import { FormControl } from '@angular/forms';
      
    @Component({
      selector: 'px-color-picker',
      template: `
        Background Color: <input type="text" [formControl]="backgroundColor">
      `
    })
    export class pxColorPickerComponent {
      backgroundColor = new FormControl('');
    }

In the above code, the data for the form is controlled by FormControl.
Here wehave attached it to a `backgroundColor` value accessor. Whenever
we want to retrieve the value of `backgroundColor`, or modify it, we can
tap into the value for `backgroundColor`.

 Reactive Forms - Data Flow 
---------------------------

### View To Model

In Reactive forms, the data flow is pretty straight forward. The view is
directly related to the component's instance of `FormControl` in the
component.

1.  User types into input

2.  Form input emits event with latest value of input

3.  Control value accessor [^2] listening for events on the form relays
    value to `FormControl` instance.

4.  `FormControl.valueChanges` observable emits new value

5.  Subscribers to the value changes observable receive new value.

###  Model To View 

1.  User calls setValue method on FormControl(e.g. `backgroundColor`)

2.  `FormControl.valueChanges` emits new value

3.  subscribers to FormControl.valueChanges recieve new value

4.  The control value accessor on the form input element, updates the
    element with the new value.

Form Validation
---------------

Form validation is something that seems like it would sit in the same
category as unit testing. It ensures that nothing wrong happens with
regards to user submission.

However, form validation - that is, making sure the right content is
being inputted before user submits - has a large reason beyond
correcting user error. It is to prevent abuse my malicious users. Ways
forms can be abused:

1.  Header injection attacks can be used to send email spam from your
    web server

2.  Cross-site scripting may allow an attacker to post any data to your
    site

3.  SQL injection may corrupt your database backend

 Reactive Form Validation 
-------------------------

Angular offers form validation out of the box. In addition, it gives
theability to create custom validators. There are two types of
validators:

1.  Sync Validators

2.  Async Validators

For performance reasons you will only want to use async validators.

### Built In Validators

    ngOnInit(): void {
      this.heroForm = new FormGroup({
        'name': new FormControl(this.hero.name, [
          Validators.required,
          Validators.minLength(4),
          forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
        ]),
        'alterEgo': new FormControl(this.hero.alterEgo),
        'power': new FormControl(this.hero.power, Validators.required)
      });

    }

    get name() { return this.heroForm.get('name'); }

    get power() { return this.heroForm.get('power'); }

Let's dissect the above code real quick:

1.  We use `Validators.required` and `Validators.minLength(4)` and one
    custom validator `forbiddenNameValidator`.

2.  All these validators are all sync validators, you pass them in as
    the second argument.

3.  You can use multiple validators, by passing in functions as a part
    of the array

4.  We use getters to access values. Even though we can access values by

We need to add the respective errors within the template, so that we can
view the errors if they so arise.

    <input id="name" class="form-control"
      formControlName="name" required >

    <div *ngIf="name.invalid && (name.dirty || name.touched)"
      class="alert alert-danger">

      <div *ngIf="name.errors.required">
        Name is required.
      </div>
      <div *ngIf="name.errors.minlength">
        Name must be at least 4 characters long.
      </div>
      <div *ngIf="name.errors.forbiddenName">
        Name cannot be Bob.
      </div>
    </div>

One note to just keep in mind, is that we are using the name getter in
the components class, to access errors.

### Custom Validators

The built in validators, as with anything that is built in, might not
always match the exact use case of your application. Within reactive
forms, custom validators are simply expressed as functions. For example:

    /** A hero's name can't match the given regular expression */
    export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} | null => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? {'forbiddenName': {value: control.value}} : null;
      };
    }

This is the function used in the above template. Custom validators are
straight forward and easy to use.

 Testing Reactive Forms 
-----------------------

Testing reactive forms is relatively straight forward:

###  Testing View To Model 

``` {caption="Testing View to Model"}
  it('should update the value of the input field', () => {
  const input = fixture.nativeElement.querySelector('input');
  const event = createNewEvent('input');

  input.value = 'Red';
  input.dispatchEvent(event);

  expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
});
```

In the above code we are doing the following:

1.  Query view for form input element, and create custom input event for
    the test.

2.  Set the value for the inout, and dispatch input event.

3.  Asser that component's new value, based on dispatched event, matches
    the value from the input.

###  Testing Model To View 

    it('should update the value in the control', () => {
      component.favoriteColorControl.setValue('Blue');

      const input = fixture.nativeElement.querySelector('input');

      expect(input.value).toBe('Blue');
    });

In the above code we are doing the following:

1.  Set value on the Form Control instance, to set the new value

2.  Assign the view for the form input element to a constant

3.  Tap into that constant's value, and assert that it is the new value

 Wrapping Up 
------------

This would be a general chapter on forms, that dabbled only on reactive
programming. In the next chapter, we are going to deep dive into the
fundamentals on Reactive Programming.

[^1]: [Why it's Time to Say Goodbye to Angular Template-Driven
    Forms](https://netbasal.com/why-its-time-to-say-goodbye-to-angular-template-driven-forms-350c11d004b)

[^2]: Control value accessor is an internal value within the FormControl
