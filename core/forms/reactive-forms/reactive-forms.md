---
title: Reactive Forms
---

Reactive forms are underrated.

As previously just discussed, there are many reasons as to why forms are
very complicated. Reactive forms are no exception to that rule.

 Registering Reactive Forms 
---------------------------

Importing a reactive module, is no different than your regular module,
however,this is the module to use to when importing reactive forms.


```ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    ReactiveFormsModule
  ],
})
export class AppModule { }
```

Generating a component, and adding FormControl
----------------------------------------------

No different than any other scenario:
```ts
ng generate component grid-form
```

In your component simply add a new `FormControl`:

```ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'px-grid-form',
  templateUrl: './grid-form.component.html',
  styleUrls: ['./grid-form.component.css']
})
export class NameEditorComponent {
  size = new FormControl('');
}
```
    
Registering Control in Template
-------------------------------
```html
<label>
  Name:
  <input type="text" [formControl]="name">
</label>
```
    

As mentioned in the previous chapter, FormControl, will allow you to
access value of form within component, and view. Most importantly,
update in view or component, and have it affect the other.

 Displaying Component 
---------------------

We can now include the component in any other component. E.g.

```html
<px-grid-form></px-grid-form>  
```

 Grouping Form Controls 
-----------------------

A FormControl on it's own has value. Primarily being able set a value,
andaccesing it within the template. However, a `formControl` is
incomplete without a `formGroup`. A `formGroup`, will give us access to
all of the formControl values, so we can use them all, when submitting a
form.

```ts
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
 
@Component({
  selector: 'px-grid-form',
  templateUrl: './grid-form.component.html',
  styleUrls: ['./grid-form.component.css']
})
export class GridFormComponent {
  gridForm = new FormGroup({
    row: new FormControl(''),
    column: new FormControl(''),
  });
}
```

 Connecting FromGroup model and view 
------------------------------------

```html
<form [formGroup]="gridForm">
  <label>
    First Name:
    <input type="text" formControlName="row">
  </label>

  <label>
    Last Name:
    <input type="text" formControlName="column">
  </label>
</form>
```

Within our template, we attach the`formGroup` directive supplied bythe
`ReactiveFormsModule`, to our component's `new FormGroup`.

Saving Form Data
----------------

The formGroup directive internally has an `(ngSubmit)` method, that can
be used to call whenever you are ready to save data for the entire form,
and pass it along to the backend.

```html
  <form [formGroup]="gridForm" (ngSubmit)="onSubmit()">
```

```ts
onSubmit() {
  // this is where data for gridForm is exposed
  console.log(this.gridForm.Value);
}
```

 Nested Form Groups 
-------------------

In Angular, there is the ability to create nested form groups:

```ts
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'px-code-form',
  templateUrl: './code-form.component.html',
  styleUrls: ['./code-form.component.css']
})
export class CodeFormComponent {
  profileForm = new FormGroup({
    row: new FormControl(''),
    column: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });
}
```

A great way to think of nested form groups, is that it is exactly like
creating a nested data object. The only different is that any parent,
contains formGroup, whereas children use formControl.

 Grouping nested form in the template 
-------------------------------------

Now that we have created a nested FormGroup property within a class,
lets' goahead and show how we would access these values within our
template.

```html
<div formGroupName="address">
  <h3>Address</h3>

  <label>
    Street:
    <input type="text" formControlName="street">
  </label>

  <label>
    City:
    <input type="text" formControlName="city">
  </label>
  
  <label>
    State:
    <input type="text" formControlName="state">
  </label>

  <label>
    Zip Code:
    <input type="text" formControlName="zip">
  </label>
</div>
```

We are using the `formGroupName`directive. The `formGroupName`
directive, will sync a `formGroup` to a template. That allows us to
access any children ofthat `formGroup` by simply accessing name, using
`formControlName`.

 Partial Model Updates 
----------------------

We have already discussed in the previous chapter, the ability to update
a specific `formControl` by using the`setValue()` option is definitely a
viable option. However, what if we would like to update multiple values
at the same time within a `formGroup()` Angular provides the method
called `patchValue()`. So for instance, let's say we wantedto update the
`firstName`, and street address:

```ts
updateProfile() {
  this.profileForm.patchValue({
    firstName: 'Nancy',
    address: {
      street: '123 Drew Street'
    }
  });
}
```

 Generating form controls with FormBuilder 
------------------------------------------

The Angular team realized how excessive it is to constantly include
`FormControl`'sand `FormGroup`'s everytime one wants to build out a
form. Insteadthey created something called the `FormBuilder`.

```ts
import { Component } from '@angular/core';
  import { FormBuilder } from '@angular/forms';
  
  @Component({
    selector: 'app-profile-editor',
    templateUrl: './profile-editor.component.html',
    styleUrls: ['./profile-editor.component.css']
  })
  export class ProfileEditorComponent {
    profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
    });
  
    constructor(private fb: FormBuilder) { }
  }
```  

As we can see in the above, instead of having to attach `FormGroup` to
theparents, and attaching `FormControl` to every child, we can just use
`fb.group` on every parent.
