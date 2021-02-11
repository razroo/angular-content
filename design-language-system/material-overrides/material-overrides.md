---
title: Customize Angular Material Design
---

Razroo best practices, is that the easiest way to get your app up and
running, is to use Material Design within your Angular application.
Generally, an organization will want to roll their own theme into
Angular Material. When that happens, the developer will have to go ahead
and customize the build for material design.

Let's talk about how we can go ahead and do that, and how relatively
simple it is.

Understanding Colors in Material
--------------------------------

It is important to understand something called a color palette. A color
palette in the digital world, refers to the full collection of colors
that is used within a particular design. Within a Material Design
application, it refers to the collection of colors that can be used
within the application.

Material's design language makes use of two main colors for it's color
palette. That would be primary and seconday values.

### Primary and Secondary Values

1.  Primary - Color displayed most frequently across your app's screens
    and components.

2.  Secondary - \"Provides more ways to accent and distinguish your
    product.\" This includes:

    1.  Floating Action Button(Literally buttons that float over main
        content)

    2.  Selection controls(sliders, switches etc.)

    3.  Highlighting selected text

    4.  Progress bars

    5.  Links and headlines

![image](design-language-system/material-overrides/material-design-palette_pt.pdf){width="414pt"}

### Material Color Maps

Based on a primary value, Material will create a color map to used
within different components across it's library. It will then create a
series of light and dark variants based on the primary and secondary
values. The primary and second values must be a map of colors going from
lightest(50) to darkest(900).

The Material team has already created a series of 16 pre-defined color
maps, for used with it's design system. An example of material green
color map, for instance, will look something like this:

    $mat-green: (
      50: #e8f5e9,
      100: #c8e6c9,
      200: #a5d6a7,
      300: #81c784,
      400: #66bb6a,
      500: #4caf50,
      600: #43a047,
      700: #388e3c,
      800: #2e7d32,
      900: #1b5e20,
      A100: #b9f6ca,
      A200: #69f0ae,
      A400: #00e676,
      A700: #00c853,
      contrast: (
        50: $dark-primary-text,
        100: $dark-primary-text,
        200: $dark-primary-text,
        300: $dark-primary-text,
        400: $dark-primary-text,
        500: $dark-primary-text,
        600: $light-primary-text,
        700: $light-primary-text,
        800: $light-primary-text,
        900: $light-primary-text,
        A100: $dark-primary-text,
        A200: $dark-primary-text,
        A400: $dark-primary-text,
        A700: $dark-primary-text,
      )
    );

For primary values, the most used value will starts around 500. For
secondary values, the most used value will is 200. The significance of
these values is that Material Design will follow a Hierarchical system.
The darker the color is, the more of an emphasis we are placing on that
button. The lighter it is, the less emphasis we are placing on that
element.

Material Design and Sass
------------------------

In Angular, Sass tends to be the de-facto CSS pre-processor that is used
across multiple libraries in Angular. Material Design unexpectedly
offers Sass functionality out of the box, and makes it incredibly easy
to customize your environment based on sass overrides. Let's install
Angular Material, so that we can use Material's Sass Library, and
customize the theme as we see appropriate.

Npm Install Material Theme
--------------------------

First and foremost, let's make sure that we have properly installed and
Angular Material in our Angular application.

    npm install --save @angular/material @angular/cdk @angular/animations

You package.json will now include packages needed to use Angular
Material within the application in general. In addition, the package
(`@angular/material`) to make the Sass changes we so dearly need.

Import Material Design and Call Core Styles
-------------------------------------------

The next step, is for us to go ahead and import Material Design in our
`styles.scss` file. The `styles.scss` file can be found in the root
Angular application `src` folder.

``` {caption="styles.scss"}
@import '~@angular/material/theming';
// always include only once per project
@include mat-core();
```

What the above does is import the `theming.scss` file that contains all
of the theming variables for material design. We are also calling the
`mat-core()` function, which is a,

[^1]

 Using The Material Light + Dark Theme
-------------------------------------

Angular offers out of the box in the `_theming.scss` file a light and
dark theme function. The function looks as follows:

    @function mat-light-theme($primary, $accent, $warn: mat-palette($mat-red)) {
      @return (-
        primary: $primary,
        accent: $accent,
        warn: $warn,
        is-dark: false,
        foreground: $mat-light-theme-foreground,
        background: $mat-light-theme-background,
      );
    }  

