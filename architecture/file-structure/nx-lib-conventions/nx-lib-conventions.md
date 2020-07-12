 Nx Lib Conventions 
===================

 Why is an NX Workspace different than an NPM Repo?! 
----------------------------------------------------

One of the difficult things when starting with an Nx workspace for the
first time is comparing it to an NPM repo. One may ask, why is it
different than an actual NPM repo?

1.  All code in the lib can be modified by any one person in the
    ogranization, as opposed to an NPM repo. It is therefore cheaper,
    and faster.

2.  There is no need to upgrade dependencies. Editing and updating a
    lib, will automatically affect all apps.

3.  It is cheaper to create a lib, as opposed to creating a new NPM
    package. No need to set up a CI/CD, or otherwise.

 Put Everything into Libs 
-------------------------

Everything should be put into Libs.

Note: Todo - The following are the different types of libs that should
be put into app.
