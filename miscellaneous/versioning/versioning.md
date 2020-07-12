 Versioning 
===========

*A thank you, to a one Chris Bautista and Bobbie Barker for helping me
formulate this strategy.*

 Git 
----

You should be using Git for version control. Just to re-iterate the
benefits of [Git](https://git-scm.com/), are as follows:

1.  Isolated Environments - I.e. every developer on your team works on
    the code base without affected others.

2.  Pull Requests - Allows other developers to approve your code before
    officially being merged in.

3.  Faster Release Cycle - Stability, distribution, pull requests, and
    community is streamlined.

Git should play as a foundation piece in your application. In addition,
such a thing as Git architecture exists, especially within the context
of an Angular application. Let's dive into that now.

 Integration with JIRA 
----------------------

In any JIRA ticket, if you have the proper webhooks setup with Github,
or if one is using BitBucket, then it will automatically hook up the
commit into the ticket as a comment. All that is necessary is for the
the commit message to include the ticket name. While this might not seem
like architecture, in the sense of coding this is actually the point of
Git. It allows an immediate hook from your agile workflow into your
version control by using the concept of feature branches. But first, you
need to make sure you have this integration set up.

 Branching Name Convention 
--------------------------

Understanding the different types of branches is equally just as
important. In addition, what a branch name can accomplish. More
specifically a Git branch can:

1.  Inform the developer about the type of branch. These are:

    1.  feature

    2.  hotfix

    3.  bugfix

    4.  refactor

    5.  cleanup

    6.  e2e

2.  Inform the developer of ticket being worked on.

3.  Inform the developer of abstract of ticket.

Let's imagine our project is called . We have a ticket called PIXE-113,
which is responsible for adding a pixel color picker to our Pixel
Illustrator app. We would create our branch as following:

      feature/PIXE-113-details-and-actions

1.  is issue type, all lowercase, followed by forward slash.

2.  is the name of ticket in all caps, followed by a dash

3.  details-and-actions is abstract of ticket.

Now, anyone looking through the current branch, can immediately find out
the intent of the branch.

 Git Client 
-----------

When it comes to using an IDE, every team member should have the freedom
to use whatever they want. They should also feel comfortable in using a
client if they would like. However, I personally prefer using the
terminal. With regards to Git, I truly do feel it is what will
ultimately let you work most efficiently.

 Fork and Pull Workflow 
-----------------------

There are numerous different Git workflows, however, the one I think is
ideal is a Fork and Pull Workflow. Your workflow will evolve on time,
but this core will not change, and therefore I can confidently suggest
it within this book. The workflow I am going to suggest is the fork and
pull workflow. I am going to lightly describe what it is and its
benefits.

### What is a Fork and Pull Workflow

A traditional git workflow is that each developer shares the same
repository, it's just that they have different branches. In a fork and
pull workflow, developers in addition to having their own branch, also
have their own repository.

### Benefits of a Fork and Pull Workflow

1.  Allows for a single maintainer to accept commits from any developer
    without giving them write access to the official codebase.

2.  No need to clean up git branches, as it is on each user's local
    repository.

3.  Promotes developers to contribute to open source, being that this
    pattern is the defacto for open source projects.

4.  A hidden one that I found myself doing, is doing side projects
    without worrying about it cluttering the main app.

5.  If using a Mono Repo architecture, a fork and pull workflow is
    absolutely neccesary. At Razroo, we think a Mono Repo architecture
    is ideal, and have seen first hand, how it alleviates many things.

At Razroo, we use a Fork and Pull workflow, even when using private
repositories. It allows for a cleaner workflow, and works better
especially within a mono repo setting. Something we aspire to one day.

###  Setting up a Fork and Pull Workflow with Github 

With Github, setting up a Fork and Pull workflow is as simple as:

1.  Clicking on the fork button.

2.  Clone your forked repo.

3.  Sync repo with upstream

        git remote add upstream {forked from repo goes here}

    Now whenever you would like to pull from upstream dev branch can
    simply do:

        git pull upstream dev   

4.  push to your branch as usual

5.  Pull branch from forked repo, while in original repo

Trunk Based Development
-----------------------

 Squash and Merge 
-----------------

Github is our preferred versioning client. However, git itself, as well
as all other major 3rd party vendors, give the option to squash all
other commits before merged. Some will offer the option to re-base as
well. However, our recommended approach is to squash and merge, so you
can maintain the integrity of the commits that happened along the way.

Ending Off
----------

So there you go, the next time your team is wondering about what
standards they should follow for Git, show them this. In the next
chapter, we are going to discuss, a proper Git workflow - that is,
master, dev, and test.
