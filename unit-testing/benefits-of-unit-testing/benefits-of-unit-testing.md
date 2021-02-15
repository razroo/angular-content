---
title: Benefits of Unit Testing, TDD, and BDD
---

It truly makes sense for a definitive guide to deep dive into what the
benefits of unit testing would be. From a developer perspective:

1.  Give insight as to what unit testing should accomplish, so that a
    developer, can intuitively decide when appropriate to write a unit
    test.

2.  Give confidence to developer as to why they should write unit test.

From a management perspective, to help introduce unit testing, for those
that might be less inclined towards unit testing.

What is Unit Testing?
---------------------

A unit in a best case scenario, is a function that always gives you the
same result for a given input(pure function) Testing that unit, is to
make sure that the expected result happens when running that function.

Benefits of Unit Testing
------------------------

1.  Refactoring. Change code once, and see everything else is working.

2.  Focus(See TDD item \#2)

3.  Helps understand design of code working with(See TDD item \#3)

4.  Instant visual feedback that code works as expected.

5.  Documentation (See TDD \#4)

6.  Helps with code-reuse. Ability to re-use code and tests. Tweak tests
    accordingly.

7.  Testable code

    1.  Modular

    2.  Maintainable

    3.  Readable

What is TDD (Test Driven Development)
-------------------------------------

1.  Start by writing a test.

2.  Run the test, and any other tests. At this point, your newly added
    test should fail. If it doesn't fail here, it might not be testing
    the right thing, and has a bug in it.

3.  Write the minimum amount of code required to make the test pass.

4.  Run the test to check the new test passes.

5.  Optionally re-factor your code.

6.  Repeat from 1.

 What is BDD? 
-------------

Typcially when unit testing, a particular function at a later date can
change its implementation. For instance, if we have a counter function,
the counter can be changed to start at 5 instead of 0, breaking the
expect statement of 1.

In BDD we focus on the intended behavior, instead of the expected
result. The following is a great explanation:

 The Benefits of TDD 
--------------------

1.  Higher Test Coverage

2.  Focus

    1.  Focus one part of an issue at a time.

    2.  Allows one to realize when to stop coding.

3.  Interfaces. Allows you to think more organically about what should
    be put into interface. Allows for interface to be written bottom up
    (implementation, behavior) instead of top down (behavior,
    implementation).

What is BDD - Code Example
--------------------------

    // Non BDD
    describe('Counter', () => {
      it('should increase count to 1', () => {
        const counter = new Counter();

        counter.tick();

        expect(counter.count).toEqual(1);
      });
    })

    // BDD
    describe('Counter', () => {
      it('should increase count by 1 after calling tick', () => {
        const counter = new Counter();
        const expectedCount = counter.count + 1;

        counter.tick();

        expect(counter.count).toEqual(expectedCount);
      });
    })

 The Benefits of BDD? 
---------------------

If at a later time the counter(as seen above) has to change based on
requirements(starting at 5, instead of 1), it will not affect the unit
test.

What, When, and How
-------------------

Unit testing is the what, TDD is the when, and BDD is the how.
