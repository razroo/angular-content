 Pixel Grid Container Layout 
============================

Now that we have introduced Flex Layout and our designs call for three
elements:

1.  Code Viewer

2.  Pixel Grid

3.  Color Picker

 Anticipate for Future Components 
---------------------------------

We know that we will have three components that will be set up side by
side. On our main page component, which will contain all three, we will
set the following three fxLayout directives:

      fxLayout="row"
      fxLayout.xs="column"
      fxFlexFill

The above is pretty straight forward. On screens not extra small, the
layout will be flex row. When the screen is extra small, the layout will
be column. With regards to fxFlexFill, it will populate the host element
with the following:

@ l \*4c @ & Value\
margin & 0\
width & 100%\
height & 100%\
min-width & 100%\
min-height & 100%\

[^1]

 Adding FxLayout to Pixel Grid Page 
-----------------------------------

###  Add Flex Layout to App 

      npm i --save @angular/flex-layout

###  Add Flex Layout to Pixel Grid Page Module 

    +import { FlexLayoutModule } from '@angular/flex-layout';

    +    FlexLayoutModule,

[^1]: Taken from documentation here:
    https://github.com/angular/flex-layout/wiki/fxFlexFill-API
