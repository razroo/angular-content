 Track By 
=========

In Angular, there are performance enhancements that are valuable here
and there. It can be easy to miss them. So they are not integral towards
the core documentation.

In particular when it comes to for loops for Angular, the way that
change detection works is that if any part of the array is changed
Angular will aggressively change the entire DOM. This is of course can
lead to performance issues, if all we need is a particular piece of data
to be changed. The Angular framework has an internal `trackBy` function
to combat these performance leaks.

 Using Track By in Angular 
--------------------------

Using `*ngFors` in Angular is actually quite common. Suffice to say,an
ngFor that parses through alot of data, as well as optimizing it for
performance reasons, is very important. Even it's an application that
has pagination through the backend, and we only allow a maximum of 50
rows at a time.

###  So What is trackBy?

What trackBy does is check the set as a whole for order changes
(sorting, insertion, deletion). When the order changes, instead of
removing all elements from the DOM and creating new ones, the trackBy
function is used to identify which elements do not need to be removed
from the DOM. This reduces the number of DOM calls, and also reduces the
number of angular digest cycles.

Under the hood `trackBy` tracks an order change. It does this by taking
in index of each item, and a unique identifier of that item. If item
does not exists, from prior id's and indexes, then it knows to insert
that one particular item into the DOM.

###  Track By Within Data Tables 

Specifically, within our architecture, we call for using Material. By
default, if a trackBy function is not given, Material Table will deeply
compare the elements in the set. So, a trackBy function is really used
to reduce the amount of checks necessary to compare elements in a set.
Instead of a deep copy, you can check for a single unique property.

 Track By in Practice 
---------------------

``` {caption="data-table.component.html"}
  <mat-table
  [trackBy]="trackByBuyerId">
  <mat-table/>
```

``` {caption="data-table.component.ts"}
//.. this code is inside of our component class  
trackByBuyerId(index, item) {    
  return item.id; // unique id corresponding to the item
}
```

By doing the above, track by will in a material setting make sure that
objects in the data table are not deeply compared, comparing objects
directly to each other.
