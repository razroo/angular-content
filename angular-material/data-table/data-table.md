# Angular Material Data Table

Angular Material offers out of the box the `mat-table` component. The `mat-table` component in it's simplest form allows for a row of data to be displayed. It also offers some additional features: 

1. Pagination
2. Sorting
3. Filtering
4. Selection
5. Footer row
6. Sticky Rows and Columns
7. Multiple row templates

A link to these features will be supplied at the end of the chapter.

## Three core elements 
There are three core elements to the `mat-table`; 

### dataSource
The dataSource in it's simplest form, is an array of data that you will 
pass to the `mat-table`. The `mat-table` will treat that data like a 
for loop, and render a row for each object in the array. 

![](https://github.com/razroo/employee-dashboard-angular/blob/main/libs/ui/common/src/lib/data-table/data-table.component.html#L12-#L17)

