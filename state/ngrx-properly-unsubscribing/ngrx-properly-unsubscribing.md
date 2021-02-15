---
title: State Management - Properly Unsubscribing
---

In Angular, when using ngrx when trying to pull in data, using the async
pipe is the preferred approach. It will handle both the subscribe and
the unsubscribe from the observable pipe for you.

    <div>{{ observableStream$ | async }}</div>

 What to do When Async Pipe is Not an Option 
--------------------------------------------

There are times When the process of subscribing and unsubscribing must
be managed manually. In particular in situation where there is data
manipilation that must happen within the component. In this case the
recommended approach is to create an observable that emits when the
component is destroyed, and use the rxjs takeUntil operator to handle
the act of unsubscribing for you.

Using takUntil Example
----------------------

    import { Subject, Observable, pipe } from 'rxjs';
    import { takeUntil } from 'rxjs/operators';

    import { MyService } from './my-service';

    @Component({
      selector: 'my-component',
      template: `
        <div>
          Count: {{ count }}
        </div>
      `,
    })
    export class MyComponent {
      private destroy$ = new Subject();
      count: number;

      constructor(private myService: MyService) { }

      ngOnInit() {
        this.myService.observableStream$
          .pipe(takeUntil(this.destroy$))
          .subscribe(count => this.count = count);
      }

      ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
      }
    }

takeUntil in Depth
------------------

Let's go back in depth to takeUntil to see what we are doing:

    private destroy$ = new Subject();

We are create a subject which, of course, acts as both an observer and
an observable. It allows us to call next and complete. We can then pass
the value of true to next:

    ngOnDestroy() {
      this.destroy$.next(true);
      this.destroy$.complete();
    }

Which is called when the component is destroyed. We then run takeUntil,
which will unsubscribe as soon as it is passed a true value.

    .pipe(takeUntil(this.destroy$))
