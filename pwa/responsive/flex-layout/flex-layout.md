---
title: Flex Layout
---

 What is Flex Layout 
--------------------

Flex layout provides an HTML UI layout for Angular applications using
Flexbox and a Responsive API.

 Understanding the Issue With CSS Based Flexbox 
-----------------------------------------------

-   CSS specifity - is the means by which browsers decide which CSS
    property values are the most relevant to an element and, therefore,
    will be applied. Issues rapidly become problematic, and continue to
    be so.

-   CSS footprint size becomes excessively large(\>250k for flexbox CSS)
    whereas with JS, the module is loaded within every specific module

-   Changes in layout direction required changes to child flexbox
    styling

-   No built in support for customized media query breakpoints (need to
    specify them yourself)

 Why Use Flex Layout? 
---------------------

-   Flex Layout is independent of Angular material

-   No external Css requirements

-   Support for Handset/Tablet and Orientation breakpoints

-   Support for any layout injector value

-   Support for raw values, or interpolated values

-   Support for raw, percentage, or px-suffix values. Change detection
    for Layout injector values.

-   Use provider to supply custom breakpoints

-   Notifications for breakpoints changes

-   MediaQuery Activation detection

 A Great Example of Flex Layout 
-------------------------------

One of the greatest selling points with regards to flex layout, is that
it makes responsive design very easy to do. In particular, it's ability
to apply a gap between elements, and easily change them between
different devices. However, I would like to show an example of the piece
of code that sold me on flex layout. I was playing around with a feature
called fxLayoutGap. It particular, it uses margin-right used when the
parent container `flex-direction == "row"` and margin-bottom is used
when the parent container `flex-direction == "column"`

So for instance, let's say we have a div will be using flex. We would
like there to be two divs inside, with a margin-left of 16px. This is
how we would do it if we weren't using fxLayoutGap.

    .icon-text {
      margin-left: mc-space-multiplier(1);
    }
    .chapter {
      margin-top: mc-space-multiplier(4);
    }

The following is a great example, of what can be done with flex-layout.

![image](pwa/responsive/flex-layout/flex-layout-grid){width="9.1cm"
height="6cm"} The following is the code which produces the above:

![image](pwa/responsive/flex-layout/flex-layout-code){width="9.1cm"
height="6cm"}
