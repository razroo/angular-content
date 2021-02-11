---
title: Design Language System
---
Creating a design language system the key to a clean architecture.
Within Angular the Full Gamut, we are going to assume that you are using
Material Design as your design language system.

Material Design is a robust library for creating visually appealing
Angular components. When you want to modify something, it's good to have
a light design language system to scaffold your code creation process.

## Identifying Key Points of DLS

The following are the 10 points that are a part of a design language
system:

1. Colors
2. Styles
3. Icons
4. Grid and Spacing
5. Typography
6. Buttons
7. Form Controls
8. Navigation
9. Cards and Portlets
10. Data Tables

## Identifying Proper Architecture

When you want to overide material design, this is where architecture
kicks in.

### Colors

Material design has the ability to be 'turned off' through overriding
the sass file. You can override material theme by using Sass Variables.
So it would look something like this:

```
@import 'src/styles/themes/blue-orange';
@import 'src/styles/material-overrides/material-overrides';
```

Doing something like the following:

```
$gray-50: #fafafa;
$gray-200: #dbe1ea;
$gray-300: #e0e0e0;
$gray-400: #cccccc;
$gray-500: #bdbdbd;
$gray-600: #9b9b9b;
$gray-700: #757575;
$gray-800: #444444;
$gray-900: #212121;
```

Now the colors you have are specific to your app.

### Grid and Spacing

This one etc.