---
title: NG Container Hack for Structural Directives
---
In Angular there are two quirks when it comes to structural directives:

```{caption="Quirk
<div *ngIf="someVariable">
  <p>This is text.</p>
  <p>This is more text.</p>
</div>
```

```{caption="Quirk
<ul>
  <li *ngFor="let box of boxes" *ngIf="box.item === 'food'">{{ box.name }}</li>
</ul>
```

The quirk probably naturally arises because for loops and if statements
weren't meant to be used within a template. So if we think about it that
way, where we can use some sort of Angular functionality to bring it out
of the DOM it brings us to ng-container.

## Understanding ng-container

In the [Angular
documentation](https://angular.io/guide/structural-directives#group-sibling-elements-with-ng-container),
ng `ng-container` is specified as a way to group elements without
introducing a new html element.

Some of the examples mentioned include a `<span>` element that might
introduce some accidental styling, or attempting to put a `<span>`
inside of a `select` element. `ng-container` will allow for to side step
those issues, by not introducing a new element to the actual DOM. We can
use the `ng-container` to solve the quirks we mentioned earlier:

```{caption="Solution
  to Implement Structural Directive"}
<ng-container *ngIf="someVariable">
  <p>The show goes on.</p>
  <p>and on and on and on.</p>
</ng-container>
```

Here, by introducing an ng-container, we no longer have to introduce a
new div, if we want the content to show conditionally. Likewise, to
solve the issue we had before of being able to use two structural
directives, we can do the following:

```{caption="Solution
<ul>
  <ng-container *ngFor="let box of boxes">
    <ng-container *ngIf="box.item === 'food'">
      <li>{{ box.name }}</li>
    </ng-container>
  </ng-container>
</ul>  
```

We could technically apply the `*ngIf` on the `li` element itself, for
consistency sake. If I had a team member that preferred otherwise, I
would be more than happy with that, just my preference.

*Thank you to Austin Spivey for being the person where I saw this
approach from.*