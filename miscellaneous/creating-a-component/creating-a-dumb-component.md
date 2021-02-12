---
title: Creating a Dumb Component
---
## Outline

1. Create a UI dumb component in Lib folder

   1. Use ClI to generate module
   2. Use ClI to generate component
2. Import module into appropriate page
3. Add component to page html
4. Add proper styling to the illColorPicker

## Create a UI Dumb Component in Lib Folder

This is a dumb component, it should be created in the UI folder.

```
ng g lib color-picker --routing --directory="ui"
ng g component color-picker -a=color-picker --export
```

## Add Color Picker to Pixel Grid Page Component

Let's import our ill color picker into our Pixel Grid page.

```
// pixel-grid-page.module.ts
+ import { IllColorPickerModule } from "@ill/ill-color-picker";
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