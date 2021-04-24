---
title: Content Projection
---
 Content Projection 
===================

Any component can technically be re-usable. What makes content
projection so great is that it allows the content inside of a component
to change based on the need of the application. It also allows us to
separate concerns. We can build a component for display and another
component built for handling user actions.

 Single Slot Projection 
-----------------------

If we wanted to create a component that allows us to use content
projection, it is as simple as adding ng-content inside of our
component:

```html
<!-- inside reusable component -->
<ng-content></ng-content>

<!-- inside component, consuming the re-usable component -->
<reusable-component> <p>Content goes here</p> </reusable-component>
```    

Using our \<reusable-component\> we have the ability to put it wherever
we want and change the content based on the parent component consuming
it. What if we have two separate places withing our component that we
would like to inject content? What if we have a card component, and we
want there to be different content inside of the header and main body of
the component?

 Multiple Slot Projection 
-------------------------

This is my preferred method of multiple content projection, by creating
binding content projection to class. I feel it's a great of making sure
content projection is transparent across the entire lifecycle. We can
now do the following:

```html
<div class="header">
<ng-content select=".header"></ng-content>
</header>
<div class="body">
<ng-content select=".body"></ng-content>
</div>
```    

In our parent component consuming the re-usable component:

```html
<reusable-component>
<div class="header">CSS</div>
<div class="body">{{css-data}}</div>
</reusable-component>
```    

Just like that, we can have our content project in multiple places, into
the re-usable component.

Styling Projected Content
-------------------------

One of the scenarios that comes up a lot with regards to projected
content is attempting to style it. You might want the content in one
component to have a top border and in others for the text color to be of
a different style. So how would we do this, being that we are projecting
the content into a separate component?

```css
:host ::ng-deep .header {
  color: blue;
}

:host ::ng-deep .body {
  margin-top: pxl-space-multiplier(1);
}
```
    
Just like that, we are able to style the content within our project.

 Interacting with Projected Content 
-----------------------------------

One more scenario to take into consideration when working with projected
content is to interact with it. Let's say that we want to project an
input field into our projected content. In addition, we would like to
determine when that input field has been clicked on? The following is
the best strategy.We will create a directive, that focuses on event
handling. [^1]

###  An Example 

This is a simple directive, that targets the focus and blur of host
element using the \@HostListener element.

```ts
@Directive({
  selector: '[inputRef]'
})
export class InputRefDirective {
  focus = false;

  @HostListener("focus")
  onFocus() {
    this.focus = true;
  }

  @HostListener("blur")
  onBlur() {
    this.focus = false;
  }
}
```

Not we can pass this inputRef directive onto our projected content:

```html
<h1>FA Input</h1>
<fa-input icon="envelope">
  <input inputRef type="email" placeholder="Email">
</fa-input>
```

Now within our re-usable component, we can use the
`@ContentChild`decorator to inject the `inputRefDirective` within our
component. Then,we can use the `@HostBinding` decorator to change the
class on our re-usable component, based on the status of the input ref.

```ts
@Component({
  selector: 'fa-input',
  template: `
    <i class="fa" [ngClass]="classes"></i>
    <ng-content></ng-content>
  `,
  styleUrls: ['./fa-input.component.css']
})
export class FaInputComponent {

  @Input() icon: string;

  @ContentChild(InputRefDirective)
  input: InputRefDirective;

  @HostBinding("class.focus")
  get focus() {
    return this.input ? this.input.focus : false;
  }

  get  classes() {
    const cssClasses = {
      fa: true
    };
    cssClasses['fa-' + this.icon] = true;
    return cssClasses;
  }
}
```

 Wrapping Up 
------------

As we have seen, content projection is a very powerful way of re-using
content within our component. We have also covered the two
stereo-typical uses cases,which we will have to solve in an enterprise
app from time to time. I.e. eventhandling for our project content, as
well as controlling the styling for our projected content.

[^1]: Refer back to the chapter on directives. Generally speaking
    directiveshelp solve two things:

    1.  Event handling

    2.  Passing in Values

    These two tend to work in tandem with each other. Similarly here, we
    will beusing directives to pass in a value, and have it work in
    tandem with eventhandling.
