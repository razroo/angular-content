---
title: PWA Toolset - Sauce Labs
---
## The Value of a Continuous Testing Cloud?

As we have mentioned in the chapter for physical devices, we have quite
a bit of different platforms to work on. Ideally, we want an environment
that we can set up with E2E test as well as integration tests, and then
run on all environments.

This is on top of the physical devices we already have.

The idea of physical devices is as follows: to have a real time update
of all edits being done in your local environment, so that you can go
ahead and have a continuous local development environment.

The idea of a continuous testing cloud, is to be able to check that all
devices and browsers are being properly tested on. This will work
strictly with one's e2e tests.

## Bring it to the Table - Why We Chose Sauce Labs

At this point in time, there are really two main competitors, when it
comes down to continuous cloud computing:

1. Sauce Labs
2. BrowserStack

Before we go into the above, end test which is a fantastic up and comer,
is unfortunately a victim of it's own business model.

While allowing users to create simple version of tests, it also locks in
users to its platform. There is no way of exporting these tests, and it
makes it a very uncomfortable place for many enterprises.

## Sauce Labs

![image](pwa/pwa-toolset-sauce-labs/logo-sauce-labs) vs.
![image](pwa/pwa-toolset-sauce-labs/logo-browserstack)

The competition for BrowserStack vs. Sauce Labs is pretty stiff. They
have many of the following similar features:

1. Platform
2. Languages Support
3. Framework
4. Support
5. Browser Release Support
6. Browser Support

However, the following are the reasons why we believe Sauce Labs is the
better choice. Sauce Labs has quite the roster of large clients, and
it's fantastic documentation shows. In addition, because Sauce Labs is
widely used, we are able to find better community support. Channels such
as StackOverflow for a specific quirk.

## How to use Sauce Labs