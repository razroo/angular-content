---
title: Sass Error Reporting
---

It can be very difficult to maintain a core design without some safe
guards in place to make sure it is consistent across the app. This is
where Sass error reporting comes in handy.

 When to use Sass Error Reporting 
---------------------------------

You should use Sass Error reporting if it is a core style. It is a core
style if it is used in more than one page, as a foundation piece of
styling, non unique to specific component.

 What We Are Looking For With Using Sass Functions 
--------------------------------------------------

1.  No values other than these are used

2.  When a Pr comes our way, and we say to use the above, we have a
    function which is self documenting.

3.  Have a UI of sorts that also trains developers on how the internal
    of the DLS works, so that they should be aware if anything is wrong.

The following is a great example of what a core design function would
look like.

    // Gutter variables, for padding + margin
    // function to take in multiplier(8), which must emit of one of values within ill-space-amounts
    @function ill-space-multiplier($n) {
      $ill-space-amounts: (0, 4, 8, 16, 24, 32, 40, 48, 56, 64);
      $ill-space-multiplier: 8;

      @if(index($ill-space-amounts, ($n * $ill-space-multiplier))) {
        @return #{$n * $ill-space-multiplier}px;
      }
      @else {
        @error "Must contain one of the following numbers: #{$ill-space-amounts}.";
      }
    }

If we have any component that is going to go ahead and use this
function, we can simply go ahead and use it:

    @import 'src/styles/variables';

    :host {
      padding: ill-space-multiplier(2);
    }

In this particular situation this helps, so that if the input passed to
the multiplier is not a number, it will complain. In addition, if the
result is not one of the multipliers, it will complain as well. So for
instance, if the number passed in, is 1.5, it will cause the function to
error out, being that there is no number 12, that is one of the ill
space amounts.

 Applying Architecture to Design Language System as a whole? 
------------------------------------------------------------

The truth is that this pattern only applicable to padding, and spacing.
For instance, we technically could create a function for breakpoints:

    // breakpoints to be used in conjunction with media queries across app
    @function ill-breakpoint($breakpoint) {
      $breakpoints: (
        'small': 400,
        'medium': 720,
        'large': 1024,
        'extra-large': 1424
      );
      @if (map-get($breakpoints, $breakpoint)) {
        @return #{map-get($breakpoints, $breakpoint)}px;
      } @else {
        @error 'Must contain one of the following strings: #{$breakpoints}.';
      }
    }

Flex layout is recommend. However, flex layout currently does not have
the ability to use this pattern. Nonetheless, for padding, and spacing
alone, this singular piece of sass functionality will probably be used
on a daily basis, and is very much so worth it.
