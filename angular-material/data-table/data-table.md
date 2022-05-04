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

```html
<table mat-table [dataSource]="tableDataSource" matSort>

    <!-- action column -->
    <ng-container *ngIf="rowActionIcon?.length" [matColumnDef]="rowActionIcon">
      <th mat-header-cell *matHeaderCellDef></th>
      <td mat-cell *matCellDef="let element" [id]="rowActionIcon" (click)="emitRowAction(element)">
```

### Column Templates
Each column consists of three parts: 

1. Unique name 
2. Content for header cell
3. Content for row cell

```html
<ng-container matColumnDef="ticket">
  <th mat-header-cell *matHeaderCellDef> Name </th>
  <td mat-cell *matCellDef="let ticket"> {{ticket.employeeName}} </td>
</ng-container>
```

### Row Templates
Add the following html inside of your `mat-table` div. Where place inside of `mat-table` div is not important. 

```html
<tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
<tr mat-row *matRowDef="let myRowData; columns: columnsToDisplay"></tr>
```

```ts
columnsToDisplay = ['employeeName', 'projectName', 'shortDescription'];
```

If a column is specified inside of the html, but not passed along to the `columnsToDisplay` array then it will fail. 
Test
