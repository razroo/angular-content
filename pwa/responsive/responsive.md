 Responsive Design 
==================

 Choosing a Framwork 
--------------------

When it comes to responsive design, there are a number of frameworks
that you can choose with regards to creating a web app. The following
are quite popular:

1.  Foundation

2.  Bootstrap

3.  Semantic UI

However, if you're using any of the above for a grid system, it can be a
bit of an overkill.

Specifically, the direction many UI web app tend to head, is that it
will only be used on Desktop. For mobile and tablet, there will be a
separate Android and iOS app created. Due to the nature of Angular's
component architecture, the use of ready made components, containers for
apps are the only thing which will actually have specific media queries.

It is strongly suggested that your own super lightweight grid is
created, or used. I think it is important to keep in mind that most grid
systems can be limited to 500 lines of code, or less.

I personally prefer to use Skeleton [^1]. However, I am in the process
of creating my own grid system using css-grid. (need to get back to this
one).

Alternatively, creating our own grid system is also advantageous. That
is the direction that will make sense in any enterprise app. Generally,
in any business setting, there is often a requirement to personalize the
styling of the application to their design guidelines.

 Breakpoints 
------------

The recommended architecture for a design language system is material
design.

Now you might be thinking, that a design language system, is front end
framework agnostic. However, I would like to make the following point. A
design language system is then built into a component library. If a
design language is not built with a particular front end framework in
mind, the odds of it being built into a robust component library, are
slim. Angular Material Components is so robust, is almost turns not
using Material Design as your design language as a sin.

###  Official Material Design Breakpoints 

![image](pwa/responsive/layout-adaptive-breakpoints)

###  Choosing Four Specific Breakpoints 

Even within an enterprise setting, using all the breakpoints specified
within the Material Design specification can be quite a bit. We
recommend using the following breakpoints:

1.  400px\[Mobile Large - Portrait\]

2.  720px\[Tablet Large - Portrait + Mobile Large - Landscape\]

3.  1024px\[Tablet Large - Landscape\]

4.  1424px\[Desktop Large\](16p below 1440 to accommodate for gutter
    space)

###  Of Four Breakpoints, Which Designs are Required? 

2 Designs are required, Mobile Large(400px), and Tablet Large(1024px).

###  Does UX/UI Need to Follow these Breakpoints? 

UX/UI does not need to use actual engineering breakpoints. For instance,
it might be easier to design with a laptop in consideration, instead of
a large tablet.

###  Build Media Query Function 

Per conventions, it is recommended that all items relating to the DLS be
specified with regards to functions. That way, we have a way of making
sure that nothing deviates from the design language system.

We will be creating an ill-ui folder and ill.scss file) in our lib
folder, to hold all all of our app's .scss files. In addition, we will
be creating an \_ill-breakpoints.scss file, to be imported in our
ill-ui.scss file. We will be creating the following in our app:

      @function ill-breakpoint($breakpoint) {
      $breakpoints: ('small': 400, 'medium': 720, 'large': 1024,
      'extra-large': 1424);

      @if(index($breakpoints, $breakpoint)) {
        @return #{map-get($breakpoints, breakpoint)}px;
      }
      @else {
        @error "Must contain one of the following strings: #{$breakpoints}.";
      }
    }

Let's imagine you are now building a media query for a specific
component that you are using, you can do something like the following.

[^1]: http://getskeleton.com/\#grid
