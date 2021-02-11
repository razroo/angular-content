---
title: Transitions and Triggers
---

There are a number of transition states.

 Wildcard Matching 
------------------

Using an asterisk in a transition state will represent any sort of
situation.

For example:

      open => closed 
      open => *
      * => closed
      * => *

All of the above four will match when an element's state changes from
open to anything else. Similar to routing, the asterisk will be a wild
card meant to match any remaining use cases, animation transitions also
follow in the same vein.

 Situations where a Wildcard can be Used 
----------------------------------------

###  Using Wildcard with Styles 

    transition ('* => open', [
      animate ('1s',
        style ({ opacity: '*' }),
      ),
    ]),  

The transition of animate of 1s will match whatever it is that the
current rule is.

###  Combining Wildcard and Void States 

A void state is a way of causing an animation to occur whenever an
element is entering or leaving a page.

The proper syntax for letting Angular knowing that an element should be
animated when leaving, or entering would be to do the following:

    animations: [
      trigger('flyInOut', [
        //...
        transition('void => *', [
          //...
        ]),
        transition('* => void', [
          //...
        ])
      ])
    ]

###  :enter and :leave aliases 

However, Angular allows for the following alias, called `:enter` and
`:leave`.

    animations: [
      trigger('flyInOut', [
        state('in', style({ transform: 'translateX(0)' })),
        transition(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate(100)
        ]),
        transition(':leave', [
          animate(100, style({ transform: 'translateX(100%)' }))
        ])
      ])
    ]

In the above code, when an `HTML` element isn't attached to the view, we
apply a transition. When entering the page, the element will fly in.
When leaving the page, the element will fly out.

It is important to note that `:enter` and `:leave` willonly run, if the
element is removed, or added. Therefore, it is required to leave an
`*ngIf` on the div. An example, would be something such asthe following:

``` {caption="insert-remove.component.html"}
<div @myInsertRemoveTrigger *ngIf="isShown" class="insert-remove-container">
  <p>The box is inserted</p>
</div>  
```

``` {caption="insert-remove.component.ts"}
trigger('myInsertRemoveTrigger', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('5s', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('5s', style({ opacity: 0 }))
  ])
]),  
```

When a Value Increases, or Decreases
------------------------------------

Angular has a built in transition for when a value increases, or
decreases.

      trigger('filterAnimation', [
        transition(':enter, * => 0, * => -1', []),
        transition(':increment', [
          query(':enter', [
            style({ opacity: 0, width: '0px' }),
            stagger(50, [
              animate('300ms ease-out', style({ opacity: 1, width: '*' })),
            ]),
          ], { optional: true })
        ]),
        transition(':decrement', [
          query(':leave', [
            stagger(50, [
              animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
            ]),
          ])
        ]),
      ]),  

When the value is incremented it will cause a transition to happen.

 Transitions for Boolean Values 
-------------------------------

In many situations, we may ask - should something be opened, or closed.
Should it be shown, or hidden? For situations like this, Angular offers
the ability to create transitions based on booleans:

``` {caption="open-close.component.html"}
<div [@openClose]="isOpen ? true : false" class="open-close-container">
</div>
```

and

``` {caption="open-close.component.ts"}
animations: [
  trigger('openClose', [
    state('true', style({ height: '*' })),
    state('false', style({ height: '0px' })),
    transition('false <=> true', animate(500))
  ])
],
```

 Multiple Animation Triggers 
----------------------------

In an Angular setting, each time an animation is triggered, the parent
always get priority and cuts off the ability for child animation to run.

In order for a child animation to run, a parent element must trigger an
`animateChild` function placed on the child element.

``` {caption="open-close.component.html"}
<div [@.disabled]="isDisabled">
<div [@childAnimation]="isOpen ? 'open' : 'closed'"
  class="open-close-container">
  <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
</div>
</div>  
```

``` {caption="open-close.component.ts"}
@Component({
  animations: [
    trigger('childAnimation', [
      // ...
    ]),
  ],
})
export class OpenCloseChildComponent {
  isDisabled = false;
  isOpen = false;
}
```

 Animation Callbacks 
