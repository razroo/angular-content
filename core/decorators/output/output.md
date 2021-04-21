---
title: Output
---
Output is another decorator native to Angular.

On it's own it doesn't do anything. However, it does allow for the three
following things to happen:

1.  Marks a class field as an output property.

2.  Supplies configuration Metadata

3.  DOM property bound to the output property is automatically updated
    during change detection.

The Output decorator is always used in tandem with an event listener.
What this means, is that we can have a re-usable component, with a
button for instance. By using Output, we can have a function within the
dumb component, that whenever it get's called, it triggers the parent
function.

 Example of Output 
--------------------

Here is a great example of what an Output is, and what it accomplishes.
In our scenario, we want to build a re-usable pxl-color-changer
component:

```ts
// pxl-code-changer.component.html

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pxl-color-changer',
  template: './pxl-code-changer.component.html',
  styleUrls: ['./pxl-code-changer.component.scss'],
})
export class PxlCodeChanger implements OnInit {
  @Output() colorChanged = new EventEmitter<any>();
  constructor() {}

  changeColor(data: string) {
    this.colorChanged.emit(data);
  }
}
```

```html
<div>
<form>
<-- Update code when we get it -->
</form>
</div>
```

and in the parent component consuming our component:
```html
<div>
    <pxl-color-changer></pxl-color-changer>
</div>
```
    

 bindPropertyName 
-----------------

Similar to Input, Output allows for binding an optional property name.
This would mean that the re-usable component would internally refer to
the Input value as one way, and the consuming component would refer to
it, in another.

```ts
// pxl-code-changer.component.html
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pxl-color-changer',
  template: './pxl-code-changer.component.html',
  styleUrls: ['./pxl-code-changer.component.scss'],
})
export class PxlCodeChanger implements OnInit {
  @Output('changeColor') colorChanged = new EventEmitter<any>();
  constructor() {}

  changeColor(data: string) {
    this.colorChanged.emit(data);
  }
}
```