It takes in two required parameters:

1.  Primary - Primary color

2.  Accent - Accent color

and one optional parameter called warn, which by default will be red.
So, let's say we wanted to create a custom theme based on some of the
values that Angular provides. We can use the functionality the Angular
Material team provides out of the box. In particular, the `mat-light`
theme.

    $px-app-primary: mat-palette($mat-green);
    $px-app-accent: mat-palette($mat-yellow);

    $px-theme: mat-light-theme($px-app-primary, $px-app-accent);

    @include angular-material-theme($px-theme);

Now all of our Angular Material components, will be using our unique
theme. (Granted this is based on pre-built colors Angular has provided,
but you get the point.)

Creating Our Own Custom Theme
-----------------------------

Quite common is that your organization will want to layer their own
custom theme outside of the 16 colors that Angular provides. This might
manifest it's self in two scenarioes:

1.  A new primary and secondary color

2.  In addition to new primary and secondary color, a new background and
    foreground color as well.

Designers have a tool that allows them to automatically generate the
appropriate color in their design by supplying a singular color. Angular
developers have that luxury as well. There are tools that will do that
for you. My personal favorite is the [Material Design Palette
Generator](http://mcg.mbitson.com). You will then have the ability to
click on the clipboard icon, click on the dropdown for Angular JS 2
(Material 2), and copy the scss variable map. It's really as simple as
that.

![image](design-language-system/material-overrides/palette_generator_screenshot.pdf){width="414pt"}

### Create a \_themes.scss file

Being that we are creating our own themes, the cleanest thing for us to
do would be to place it in it's own \_themes.scss file. In addition,
assuming that the organization is going to build out more applications,
giving it the ability to plug and play the companies theme, will really
speed up development for other parts of the company. That being said,
Razroo best practices is to create a lib folder for styles.

\[libs \[common \[styles \[\_themes.scss,file\] \] \] \]

and inside of our styles folder, we are going to create a `_themes.scss`
file. Our generated themes using our primary, or seconday colors might
look something like this:

    $razroo-primary-blue: (
      50 : #e7f2f4,
      100 : #c3dee4,
      200 : #9cc8d3,
      300 : #74b2c1,
      400 : #56a2b3,
      500 : #3891a6,
      600 : #32899e,
      700 : #2b7e95,
      800 : #24748b,
      900 : #17627b,
      A100 : #b3eaff,
      A200 : #80dcff,
      A400 : #4dcfff,
      A700 : #33c8ff,
      contrast: (
        50 : #000000,
        100 : #000000,
        200 : #000000,
        300 : #000000,
        400 : #000000,
        500 : #ffffff,
        600 : #ffffff,
        700 : #ffffff,
        800 : #ffffff,
        900 : #ffffff,
        A100 : #000000,
        A200 : #000000,
        A400 : #000000,
        A700 : #000000,
      )
    );

It's quite a bit of code, but I just wanted to visualize that all of
this is created by using the Material Design Palette Generator. I.e.
what you can expect when you do the same.

Using Libs \_themes.scss file 
------------------------------

Inside of our `styles.scss` file, we can import our `_themes.scss` file.
Assuming we are just changing the primary color and secondary color, we
can do the following:

    @import '~@angular/material/theming';
    @import 'libs/common/styles/_themes';  

    $razroo-theme: mat-light-theme(mat-palette($razroo-primary-blue), mat-palette($razroo-secondary-red));
    @include angular-material-theme($razroo-theme);

We now have custom themes that we have created. With the architecture we
setup, they are available globally to be used by other
applications/teams. In addition , using the Angular mat-light-theme
function(mat-dark-theme also an option), or app is now using our
exclusive theme.

Background + Foreground
-----------------------

It is important to mention that per the Material Design guidelines,
background and foreground are not meant to represent brand. They are
more so used to convey the energy of the application. For that reason
the Material Team does not offer a way of the box to change it. For
Razroo's Pixel Illustrator (the world's most complete open source
enterprise application that Razroo will be open sourcing soon), we
wanted to create a very vibrant application.

This means that we wanted to use our own background and foreground
colors. Doing something like this requires a bit more of effort probably
from the Material team expecting you to do it less. There are four steps
required to change the background to what you want.

1.  Generate color theme maps, using the Material Design Palette
    Generator