--------------------

There are times where you might want to tap into a particular time
period of an animation. For a low API request, you might want the
download button to have some sort of pulsating animation. When the API
request completes, the pulsating can stop. An icon can work as well,
however, there is some psychology behind if the actual item clicked on
is the one that animates, as opposed to bringing in an outside icon. So
let's imagine we are triggering an animation, we can do something such
as the following:

``` {caption="open-close.component.ts"}
@Component({
  selector: 'app-open-close',
  animations: [
    trigger('openClose', [
      // ...
    ]),
  ],
  templateUrl: 'open-close.component.html',
  styleUrls: ['open-close.component.css']
})
export class OpenCloseComponent {
  onAnimationEvent ( event: AnimationEvent ) {
  }
}  
```

``` {caption="open-close.component.html"}
<div [@openClose]="isOpen ? 'open' : 'closed'"
  (@openClose.start)="onAnimationEvent($event)"
  (@openClose.done)="onAnimationEvent($event)"
  class="open-close-container">
</div>
```

###  Debugging Animations using Callbacks 

Let's imagine in the above`animationEvent`, if we were instead to use
cram our animationEvent with the following:

``` {caption="open-close.component.ts"}
export class OpenCloseComponent {
  onAnimationEvent ( event: AnimationEvent ) {
    // openClose is trigger name in this example
    console.warn(`Animation Trigger: ${event.triggerName}`);

    // phaseName is start or done
    console.warn(`Phase: ${event.phaseName}`);

    // in our example, totalTime is 1000 or 1 second
    console.warn(`Total time: ${event.totalTime}`);

    // in our example, fromState is either open or closed
    console.warn(`From: ${event.fromState}`);

    // in our example, toState either open or closed
    console.warn(`To: ${event.toState}`);

    // the HTML element itself, the button in this case
    console.warn(`Element: ${event.element}`);
  }
}  
```

In the above, we can now view exactly what ishappening within our
animation and can use this to determine animation if anything is awry.

 Keyframes 
----------

Many animations happen to have a simple two step solution. For instance,
show and hide component, or maximize height. However, there might be an
animation that might be more than two steps. For animations of this
scale, we will want to use Angular's `keyframe()` function, which is
very similar to keyframes in CSS [^1].

If using default keyframes, it will automatically split the different
times, across the time frame.

    transition('* => active', [
      animate('2s', keyframes([
        style({ backgroundColor: 'blue' }),
        style({ backgroundColor: 'red' }),
        style({ backgroundColor: 'orange' })
      ]))

In the above code, initially the `backgroundColor` will be blue. From 0s
to 1s, the `backgroundColor` will be red. From 1s to 2s the
`backgroundColor` will be orange.

###  Offset 

Angular also gives the option to define at which point in the keyframe
the animation should occur. Let's take the previous default animation
and supply it with offsets:

    transition('* => active', [
      animate('2s', keyframes([
        style({ backgroundColor: 'blue', offset: 0}),
        style({ backgroundColor: 'red', offset: 0.8}),
        style({ backgroundColor: 'orange', offset: 1.0})
      ])),
    ]),
    transition('* => inactive', [
      animate('2s', keyframes([
        style({ backgroundColor: 'orange', offset: 0}),
        style({ backgroundColor: 'red', offset: 0.2}),
        style({ backgroundColor: 'blue', offset: 1.0})
      ]))
    ]),

Automatic property calculation with wildcards
---------------------------------------------

Many times, we are not 100% aware of what the height will be of the
component that we would like to animate. Angular allows us to apply a
wild card styling to the element, so that the height is determined at
run time. Therefore, if we want, we can apply something like the
following, so that we can determine the height at runtime, and then
shrink the element when appropriate.

    animations: [
      trigger('shrinkOut', [
        state('in', style({ height: '*' })),
        transition('* => void', [
          style({ height: '*' }),
          animate(250, style({ height: 0 }))
        ])
      ])
    ]

[^1]: Keyframes in CSS can be seen
    [here](https://www.w3schools.com/cssref/css3_pr_animation-keyframes.asp.)
