---
title: Angular Observables
---

There are observables that are unique to Angular.

 Event Emitter 
--------------

    <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>

    @Component({
      selector: 'zippy',
      template: `
      <div class="zippy">
        <div (click)="toggle()">Toggle</div>
        <div [hidden]="!visible">
          <ng-content></ng-content>
        </div>
      </div>`})

    export class ZippyComponent {
      visible = true;
      @Output() open = new EventEmitter<any>();
      @Output() close = new EventEmitter<any>();

      toggle() {
        this.visible = !this.visible;
        if (this.visible) {
          this.open.emit(null);
        } else {
          this.close.emit(null);
        }
      }
    }

 Async Pipe 
-----------

    @Component({
      selector: 'async-observable-pipe',
      template: `<div><code>observable|async</code>:
           Time: {{ time | async }}</div>`
    })
    export class AsyncObservablePipeComponent {
      time = new Observable(observer =>
        setInterval(() => observer.next(new Date().toString()), 1000)
      );
    }

The async pipe will subscribe to an observable or promise and returns
the latest value it has emitted. When new value has been emitted, the
pipe marks the component to be checked for changes.

 Router 
-------

### Events

Router events are supplied as an observable. So lets say we want to
listen in into when a router event has reached a certain point we would
be able to do that.

    import { Router, NavigationStart } from '@angular/router';
    import { filter } from 'rxjs/operators';

    @Component({
      selector: 'app-routable',
      templateUrl: './routable.component.html',
      styleUrls: ['./routable.component.css']
    })
    export class Routable1Component implements OnInit {

      navStart: Observable<NavigationStart>;

      constructor(private router: Router) {
        // Create a new Observable that publishes only the NavigationStart event
        this.navStart = router.events.pipe(
          filter(evt => evt instanceof NavigationStart)
        ) as Observable<NavigationStart>;
      }

      ngOnInit() {
        this.navStart.subscribe(evt => console.log('Navigation Started!'));
      }
    }

###  ActivatedRoute 

`ActivatedRoute` \"contains the information about a route associated
with a component loaded in an outlet.\" Specifically, one of the pieces
of information that the `ActivatedRoute` injected router service
provides is `ActivatedRoute.url` which is provided as an observable.

    import { ActivatedRoute } from '@angular/router';

    @Component({
      selector: 'app-routable',
      templateUrl: './routable.component.html',
      styleUrls: ['./routable.component.css']
    })
    export class Routable2Component implements OnInit {
      constructor(private activatedRoute: ActivatedRoute) {}

      ngOnInit() {
        this.activatedRoute.url
          .subscribe(url => console.log('The URL changed to: ' + url));
      }
    }

Using the above observable, we are able to determine what the url is at
any given time.

 Reactive Forms 
---------------

Reactive forms is another core Angular library that makes use of
Observables. In particular, the `FormControl` `valueChanges` property
contains an observable that determines whenever an event occurred.

    import { FormGroup } from '@angular/forms';

    @Component({
      selector: 'my-component',
      template: 'MyComponent Template'
    })
    export class MyComponent implements OnInit {
      pxForm: FormGroup;

      ngOnInit() {
        this.logNameChange();
      }
      logNameChange() {
        const rowControl = this.pxForm.get('name');
        rowControl.valueChanges.subscribe(data => {
          console.log('data');
          console.log(data);
        });
      }
    }  

Using valueChanges in the context of formControl can be incredibly
useful. There might be special effects, or some sort of hurdle you need
to come across when building out this form, and it helps very much so in
this regard.

What is the Point of this??? 
-----------------------------

You might be asking yourself, what is the point of knowing specifically
that there are observables that are baked into the framework? It would
seem one would be able to just read up on the documentation, and be able
to get done what you need in that fashion. What value is there in
organizing all of the Angular observables into one location?

Here are four scenarios:

1.  Event Emitter

2.  Async Pipe

3.  Router

4.  Forms

If something has an observable it means:

1.  Level of complexity is higher

2.  Subject to change, and needs higher level of architecture

3.  Interacts with data heavily outside of component instantiation
