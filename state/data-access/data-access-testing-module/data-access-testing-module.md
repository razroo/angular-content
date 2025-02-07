---
title: Data Access Testing Module
---

In the data-access chapter we discussed the value of coupling all of our files
in the same folder. One of the main values we discussed is that it allows us
to uniquely test our state withing a specific folder. This chapter goes deeper
into how we can further capitalize on having a testing module.

## Creating a Facade Mock File
Within our archticture, we haviliy suggest using the facade pattern within
our data-access archticture. It allows us to have all elements of our state feed
into a single file. In is particular useful when it comes to mocking, as it
means that for all of our state, we only need to create a single file.

### A Quick Example of our Facade File
Let's say we had a really simple facade file:
```ts
// code-box.facade.mock.ts

import { getCodeBox } from 'code-box.selectors';
import { CodeBoxModelState } from 'reducer';

@Injectable()
export class CodeBoxFacade {
  codeBox$ = Observable<CodeBox> = this.store.pipe(select(getCodeBox));

  constructor(
    private store: Store<CodeBoxModelState>,
  ) {}

  loadCodeBox(id) {
    this.store.dispatch(new LoadCodeBox() {id});
  }
}
```

Here we have a stream named codeBox\$, which takes in an observable of
getCodeBox. We also have a method called loadCodeBox. If we ever want to use
these methods in an actual component, our unit tests will fail. We might use
this in numerous scenarios. It would be easy if we could solve two issues:

1. Create a Mock for our facade file
2. Create a testing module that we can simply include for our unit tests

## What our Facade Mock File Looks Like
```ts
// code-box.facade.mock.ts

export class MockCodeBoxFacade {
  codeBox$: Observable<CodeBox[]> = of([{ ...codeBoxMock }]);

  loadCodeBox(id) {}
}
```

Notice that here in the mock, as mocks should be, we create the simplest
functional version of our facade file. This solves issue #1, of creating a mock
for our facade file.

## Creating a Testing Module for Re-Use
Now that we have our facade mock file, let's include it into a module, so that
we can re-use it across our angular application.

```ts
import { NgModule } from '@angular/core';
import { CodeBoxFacade } from './+state/code-box.facade';
import { MockCodeBoxFacade } from './+state/code-box.facade.mock';

@NgModule({
  providers: [
    {
      provide: CodeBoxFacade,
      useClass: MockCodeBoxFacade,
    },
  ],
})
export class PxIllustratorDataAccessCodeBoxTestingModule {}
```

Here, we have a very simple testing module, that only creates a provider for our
CodeBoxFacade, so that it uses the MockCodeBoxFacade.

It is once again tempting to be in shock, that we have a very simple
module, but it is important to keep in mind, that due to our architecture, our
state is intentially feeding into a singular file. If anything, this module
is once again showing off how simple our architecture is.

## Using our Testing Module in a Component Spec

```ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import {
  CodeBoxFacade,
  PxIllustratorDataAccessCodeBoxTestingModule
} from '@px/data-access/code-box';
import { CodeBoxComponent } from './code-box.component';

describe('BuyerBidDetailsComponent', () => {
  let component: CodeBoxComponent;
  let fixture: ComponentFixture<CodeBoxComponent>;
  let codeBoxFacade: CodeBoxFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PxIllustratorDataAccessCodeBoxTestingModule,
      ],
      declarations: [CodeBoxComponent],
    }).compileComponents();

    codeBoxFacade = TestBed.get(CodeBoxFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
```

Here we have created a bare minimum example, of how our CodeBoxComponent would
look like, if we decided to include the CodeBoxFacade. It would error out in
our unit tests, and we would be able to include our testing module, it order to
solve all errors.

## When Not to Use a Testing Module
A testing module is not ideal in all scenarios. In certain situations, the
use cases for what we are doing with the data for the particular facade might
be complex. An example of this might be, if we are passing in data, and
comparing that id against the data of another set of data.
