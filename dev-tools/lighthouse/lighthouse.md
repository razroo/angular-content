 Lighthouse 
===========

Lighthouse is a framework agnostic that allows you to audit web pages.
Although it's created to be framework agnostic, it's an integral part of
the Angular ecosystem.

It is one of the most powerful tool for auditing websites.

In particular, it is especially powerful for auditing the following:

1.  SEO

2.  Performance

3.  accessibility

4.  progressive web apps

Here is an example of what lighthouse looks like:

\[insert image here\]

My Concern with Lighthouse
--------------------------

Lighthouse is open-sourced and automated for improving the quality of
web pages. However, it works on periodic checks. However, while
continuous integration (CI) is available, it's not pushed heavily by the
community. Despite this, Lighthouse should still be used for analysis
and performance bench marking.

Using Lighthouse CI
-------------------

The Lighthouse CI is split into two different parts:

1.  Lighthouse Node CLI -

2.  Lighthouse Node Server -

Using the Lighthouse Node CLI
-----------------------------

### Install the Lighthouse Node CLI

    npm install -g @lhci/cli
