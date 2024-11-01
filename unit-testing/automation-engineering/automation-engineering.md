---
title: Automation Engineering
---

In an ideal QA environment, there will be a QA team layered on top of
the backend and frontend team.

Their QA tests, however, will not be integrated into the environment of
the other teams. Instead they will be in their own environment and most
likely running their tests in two environments: dev and production.

In particular, they should follow something called smoke testing.

 Automation Engineering - The Cross Over 
----------------------------------------

Part of the question then becomes if automation engineering is creating
their own integration tests for your app, it is essentially a bunch of
E2E tests. So, why should UI go ahead and create their own tests, if QA
is already creating them? Here are a couple of answers:

1.  The earliest point in the lifecycle that QA will be able to test is
    in Dev. If UI Engineering does not create their own E2E tests, then
    failures in Dev, will then be sent back to UI, severly halting the
    workflow.

2.  Redundancy. There might be different parts of the app that
    engineering is uniquely acute to testing. In addition, there might
    be other parts of the app where QA might be uniquely equipped to
    test.

    For example, we were integrating uploading files in the app for the
    first time, as well as sending emails. Being the developer who
    worked with both, I was acutely aware of odd file size of some of
    the documents being uploaded was 0. So I did some testing to make
    sure none of the files has a file size of 0, and lo and behold, our
    app was riddled with them. That was something that QA would have
    never really thought of doing, simply because I had more access to
    the data.

3.  Discipline. I think that it is important for UI engineering to get
    into the discipline of how their work will affect the actual user
    experience. Having UI Engineering actually write some of those tests
    is important.

However, it really depends on your budget. If this is an app that is of
high impact, then I would say do it. However, if it is something which
your developers do not have time for, then I would say it is
understandable. That being said, the following would be the limited
crossover workflow in order for this budget friendly process to work.

Limited Crossover Workflow
--------------------------

### Step \#1

You are going to need a way to hook up automation engineering into your
actual dev environment, and run those tests as a part of your actual dev
environment. Keep in mind, this will make build times expensive,
however, once again, it is for budget reasons.

### Step \#2

Make sure to loop QA into any concerns with the app you have. For
instance, things that you've noticed the current QA tests do not cover,
that you have noticed is an actual issue.

### Step \#3

Make sure to integrate automation tests within the CI/CD pipeline that
you have. This means it will not fail when any of the E2E tests fail.

Regarding this last step, it is important that you optimize your tests
so that they run in parallel. In addition, it will have to be a watered
down version of integration tests. For instance, using Sauce Labs, for
screenshots, as well as putting on multiple devices might be a bit
cumbersome.
