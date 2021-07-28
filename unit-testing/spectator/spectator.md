---
title: Spectator for Unit Testing
---

There are many quirks that surround angular unit testing. Let us assume
we have a very basic unit test:

```typescript
import { TestBed, async, ComponentFixture} from `@angular/core/testing';
import { ButtonComponent } from `./button.component';
import { Component, DebugElement } from `@angular/core';
import { By } from `@angular/platform-browser';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let instance: ButtonComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    debugElement = fixture.debugElement;
    instance = fixture.componentInstance;
  });

  it('should set the class name according to the [className] input', () => {
    instance.className = 'danger';
    fixture.detectChanges();
    const button = debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.classList.contains('danger')).toBeTruthy();
    expect(button.classList.contains('success')).toBeTruthy();
  });
});
```

This sample unit test has a quirk that is specific to Angular. Each time
we have to go ahead and create a TestBed, as well as a fixture, and
include the component.

## Eliminating ##

If we were to use spectator we can do the following:

```typescript
import { ButtonComponent } from `./button.component';
import { Specator, createTestComponentFactory } from `@angular/core';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent;
  const createComponent = createTestComponentFactory(ButtonComponent);

  it('should set the class name according to the [className] input', () => {
    spectator = createComponent;
    spectator.setInput('className', 'danger');
    expect(specator.query('button')).toHaveClass('danger');
    expect(specator.query('button')).not.toHaveClass('success');
  });
});
```

Using Spectator we no longer have to create a Testbed and a fixture.
Spectator will handle all of these things behind the scenes. We are able
to use the toHaveClass method to check if a class exists.

## Triggering Events ##

```typescript
describe('Highlight Directive', () => {
  let host: SpectatorWithHost<HighlightDirective>;

  const createHost = createHostComponentFactory(HighlightDirective);

  it('should change the background color', () => {
    host = createHost(`<div highlight>Testing Hightlight Directive</div>`);

    host.dispatchMouseEvent(host.element, 'mouseover');

    expect(host.element).toHaveStyle({
      backgroundColor: '#fafafa'
    });

    host.dispatchMoustEvent(host.element, 'mouseout');

    expect(host.element).toHaveStyle({
      backgroundColor: '#ffffff'
    });
  });
});
```

Spectator greatly simplifies how we handle event handling within
Angular.

## Testing Services ##

Spectator greatly simplifies the way we can go ahead and test our
services as well. Instead of having to create a TestBed that includes
the service, we can simply do the following:

```typescript
describe("AuthService", () => {
  const spectator = createService({
    service: AuthService,
    mocks: [DateService]
  });

  it("should not be logged in", () => {
    let dateService = spectator.get<DateService>(DateService);
    dateService.isExpired.and.returnValue(true);
    expect(spectator.service.isLoggedIn()).toBeFalsy();
  });
});
```

Using spectator, we are able to apply mocks. We can reference the mock
service, and return a value, as spectator treats all values as if they
are spies.

## Testing Components With Custom Host ##

Spectator also has the ability of greatly decreasing code needed to
create a host element

```typescript
@Component({ selector: 'custom-host', template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent';
}

describe('With Custom Host Component', function () {
  let host: SpectatorWithHost<ZippyComponent, CustomHostComponent>;

  const createHost = createHostComponentFactory({
    component: ZippyComponent,
    host: CustomHostComponent
  });

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`);

    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent');
  });
});
```

By using spectator, we have the ability to create a custom host
component on the fly. Without using spectator, this process is very
difficult to do so.
