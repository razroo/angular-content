---
title: Writing E2E Tests
---

In addition to our Unit Testing, another very important element of our
app is End to End Testing. We have discussed in the previous chapter how
automation engineering is an integral part of this chapter. In addition,
we discussed how when automation engineers are brought into the picture,
it might be superfluous to have end to end testing. Nonetheless, I am a
fan of having UI Engineers write their own E2E tests within the app.

 Angular CLI 
============

The Angular CLI will create out of the box a e2e folder that can be used
for creating e2e tests. It can be run with:

      ng g e2e

If you have an npm script within your app, run:

      npm run e2e

This will work as well. Follow the steps through. Usually, the only
thing that will be needed from your end, is downloading the
chrome-webdriver needed for running the e2e tests. Suprisingly, there
aren't actually any ways of generating an e2e test from within your
angular cli.
