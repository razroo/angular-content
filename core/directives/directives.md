---
title: Attribute Directives
---

An attribute directive changes the appearance, or behavior of a DOM
Element. It is tagged on of an html element to change the way it works.
While it is probably better to use CSS in this situation, let's create a
really low level directive to introduce how it works:

    import { Directive, ElementRef } from '@angular/core';

    @Directive({
      selector: '[appHighlight]'
    })
    export class HighlightDirective {
      constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
      }
    }

Now we have the ability to apply this directive to out html element:

    <p appHighlight>Highlight me!</p>

As a result of the directive we have applied on this p element, the
background for this p element will now yellow.

It can be incredible useful.

A Great Example
---------------

A great example of this is adding drag and drop functionality to a
component. That in it's self is not component worthy. However, adding a
drop zone directive for instance, to the element, would make any
potential component drag and droppable worthy. A great example of a
component, would be a data table. A large part of it's functionality is
strictly tied to actual UI element.

 Passing Values into the Directive 
----------------------------------

A directive has the ability to pass a value in. For instance, going back
to our highlight example, let's create an \@Input() (Angulars way of
passing in values)for our highlight directive.

    import { Directive, ElementRef } from '@angular/core';

    @Directive({
      selector: '[appHighlight]'
    })
    export class HighlightDirective {
      @Input() highlightColor: string;

      constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = this.highlightColor';
      }
    }

Now if we were to go back to our template, we have the option to insert
the color we want within the template:

    <p appHighlight='orange'>Highlight me!</p>

The background of this component is going to be orange!

###  Passing in Multiple Values 

Passing in multiple values is as simple as adding a second \@Input value
to our Angular Directive:

    import { Directive, ElementRef } from '@angular/core';

    @Directive({
      selector: '[appHighlight]'
    })
    export class HighlightDirective {
      @Input() highlightColor: string;
      @Input() defaultColor: string;

      constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = this.highlightColor';
      }
    }

Just like that we can now pass multiple values to our html element:

    <p appHighlight="orange" defaultColor="blue" >Highlight me!</p>

Angular knows once the appHighlight directive has been exposed, that it
has the input of defaultColor, or any other Input you might add for that
matter.

 Modify Values Based on Events 
------------------------------

Directives also give the option to modify based on an event. For
instance, we could add logic based on mouseenter.

    import { Directive, ElementRef } from '@angular/core';

    @Directive({
      selector: '[appHighlight]'
    })
    export class HighlightDirective {
      @Input() highlightColor: string;

      constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = this.highlightColor';
      }

      @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.highlightColor);
      }

      @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
      }

      private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
      }
    }

Now let's say we add this directive to our \<p\> tag.

    <p appHighlight highlightColor="yellow">This will be Highlighted in Yellow on mouseenter. Good times!</p>

 Examples of Directives 
-----------------------

I think at this point, after just getting used to directives, it can be
a bit difficult to internalize what an example of a directive looks
like. I would therefore just like to jot down real quick, what an
example of some custom directives would look like:

1.  trim-whitespace.directive.ts - A directive for trimming extra
    whitespace from input fields. It would include an onChange event for
    whenever value is changed. It would also include an onTouched event,
    so that whenever user clicks on input, it will trim any of the text.

2.  infinite-scroll.directive.ts - An infinite scroll directive. It
    would attach its self to a container, and allow for it to make
    Graphql reqeusts, whenever user scrolls beyond height of the
    container.

3.  copy-to-clipboard.directive.ts - Allow for the ability of
    automatically copying text to the clipboard.

4.  go-back.directive.ts - Allows for the ability to attach the
    capability to click on any button and go back to the previous page.
