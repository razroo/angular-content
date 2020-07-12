 Template Syntax 
================

 Difference between Property and Attribute in HTML 
--------------------------------------------------

It is important to understand the difference between HTML attributes and
properties. Lets dive into what the computer science definition of a
property, and an attribute would be.

Property is something that can be read and written. Within a Typescript
setting, this would be something that would be translated into a `get`
and `set` within Typescript.

An attribute should be considered as a metadata. Something that is a
property of a property, describing what the parent property is doing.

In HTML the above definitions are a bit obscured. Lets say that we are
defining the type of input field as well as it's value.

    <input type="text" value="Name:">  

The `type` and `value` are attributes, as they are explaining what the
`input` property is doing (aka metadata). However, once the browser
parses the code, it will turn it into an `HTMLInputElement` object. This
contains dozens of properties, like `className`, `clientHeight`, and
methods, such as `click()`. The browser will create a new sort of
property based on the type of native html element it is creating.

 Property Binding (In Angular) 
------------------------------

In Angular, property binding is a way to set properties of a particular
element. In addition, it is a way to set `@Input()` decorators set on
the actual directive.

    <img [src]="itemImageUrl">

You might be wondering why this is called property binding instead of
attribute binding. `src` is actually an attribute. The reason behind
this is that Angular's engine will actually first initialize the
component and then change the property set by the browser. Angular will
compile the component as an object and therefore internally is setting
objects, i.e. properties. Another great proof of this, is that if we
were to modify the column span for a table by 2 it would be:

    <tr><td [colSpan]="2">Span 2 columns</td></tr>

You will notice that the above syntax for `colSpan` is camel cased, in
contrast to the lowercase `colspan`. This is because we are using
Angular's internal property binding engine to set the value. It is
instead of using the native lowercase attribute `colspan`.

###  Remembering Brackets 

If you omit the brackets `[]`, then Angular will treat the value
provided as a constant. Which means you should be using brackets. There
are three situations wherein omitting brackets make sense.

1.  Target property actually uses a string. For instance, the text for
    the header title.

2.  Value of initialization never changes.

 Attribute Binding 
------------------

As we discussed earlier, there is a very distinct difference between
attributes and properties. Setting a property is always preferable
simply because the syntax is more straight forward. However, there are
many JavaScript properties that simply aren't available as properties. A
great example of this is SVG's and ARIA labels. In a scenario like this,
we can bind to an attribute by doing something like the following:

    <!-- create and set an aria attribute for assistive technology -->
    <button [attr.aria-label]="actionName">{{actionName}} with Aria</button>  

So we can bind to attributes similarly to how we bind to properties.
Depending on the nature of your application, it may not, or not happen
on a frequent basis.

 Event Binding 
--------------

Event binding, is an event listening mechanism built into Angular.
Whenever something such a keyboard button pressed(keystrokes), mouse
moves, clicks etc. it will be able to trigger the appropriate function
at that time. The syntax for doing something like this is as follows:

    <button (click)="onSave($event)">Save</button> 

In the above code, we are telling Angular, when a user clicks on the
button emit the method contained within our respective component called
`onSave`.

\$event
-------

In addition, we are supplying it with `$event` which is Angular's way of
internally passing data for that particular component. Depending on the
target event, it will change what is returned by `$event`. For instance,
if it is a native DOM element event, then `$event` will be a DOM event
object. If it is not a native DOM element, and instead something such as
an event emitter, then event will contain the value passed on through
the event emitter.

NgClass
-------

`NgClass` is a special way to add, or remove multiple CSS classes at the
same time. More importantly, it gives you the ability to add a class
conditionally based on whether, or not a value is true.

    <!-- toggle the "special" class on/off with a property -->
    <button (click)="!isOpen">Toggle</button>
    <div [ngClass]="isOpen ? 'open' : ''">This div is special</div>

In the above code, we are toggling the class active based on the status
of the toggle. So when the toggle button is clicked on, `isOpen` will
now be true, and as a result, \"open\" class will now be active.
`isActive`.

i.e. `''`.

 NgStyle 
--------

This one is debatable if I want to include in the book. Let's discuss at
a later period of time.

 NgModel 
--------

Let's look into and see if this is something that we want, and decide if
we want to get back to this.

 NgSwitch 
---------

`NgSwitch` is Angular's template version of a JavaScript `switch`
statement. Like switch statements in JavaScript, there are very few use
cases wherein it makes sense. In addition, in data heavy applications,
in general, using something like GraphQL, you will be able to choose
what data should come back based on a certain response. However, there
are scenarios, where keeping lstinlineNgSwitch in your arsenal will be
useful. `NgSwitch` consists of three directives:

1.  `NgSwitch` - The switch in which to compare case statements against.

2.  `NgSwitchCase` - The case statement, in which to display value, if
    match is truthy.

3.  `NgSwitchDefault` - The default value, if none of the other case
    values are matched.

<!-- -->

    <div [ngSwitch]="code.type">
      <px-css-item    *ngSwitchCase="'css'"    [item]="currentItem"></px-stout-item>
      <px-scss-item   *ngSwitchCase="'scss'"     [item]="currentItem"></px-device-item>
      <px-javascript-item     *ngSwitchCase="'javascript'"  [item]="currentItem"></px-javascript-item>
      <!-- . . . -->
      <px-unknown-item  *ngSwitchDefault           [item]="currentItem"></px-unknown-item>
    </div>

 Template Reference Variables 
-----------------------------

Template reference variables are incredibly useful within an
application, and are commonly used within Angular. The reason for this,
is that it is referencing the:

1.  DOM element within the template

2.  Directive/Component

3.  `TemplateRef`

4.  Web Component

In order to reference a partcular template, use the hash symbol, and a
name of your choosing.

    <input #row placeholder="code" />  

    <button (click)="initiateGrid(row.value)">Initiate Grid</button>

In the above, using our `ref` value, we are able to retrieve the text
entered into our input DOM element(i.e. row.value). Based on the
scenario, ref values have their use cases.

 Safe Navigation Operator 
-------------------------

Many times when retrieving data, it might come back as null, or
undefined. In scenario like this, doing the following:

    <p>Hello {{user.name}}! How can we help you today?</p>  

In the above, if user returns as null, or undefined, the browser will
return an error:

    TypeError: Cannot read property 'name' of null.  

However, if we use the safe navigation operator:

      <p>Hello {{user?.name}}! How can we help you today?</p>  

Angular will stop evaluating as soon as it hits the first `null` value.
It will therefore render without any errors.

This also works with longer property paths. For example:

    <p>Hello {{user?.admin?.name}}! How can we help you today?</p>    

In any data heavy enterprise app, you can expect to use the safe
navigation operator quite often. If you want, you can call it the elvis
operator.
