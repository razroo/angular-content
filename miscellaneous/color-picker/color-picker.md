---
title: Color Picker
---
Let's go through the steps again, being that we are creating our second
component. Part of learning is not only discovery, but maintenance.

## Outline of what needs to be done

1. Create a UI dumb component for color picker in Lib folder

   1. Should be generated in app folder in UI folder.
   2. Use ClI to generate module
   3. Use ClI to generate component
2. Import module into pixel-grid page
3. Add component to pixel-grid page html
4. Add proper styling to the illColorPicker

## CLI - Creation of Module and Component with Routing

First, let's create our component in the lib folder of our app.

```
ng g lib color-picker --routing --directory="dealworks/ui"
ng g component color-picker -a=color-picker --export
```

## Add Color Picker to Pixel Grid Page Component

Let's import our ill color picker into our Pixel Grid page.

```
// pixel-grid-page.module.ts
+ import { IllColorPickerModule } from ``@ill/ill-color-picker';
// in imports array
+ IllColorPickerModule
```

In addition, let's add the ill-color-picker component to our html.

```
+ <ill-color-picker></ill-color-picker>
```

## Add Styling Element to Create Basic

Let's add a basic width and height for out element.

```
.IllColorPicker {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
}
```