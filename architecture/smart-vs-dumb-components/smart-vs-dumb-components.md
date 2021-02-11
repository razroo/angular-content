---
title: Smart Vs Dumb Components
---
In any UI framework, following a smart component and dumb component
architecture is going to be a good idea with regards to re-usability.

It will completely change the way you go ahead and build your
components. It is one of those design patterns that you will inevitably
learn how to do on your own.

## A Dumb Component - Defined

A dumb component many times can be thought of as a child component.

Think of it as this component is going to be re-used is many different
places. How can we make it's logic as generic enough so that can happen?

Simply put, the dumb component will receive it's data from it's parent
component. The parent component will be responsible for retrieving the
data. The question then becomes framework specific, how can we pass
events up from the dumb component, to it's parent smart component. In
addition, how can we pass down data from the parent component to the
child component.

So the only two concerns when creating a dumb component is:

1. Event Binding
2. Property Binding

## A Smart Component - Defined

A smart component inversely will be responsible for creating the data,
to be passed down to the dumb component. In addition, it will hook into
the events for the specific dumb component, and make sure to make data
calls at that time as well.

## Where does State Come In?

One of the grayer areas when it comes to dumb vs. smart components, is
state management. I personally have found putting a re-usable state in a
dumb component to be extremely useful. State is to be made re-usable by
keeping all unique sets of data nested one level deep. This is done by
making the storeSelectName dynamic.

## Creating a Dumb Component in Practice

In an Angular setting there are two decorator functions that the
framework offers out of the box that will help in this regard. They are
@Input and @Output.

## @Input in Detail

@Input is Angular's way of passing down data from parent to child. So
just a quick example of how data would be passed down from a smart
component to a dumb component would be as follows:

```
export class DataTable {
  @Input() dataSource: DataTableData;
}

  <div *ngFor="data in DataCollection">
    <div class="DataTable__row">{{data}}</div>
  </div>
```

In our parent component's html, we would do something as the following:

```
<data-table [dataSource]="UserData"></data-table>
```

## @Output in Detail

@Output is an observable property. It is usually always coupled with an
event emitter. It's intended use to pick up on an even that happens
within a dumb component, and have actual logic happen within the smart,
parent component.

For example:

```
visible: boolean = true;
@Output() open: EventEmitter<any> = new EventEmitter();
@Output() close: EventEmitter<any> = new EventEmitter();

toggle() {
  this.visible = !this.visible;
  if (this.visible) {
    this.open.emit(null);
  } else {
    this.close.emit(null);
  }
}
```

Then in your html, it will look something like the following:

```
<data-table (open)="handleOpen()" (close)="handleClose()"></data-table>
```

## Wrapping Up

That would be it. The above will allow you to architect creating a smart
vs dumb component.