---
title: Benefits of Jest Over Karma
---

Pros

1.  Faster

2.  Snapshots

3.  Mocking

4.  Well-Maintained

5.  Dev-Ergonomics

6.  Same framework for node backend and frontend

7.  Same framework for Angular and React

Cons

1.  No browser-specific bugs can be discovered with it

2.  Unfamiliar Debugging

One of the reasons for not using Jest, might be because you want to use
Karma tests. However, in some situations, the way that the tests are
written, is that it would make it very difficult to run them in
parallel. In addition, it might be difficult to convert tests from karma
over to Jest. For 3000 tests, it might take a couple of days to move it
over to jests.

Plan of action, we might have the option to only write jests tests, and
then move over to karma, after writing for a month, and being used for
the tests.
