---
title: Visual Unit Tests with Cypress
---

Unit testing is great until something changes. The current issue with
writing traditional unit tests is you miss out on the point of front end
development - to create experiences for the end user.

While unit tests may do very well in determining if an input produces an
expected output, it only captures moment in time rather than a complete
flow of actual events. This is where Cypress excels, especially in the
end-to-end space.

e2e is easier to validate a user's experience and their interaction with
an application. This makes it a good supplement to existing unit tests.
While larger enterprises may have their own QA teams, e2e tests at the
developer level makes coding driven by design rather than an additional
checkpoint at the end.

Performance wise, it is easy to implement and has the potential to run
tests in parallel, meaning that multiple scenarios and outcomes can be tested
simultaneously with auto reloading and snapshots for developers to debug
if such an event should arise.

Cypress has solid documentation with event driven language for their
syntax, making the task of writing tests more akin to actual user flows
and potential interactions than just testing x and y. The visual nature
of Cypress differentiates it from other unit testing and e2e suites
currently available, giving the developer the ability to visually check
the user experience with DOM state snapshots and historical contexts
against different executions.

This makes Cypress a powerfully easy tool to use and lowers the bar of
entry significantly for developers wanting to drive their development
efforts with tests, catching bugs before they morph into something too
big.

## How to use Cypress with Nx ##

Before we proceed, Nx stands for Nrwl Extensions for Angular and is
built by a team of ex-Google employees who were also part of the Angular
core team. Nx isn't a replacement of the Angular CLI and instead extends
it.

Nx sits on top of the CLI and works to give your application access to
features and functionality currently not available in the CLI. It has
the ability to create work spaces, along with applications and
libraries, thus expanding the CLI's capabilities.

So how do we use Nx with Cypress? and why should we?

Using Cypress with Angular CLI is possible but there is a lot of manual
set up required. Nrwl Nx solves this problem by creating streamlined
experience that pre-configures all you need for Cypress to work.

To use Nrwl Nx, you'll need to install it using the following command in
your console:

```bash
npm install -g @nrwl/schematics @angular/cli
``` 

After this has installed, you'll need to create a workspace using
create-nx-workspace command:

```bash
create-nx-workspace example-app --e2e-test-runner=cypress
```

This will give you a series of questions before creating your workspace.
If you select Angular in the question that asks 'what to create in the
new workspace', it will begin to set everything up for you.

Nx will create a folder called example-platform and inside this folder -
there will be an apps folder.

In this apps folder, you will find an empty Angular project and a
Cypress ready e2e test unit.

Nx also supports React, so React developers are not left out from this
out of the box set up.

For Angular, to run the testing suit, be sure to navigate into the
workspace folder and use the command below:

```bash
ng e2e --watch
```

The --watch flag lets you write you tests in the background and Cypress
automatically detects any changes in the test or application code and
runs itself against the changes.

## Example usage and cases ##

###  Accessing store 

Cypress is able to test a multitude of front end frameworks and
libraries, Redux being one of them. By using if
(window.Cypress)window.store = store inside your src/index.js, you are
exposing the store when the application is run inside Cypress' browser.
Now inside your test file, you can test the store's state through
cy.window(). Here's an example of accessing a list store and testing if
it has a specific item.

```typescript
it('has expected state on load', () => {
    cy.visit('/')
    cy.window()
        .its('store')
        .invoke('getState')
        .should(
        'deep.equal',
        { list: [ { text: 'by apples', } ] }
        )
})
```

###  Button Clicked ###

Attaching a data-cy attribute to a button exposes the item for testing
by Cypress. While this is not necessary as it can be accessed through
classes, it is not recommended as it can result in the wrong object
being targeted. data-cy therefore makes certain for Cypress that it is
testing the right thing.

For example, your HTML button code may look something like this:

```html
<button id="main" class="btn" data-cy="submit">
    Submit Me!
</button>
```

To create a test to check if the button is clicked, your Cypress test
code may look something like this:

```typescript
cy.get('[data-cy=submit]').click()
// OR
cy.contains('Submit Me!').click()
```

###  modal should appear when button is clicked ###

We all get given business and design rules to help us build our
applications. It may read something like this: Modal should appear when
button clicked, and should have drop down data, but should not have
field available, if x data is not available.

To translate this into a Cypress test unit, your code may look something
like this:

```typescript
cy.get('[data-cy=submit]').click()
    cy.window()
    .its('store')
    .invoke('getState')
    .should(
        'deep.equal',
        { list: [ { text: 'by apples', } ] }
    )
cy.get('[data-cy=user-modal-dropdown]').click().contain([{text: 'by apples']);
```

## Potential issues when using Cypress ##

The concept of code coverage refers to the percentage of code that is
covered by my automated tests. Purity of test types may get muddied and
percentage of test coverage may reduce over time when teams begin to mix
and math e2e with unit tests.

The coverage therefore gets thinned over time and may leave pockets
untested as a result. Certain pipelines may only pass a project to the
next stage if it passes a percentage of test. Tests, that may not
account for e2e results or are exclusively e2e.

Another potential issue is that test hooks have the potential to muddy
up the final production code. The idea of hooks is to keep the main code
state untouched and independent from actions that are trying to observe
events, inputs, outputs and outcomes.

## Extended Features ##

Cypress' test runner is MIT open sourced and free. However, it does have
a commercial side to it and offers a Dashboard service allows you to
centralize your tests and enable continuous integration at a team level.
This differs from the test runner which only runs on your local machine.

There is a free Seed tier that currently allows for up to 3 users and
500 test recordings. As you move up through the plans, the level of
support, users and number of test recordings increases.

## Final words ##

Cypress as a testing tool differs from all other testing tools,
frameworks and assertion libraries because it offers front end
developers a way to test their applications that is driven by user
experience.

Creating unit tests can be a dry process but Cypress brings the fun and
beauty of creating visuals without having to manually click the buttons
yourself every time to test if something worked. The DOM snapshots makes
for fantastic debugging and the concise, yet information rich,
documentation also helps in the learning process.

Setting up is quick and it doesn't take long at all to get started on
Cypress.
