 Creating Code Owners 
=====================

GitHub is one of the most popular repository clients for pull requests.
As the team grows, it becomes impoerative that a default code review
workflow is set up. Creating a file lets you do this.

 What is a file? 
----------------

A file is a config file that's used with GitHub. It will allow you to
specify which GitHub user are considered as a code owner for a specific
project.

This person will be the default code reviewer for files that are pushed
into a particular branch. You can also set a target code owner for a
specific file type.

For example, if you have a dynamic team, you'll most likely end up with
a dynamic code base that can vary in language implementations. Part of
the team develops in Python, and the other half develops in JavaScript.
You can set the to target each language based on file extensions.

 How to create a file? 
----------------------

There are two places that you can create a file. The first is at the
root of your app. The second is at the .github folder at the root of
your repo. It's recommended that you set your file here. This allows you
to create webhooks if required.

Do create a file, use the following command:

      mkdir .github; cd .github; touch \codeowners{}

When you make a pull request within your GitHub app, GitHub will
automatically pick up on this file.

 Creating 
---------

Here's what your file can potentially look like:

    # Lines starting with '#' are comments.
    # Each line is a file pattern followed by one or more owners.

    # These owners will be the default owners for everything in the repo.
    *        @CharlieGreenman

 Creating Based on File Type 
----------------------------

    .js @CharlieGreenman

Now Charlie Greenman will be a code owner whenever a js file is a part
of a pull request.
