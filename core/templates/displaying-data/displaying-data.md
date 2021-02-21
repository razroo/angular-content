---
title: Displaying Data
---
One of the nicer things about the migration from AngularJS to Angular
was that many html bindings felt at home. If you are someone who had the
ability to experience Angular, after working with AngularJS then
templates feel entirely intuitive.

Templates in Angular are one of the easier topics to grasp in Angular.
Sometimes when learning syntax for the first time, there's so much there
that it's easy to overlook reasons behind syntax. Perhaps we assume the
reason there are different symbols and letters for the different ways of
operating within a framework is because we just need to represent the
different ways of doing a particular action within a framework.

## Interpolation

Interpolation, by definition, means inserting something of a different
nature into something else. In the context of Angular, interpolation
means being able to place a JavaScript expression in your html. This is
signified by the double curly brace.

```{caption="interpolation-example.component.html"}
This is 2 + 2
<!-- This is 4 --> 
```

## Angular Components

In an Angular setting, based on best practices and those set into place
by the Angular CLI, the generation of the component will consist of four
files:

1. \*.component.ts
2. \*.component.spec.ts
3. \*.component.html
4. \*.component.scss

In the above files, html and component files will tend to interact with
each other the most. For any component file, there is atleast going to
be one or more properties placed in the respective component file.

```{caption="header.component.ts"}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pxl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit() {}
} 
```

```{caption="header.component.html"}
<h1>{{title}}</h1>
```

Here, we are interpolating the `title` property into our html, by using
double curly braces around the value. This is classic syntax in an
Angular setting.

## Displaying an Array within an HTML Template

Quite a common occurrence within any application, is that the data will
return an array of objects - also known as a collection - to be consumed
by the app. Many times there will be a need to iterate over the array
with the html, so that the data objects can be accessed.

```{caption="px-code-box.component.ts"}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'px-code-box',
  templateUrl: './code-box.component.html',
  styleUrls: ['./code-box.component.scss']
})
export class CodeBoxComponent implements OnInit {
  @Input() cssCode: string[];
  constructor() { }

  ngOnInit() {}
} 
```

```{caption="px-code-box.component.html"}
<div *ngFor="let css of cssCode">
{{css}}
</div>   
```

The `*ngFor` works similar to a regular Javascript `for` loop, iterating
through every value within the array.

### Accessing Object Data Within Arrays

It is quite common that a situation will arise, that a developer will
need to access data within the object. Doing so, is exactly the same way
as you would expect within regular Javascript. Let's update our code-box
component code.

```{caption="px-code-box.component.ts"}
import { Component, OnInit } from '@angular/core';
import { CssCode } from 'css-code.interface.ts';

@Component({
  selector: 'px-code-box',
  templateUrl: './code-box.component.html',
  styleUrls: ['./code-box.component.scss']
})
export class CodeBoxComponent implements OnInit {
  @Input() cssCode: CssCode[];
  constructor() { }

  ngOnInit() {}
} 
```

```{caption="px-code-box.component.html"}
<div *ngFor="let css of cssCode">
{{css.file}}
</div>   
```

We are accessing the file property within our css object the same way we
would any regular JavaScript object.

## Conditionally Display HTML

Within Angular there is the ability to conditionally display html.
Similar to an `if` statement within Javascript, the html will only be
displayed, if it matches the expected statement.

```
<div *ngFor="let css of cssCode">
<div *ngIf="css.file as file" class="name">
{{file}}
</div>   
```

In the above code, file will only be shown if it actually exists on the
css object.