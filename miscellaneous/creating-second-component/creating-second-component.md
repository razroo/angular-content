---
title: Creating a Second Component
---
Creating a second component within your app is a monumental occasion. It
lays down the groundwork for how you are going to integrate numerous
components together within your app. Let's lay down at a high level what
this means with regards to a Mono Repo, in an enterprise Angular
setting:

1. Lib Folder
2. Angular CLI Command
3. Ngrx/nx ngrx considerations
4. Routing Considerations
5. Service Considerations
6. Pipe Considerations
7. Responsive Considerations

## Angular Pixel Illustrator - Example Use Case

Let's take the above considerations into our app. The next component we
are going to create is a color picker. It will contain two sub
components, a background color picker, and a pixel color picker, re-used
by a singular component.

It will most definitely be going to into the lib folder. We will be
using the angular cli. We will be creating state called color. With
regards to a route, we want to create a generic route that will switch
out from the pixel grid chooser over to a a color picker view. We are
also going to want a consideration for mobile as this is a PWA. There
aren't any pipes we will be using.

## Dissecting Business Requirements for Color Picker

With regards to the color picker. There are three unique aspects of the
business logic:

1. Color picker + Background Color Picker - Shared Logic

   1. RGB
   2. HEX
   3. Convert RGB to HEX and vice versa
   4. Have color bar below pixel picker, change based on color value.
2. Background Color picker

   1. Change grid background, based on background color picker.
3. Color picker

   1. Change pixel color, based on pixel color picker.

## Creating a Second Component - Putting it all Together

This process is going to be created each time we create a new component.
Therefore, it would make sense to sum up this process so we can repeat
the process in every app. In addition, for redundancy sake, we will go
back to this checklist, and repeat the process.

@ l *4c @ & Need & Do Not Need\
@ngrx/store & &\
Route & &\
Service & &\
Pipe & &\
Responsive & &\

\
\
Regarding Business requirements:

```
  Scenario: When Using the Color Picker
    Given I enter Hex
    Given I enter RGB
    Then I should see state affected appropriately.
```

You will notice for this particular component, the Then of our
Acceptance criteria, is oddly focusing on State. This is because due to
the dynamics of our system, this is what we are trying to focus on.
However, if a product person were to create it, one can expect it to be
more holistic, and to focus on updating the grid as appropriate instead.