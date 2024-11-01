---
title: Material Design
---
I was debating writing this chapter. The reason primarily being, that
depending on the size of your company, you might up end writing your own
design system. I completely understand that, and it makes sense if you
are a B2C [^1] application, or a B2B application. If you are a Business
to Business application, then using an out of the box design system
probably makes sense. If you are building a cosumer application, I can
see how you would want your experience to be unique to that of other
websites(granted not working on an MVP).

However, I truly do not understand why a company using Angular, would
not want to use material design. It is the most robust design framework
that exists within open source. In addition, the documentation for
Angular components is next to none. I personally have been in companies
where they had a business to business applications and they decided not
to use material design. It was an absolute mess! I'll never forget the
conversation we had 6 months in, wherein I asked if it was possible for
us to get design closer to the internal design system we agreed on, so
we can create the custom component! The designers response is a classic!
"I thought the developers were doing that on their own! ". Avoiding a
scenario like this, is very difficult, and in my opinion, not worth it
for many team.

Companies choosing to use Material Design could have saved loads of
resources not having to design and implement their own components. It is
out of the vast amount of use cases that I see Material Design being
valuable, that I have decided to go ahead and write about it.

## Material Design - Talking to UX/UI

This chapter right here, is perhaps why I like Material Design the most.
Material Design has documentation for how the UX[^2] should work. It
also has an Angular Component Library with demos, that I can show off to
UX and show them, this is how it works by default. It addition, theming
for Material Design, is very easy.

### Theming your Material Design

Putting your own company specific theme on it is generally very easy. In
addition, it can help alleviate any concerns those might have of using
Angular Material Components, due to it being possible to move over into
a different library. From professional experience, I have found the
following to be the cornerstone of what your team can expect to
customize:

1. Colors
2. Font
3. Spacing(Margin + Padding)
4. Icons(not that this is anything particular)
5. Buttons

The above would be it for starters. As your designs go on, you will have
components that you will end up overriding. These will go in a partial
sass file, something that we will go into more detail as time goes on.

## Material Design - Create your own Confluence Doc

It is important when working with UX/UI to document discrepencies. For
inspiraiton look at the [material design
docs](https://material.io/guidelines/components/sliders.html). The idea
is to have a central place where UX can document the differences they
have made from the general Material DLS. Something like a Confluence
doc(if you are familiar with Atlassian), is a bit excessive. I have
found that it's too difficult for developers who spend the majority of
their time in code tools to document on confluence. In addition, for
designers to spend their time outside of the design tools(e.g. Sketch
and Invision).

From a matter of ownership, engineering has a stronger discipline of
documentation and organization, due to code being very abstract at
times. Engineers should look to take ownership of the confluence doc.
However, an Invision doc, seems to be more efficient. Design should look
to create an Invision doc, that spans maybe 5 - 15 pages, on the DLS
deviations they have from actual Material Design.

## Material Design - Use Invision

It's interesting, because someone might not think of tooling as
something which is a part of engineering architecture. However, with
regards to finding discrepencies in DLS(Design Language System),
Invision is integral. It will make creating comments on particular
components as something which will be fluid.

## Material Design - Push Back

The following will be worth alot of time for many different people
within your organization. Make sure that your component does not deviate
from Material Design. In addition, look into whether, or not it is
pre-described for you to go ahead, and create your own components.
However, I can assure you designers, product/business, and engineers
will all be happy when you go with the default components when possible.
When building a product, unless it is beyond the MVP go with what is
available for you by default.

## Material Design - Architecture Corner

In a Material Design setting, there will be discrepencies in the design,
which we have mentioned above, two ways in order to address, and make
sure that engineering is in sync with Design.

However, how does Engineering make sure, that all engineers are adhering
to the principles layed out in the DLS. There are two methods which will
help to a great extent:

1. Sass functions, with error reporting.
2. Automating UI layer. I.e. overrides for material components across
   the app.

[^1]: Business to Consumer

[^2]: User Experience