---
title: Unit Testing the DOM
---

The DOM is the a variable within front end development that complicates
the unit testing process. While it is in the process of becoming more
stable, it can be difficult to unit test and can make TDD more
difficult.

It is very much important to do and can also be expensive from a unit
testing perspective. A unit test will run much slower if it has to
interact with the DOM. So this is something to take into consideration
as well.

DOM unit testing refers to a couple of scenarios:

1.  Event Handling.

2.  Element is visible, or hidden.

3.  Element contains certain text, or that text properly transformed.

These three are the major types of DOM unit testing that occurs. There
is much more to unit test from an E2E perspective. Determining whether
or not an element is visible, or hidden, and whether it contains text,
is better handled by Cypress.

 Selecting element 
------------------

In an Angular setting, the most important of all testing utilities is
the Angular TestBed. The TestBed creates a dynamically-constructed
Angular test module, that emulates an [^1]. It allows you to swap out
any piece that was included in the component, for testing purposes and
then to reference that swapped out piece.

Using the testBed, we are also able to create a fixture which we can
reference to target the nativeElement. We can then use the querySelector
on the nativeElement, to target our element. Let's go back to the one
use case we would like to target. That is, when an event is triggered,
we would like to make sure a particular function is called.

In each scenario, we would like to make sure that once a filter is
clicked on, the appropriate filtering function is called.

```typescript
it('should call the appopriate function when filterToggle element' +
'is clicked on', () => {
  spyOn(component, 'filterUsers')
  const filterToggle = fixture.nativeElement.querySelector(
    '.filter-toggle'
  );
  filterToggle.click();
  expect(component.filterUsers).toHaveBeenCalledWith(component.id);
});
```

First, we are spying on the filterUsers method for our component. Next
we are using the querySelector to target the .filter-toggle html class
(assuming there is only one on the page). Moving on, when clicked on
again, we want to make sure that the appropriate function is called.

We have now completely through the power of unit testing, determined
whether, or not an element is going to show up.

 Unit Testing - Determining Text 
--------------------------------

With regards to text, let's say that we want to test the entire
component at a specific time period, and want to make sure it contains
three different words:

```typescript
it('should show buyer company names', () => {
  expect(fixture.nativeElement.innerText).toContain('Apple');
  expect(fixture.nativeElement.innerText).toContain('Microsoft');
  expect(fixture.nativeElement.innerText).toContain('Google');
});
```

Text might seem intuitive. However, there is the option to target text
at different areas of time, and to make sure what one is looking is the
correct format at a given time. Doing something like this takes
experience to get it right. However, assuming you didn't know
beforehand, you now know that you have the option to target text at a
specific time.

As we mentioned, text and whether, or not an element is hidden, might be
better handled by Cypress. However, just in case you want to see it for
yourself, the above is a great example.

[^1]: https://angular.io/guide/testing\#testing-services-with-the-testbed
