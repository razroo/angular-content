 Styling a Component 
====================

Styling a component can be a complex topic. With styling, as an
architect in an Angular setting, there are 4 things that you will have
to keep in mind:

1.  Pre-processor of choice(Scss, Less, PostCss, etc.)

2.  Design system

    1.  Material Design(Google)

    2.  Fluent Design(Microsoft)

    3.  Flat Design(Apple)

3.  Responsive design(even if you have a mobile/tablet app)

4.  Naming convention of CSS classes

 Pre-processor of choice 
------------------------

For our pre-processor, we have chosen Sass.

 Naming Convention 
------------------

For our naming convention, we will go with BEM. It is an extremely easy
way of setting a part a specific component from an html and css side of
things. A quick primer on BEM. Block is a component. We will be using
pascal casing for ours. Element is a child of block. It uses an
underscore. For instance:

    <div class = 'ChooseSize__input'></div>

M stands for modifier. A modifier is an element, which modifies an
already existing element.

 Design System 
--------------

In an Angular setting, the component library which seems to make most
sense is Material Components [^1]. It is a complete design system. All
component's design will be synonymous with each other. In addition, it
is in the process of creating a cdk, which makes all of these components
customizable. It is a nice design, and feels native to the way Angular
works.

I have used it versus other libraries and I can really say the
documentation is just fantastic. I have used it in more complex
settings(e.g. the data-table), and adding on new functionality has been
just a joy.

 Adding Material Design to Our App 
----------------------------------

First install Angular Material components and Angular Animations to our
app.

      npm install --save @angular/material @angular/cdk
      npm install --save @angular/animations

In addition, we will need to add default styling to our app, in order
for styling to be applied to our Angular Material component. Inside of
our styles.scss file, import the following.

    @import '~@angular/material/prebuilt-themes/deeppurple-amber.css';

 Our first component 
--------------------

In our app, we are going to create our first component. It is
essentially a form with three fields:

-   Columns

-   Rows

-   Pixel Size

In addition, there will be a button which will say, 'Create Grid'. We
are also going to wrap our component, with the \<mat-card\> component,
add a width of 300, margin-top and center.

###  Notable Mention - \@HostBinding 

In an angular app, many times, we will want to add a specific class to
our parent container. In our situation, we will be using BEM, and
creating a ChooseSize class. It will implement flex, and use justify
content, in order to center the \<mat-card\> component.

``` {caption="My Javascript Example"}
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-size',
  templateUrl: './choose-size.component.html',
  styleUrls: ['./choose-size.component.scss']
})
export class ChooseSizeComponent implements OnInit {
  @HostBinding('class') class = 'ChooseSize';
  constructor() {}

  ngOnInit() {}
}
```

By putting \@HostBinding as a decorator within our app, it causes the
host class to have the ChooseSize class. A decorator is a function that
is run when particular class is called.

We are then able to target our host element our scss:

      :host.ChooseSize {
        display: flex;
        justify-content: center;
      }

 CSS Naming Convention 
----------------------

In your modern day front end framework, such as Angular, generally, we
do not have to worry about clashing namespaces. [^2].

Many other issues with css at scale, have been solved as well, have been
solved by the general ecosystem, scss included.

However, recommended architecture is that one still use something like
BEM. I would like to argue for using BEM in an Angular setting:

1.  It allows for easy grep in code base, when inspecting element first
    within chrome.

2.  It documents the type of element that it is.

3.  It will give structure to html, without need of using pug, or some
    other html pre-processor.

4.  Ease's creation of classes for integration testing[^3]

It should be noted that within our app, the form has been made a
particular width, which will work on all screen sizes, without the need
of adjusting width. As we move along in our app, we will have the option
to look into situations wherein we can use actual media queries.

[^1]: https://material.angular.io/components/categories

[^2]: Historal footnote, the turning point for me was with this article
    [here](https://glenmaddern.com/articles/css-modules)

[^3]: Use a modifer for BEM
