 Animations 
===========

Animations have come a long way. Angular has made it, so that animations
can be baked into the framework. Here's how to implement a simple
animation within your component.

 Include Animations Module 
--------------------------

Angular has a `BrowserAnimationsModule`, which is based off of the
`BrowserModule`.

``` {caption="app.module.ts"}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [ ],
  bootstrap: [ ]
})
export class AppModule { }  
```

 Importing animation functions into component files 
---------------------------------------------------

Angular has many animation functions that can be used out of the box. We
are not going to go into detail on them all now. Here are some commonly
used animations:

``` {caption="app.component.ts"}
import { Component, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';  
```

For a summary of available animation functions, feel free to navigate
[here](https://angular.io/guide/animations#animation-api-summary)

Add the animation metadata property to component
------------------------------------------------

The next step in the adding an animation to a component process, would
be adding an animations metadata property.

    @Component({
      selector: 'app-root',
      templateUrl: 'app.component.html',
      styleUrls: ['app.component.css'],
      animations: [
        // animation triggers go here
      ]
    })  

 Animation State, Styles, and Transitions 
-----------------------------------------

When it comes to animations, there are three main functions to keep in
mind:

1.  `state()` - Function to define different states to call at the end
    of each transition. It takes two arguments:

    1.  A unique name like `open`, or `closed`

    2.  A `style()` function

    <!-- -->

        state('open', style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow'
        })),

2.  `style()` - A function used to assign a set of styles for a given
    state name. Style attributes must be camelCase.

        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow'
        })),

3.  `transition` - Used to specify the change that occurs between one
    state and another over a period of time. Accepts two arguments:

    1.  An expression that defines the direction between the two
        transition states.

    2.  An `animate` function

    <!-- -->

        transition('open => closed', [
          animate('1s')
        ]),

Triggering the animation
------------------------

Every animation requires a `trigger`, so that it knows when to start.
The `trigger()` function collects state, style, and transitions, and
gives it a name, so that it can be triggered in the html template.

``` {caption="open-close.component.ts"}
@Component({
  selector: 'px-open-close',
  animations: [
    trigger('openClose', [
      // state, style, and transition goes here
    ]),
  ],
  templateUrl: 'open-close.component.html',
  styleUrls: ['open-close.component.css']
})
export class OpenCloseComponent {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
```

We can now add this transition in our html, following the general
syntax:

``` {caption="*.html"}
<div [@triggerName]="expression">...</div>;
```

 Putting it all together 
------------------------

If we were to combine our animations, with our combined `state`,
`style`, and `transitions`, it would look something like the following:

``` {caption="open-close.component.ts"}
@Component({
  selector: 'px-open-close',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: 'open-close.component.html',
  styleUrls: ['open-close.component.css']
})
export class OpenCloseComponent {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
```

``` {caption="open-close.component.html"}
<div [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
  <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
</div>
```