2.  Create a backround theme, and foreground theme for our application.

3.  Create our own custom theme function.

4.  Creating a default background for html + body, being that this will
    only work as an override for material design components.

``` {caption="Example of what a custom background theme looks like."}
// Background palette for light themes.
$razroo-theme-background: (
  status-bar: map_get($razroo-background-yellow, 300),
  app-bar:    map_get($razroo-background-yellow, 100),
  background: map_get($razroo-background-yellow, 50),
  hover:      rgba(map_get($razroo-background-yellow, 500), 0.04), // TODO(kara): check style with Material Design UX
  card:       map_get($razroo-background-yellow, 500),
  dialog:     map_get($razroo-background-yellow, 500),
  disabled-button: rgba(map_get($razroo-background-yellow, 500), 0.12),
  raised-button: map_get($razroo-background-yellow, 500),
  focused-button: $dark-focused,
  selected-button: map_get($razroo-background-yellow, 300),
  selected-disabled-button: map_get($razroo-background-yellow, 400),
  disabled-button-toggle: map_get($razroo-background-yellow, 200),
  unselected-chip: map_get($razroo-background-yellow, 300),
  disabled-list-option: map_get($razroo-background-yellow, 200),
);
```

Use the background + foreground color by designer, and follow up with
the Material Design Color Palette tool, and create the appropriate color
map.

``` {caption="What custom theme function would look like"}
@function razroo-theme($primary, $accent, $warn: mat-palette($mat-red)) {
  @return (
    primary: $primary,
    accent: $accent,
    warn: $warn,
    is-dark: false,
    foreground: $mat-light-theme-foreground,
    background: $razroo-theme-background,
  );
}  
```

``` {caption="html and body override"}
$razroo-theme: razroo-theme(mat-palette($razroo-primary-blue), mat-palette($razroo-secondary-red));

// Inject $razroo-theme across angular-material-theme
@include angular-material-theme($razroo-theme);  

html, body {
  width: 100%;
  height: 100%;
  background-color: map_get($razroo-background-yellow, 50);
}
```

Angular Material will not change the html and body background. You will
have to go ahead, and do that yourself.

Overriding Components
---------------------

After we have overridden our theme in general across the app, there will
be times wherein we will need to override specific styles for the
component. There really isn't any way to modify the styling ahead of
time. The only way is to target the specific material component's class,
and to modify it when appropriate at run time. However, what we can do,
is consolidate all of our overridden components in a singular place, so
that it is well organized. For instance, let's say that we have a dialog
that we would like to remove the default padding for in some scenarios,
but keep it in others. We would put a dialog file inside of our material
overrides folder. Our folder/file structure will look like the
following:

\[libs \[common \[styles \[material-overrides \[\_dialog.scss,file\]
\[\_material-overrides.scss,file\] \] \[\_themes.scss,file\] \] \] \]

We import every material override into the main
`_material-override.scss` file. Then, import the material-override file
in our main `styles.scss` file.

Overriding Overlay Components
-----------------------------

Overlay components are unique from an Angular Material persperctive. You
will actually have the ability to target a specific class. If you wish
to override an overlay component, overlay components have a `panelClass`
property that can be used to target the overlay pane. For instance, with
regards to dialogs, we have the ability to add a class doing the
following:

    this.dialog.open(PxDialogComponent, {panelClass: 'razroo-no-padding-dialog'}) 

Now, we have the option to apply a css theme specifically to the
razroo-no-padding-dialog class.

    .myapp-no-padding-dialog .mat-dialog-container {
      padding: 0;
    }

This gives us freedom moving forward, so that we can have multiple
appearances for our material components.

Overriding Non Overlay Components
---------------------------------

Non overlay components, do not have the option to add a `panelClass` to
be target using CSS. The only solution which truly makes sense, and is
sustainable, is to create a global override on the component itself. So,
let's say that we wanted to change the appearance of our material card
components. Perhaps make the padding a little less pronounced. We would
do the following:

``` {caption="\_mat-card.scss override"}
  .mat-card {
    // this will be 8px
    padding: rz-space-multiplier(1);
  }
```

Wrapping up
-----------

Material is a commonly used design language for Angular. It is
incredibly simple to set up, a breeze to modify, and excellent for rapid
prototyping. It can knock off a significant amount of development time
for personal and team based projects.

[^1]: This quote can be found in the `_theming.scss` file
