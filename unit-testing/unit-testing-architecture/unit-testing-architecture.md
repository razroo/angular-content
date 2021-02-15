---
title: Unit Testing Architecture
---

In any given UI application, the following should be considered as
appropriate architecture.

1.  Testing structure

2.  Assertion functions

3.  Generate, display and watch test results

4.  Generate and compare snapshots of component and data structures to
    make sure changes from previous runs are intended

5.  Provide mocks, spies, and stubs

6.  Generate code coverage reports

7.  Provide a browser or browser-like environment with a control on
    their scenarios execution

In the previous chapter we discussed using Jest for the large part of
our application. Jest should ideally be used across the app. The truth
is that Jest was built for a mono-repo. In particular, when it comes to
running parallel unit tests. In addition, the way the view shows only
the test of the component that has been updated.
