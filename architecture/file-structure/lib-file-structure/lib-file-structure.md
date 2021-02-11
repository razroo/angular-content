---
title: Lib File Structure
---
 Lib File Structure 
===================

When working in a monospace repo, file archticture is very important. It
allows for different parts of an application tend to be abstracted.
First let's outline the different potential parts of an Angular
application.

\[libs \[common \[animations \] \[assets \] \[core \[auth\] \[guards\]
\[pipes\] \[validators\] \] \[models \] \[testing \] \[ui \] \[utils \]
\[styles \] \[vendor \] \] \]

 Lib File Structure in Detail 
-----------------------------

### Animations

Animations are where any common animations might go. Things such as
ripple effects, ghost elements, etc. Animations are really a whole
different science when it comes to development, and therefore makes
sense for them to have their own folder.

###  Assets 

This is where commonly re-used assets, such as icons, or logos are used.

###  Core 

Any piece of functionality that is re-used the app is used here.

###  Models 

This is where interfaces used across the app are used. This will simply
type annotations across the app. In addition, when using a place to
reference the full capacity of data requests within app, this model will
be a life saver.

###  Testing 

All data mocks that are common, can go here as well. Data tends to be
re-used many different times within different parts of apps. So ideally,
all mocks should go here.

###  UI 

All presentation based components go here. Some examples of might go
into an example app is a header, footer, loading spinner, or charts.

###  Utils 

Shared services used across different apps. For instance, dates.

###  Styles 

Any shared styles used across app, for instance spacing, media queries
etc.

###  Vendor 

The vendor folder is used to customized 3rd party libraries. Some
libraries customized might include Angular Material.
