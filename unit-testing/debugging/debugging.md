---
title: Debugging
---

Debugging in any development environment is a necessity. When it comes
to unit testing, sometimes a unit test will not pass and will be a bit
difficult to decipher why.

I would like to present the following strategy to greatly expedite the
process of debuggin when you find yourself going against a unit test
that is taking longer than expected.

 A winning Combo 
----------------

There are two pieces to debugging Unit Tests that will allow you to
debug unit tests with ease. One of them is to create smaller modules
whenever possible. This will allow you to unit test specific modules
using:

```bash
ng test --project user --watch
```

Now you will have a window that is open with the ability to debug that
only runs unit tests for the specific module.

 Opening Source 
---------------

The simplest solution to start debugging would be to open up the
inspector. Click on source, add a debugger for the particular function
that you are looking for, and re-run the page. This will cause the page
to then pause on the function you are trying to test.

 Turning Off Source Map 
-----------------------

The specifics with regards to how Angular works, it can be advantageous
to turn off the source map. The following is the syntax on how to turn
off the source map for angular:

Output inside regular karma browser window will now give enough
information, and the window will give enough information. Zone.js,
Karma, and unit tests, the special reason as to why something might not
work, might be obfuscated by zone. To alleviate this we have the ability
to turn source map off.

```
ng test --project=px-illustrator --source-map=false
```

Source map might seem like a bad idea, but by keeping if off in general
while developing would allow us to make sure we see all the errors that
we need to see.
