Introduction
============

The current landscape of UI development is in an interesting place. The
capacity of web based technologies performing tasks that were previously
unavailable is growing by the year.

In addition to this, frameworks and libraries are popping up to enable
further scalability, DRY development, and structural consistency. In
your average web application, these features include the ability to type
check, unit test, integration test, manage states, observables, effects
- among many more things.

These things may seem like they've been around forever, but it's only
been approximately 3 years. As more features from other programming
languages move and become available in JavaScript, the expansion of
potential uses and ability for developers to creatively implement
features expands in proportion, if not more.

Angular is one of the major frameworks that leverages these developments
significantly. While others such as Elm, Vue, React, and Cycle exists -
Angular specializes in consistency, which in turn increases a
developer's productivity and advocates for team based projects.

Angular, in my opinion, has the most robust command line, in addition to
cohesive methods in styling components, folder structure, routing,
observables, state management and clear type checking.

The framework is robust and trustworthy, making architectural decisions
faster to implement. Layering with other libraries and frameworks is
possible and highly accessible.

This book is part of a bigger picture and I've chosen Angular as the
first jigsaw piece because of its stability, large community support and
overall consistency in its delivery.

The issue with many technical books is that the reader often walks away
feeling like they've hardly scratched the surface. I've been that reader
before. The Full Gamut is the result of everything else that no one
covers. It's the years of personal research, experimentation, and
commercial implementation.

It's not hard to watch or follow along to a tutorial - but when it comes
the actual work, many new developers are left scratching their heads.

This book is different. This book will cover everything else that all
the other tutorials and books gloss over - or touch on at all.

There is also a QR code that links you to the latest commit, linked to a
Stackblitz that allows you to simultaneously follow along while reading
this book. You'll also have access to the entire book whilst having the
ability to use the content as technical referencing.

In this Full Gamut, we will be building a sample application that will
utilize knowledge points that will are highly transferable to real and
commercial projects. We won't be building your usual to-do list. No.
We're going to make something much cooler.

We're going to be building a pixel illustrator.

The skills you learn here will stack up and you'll walk away knowing
things no other book teaches in such an explicit fashion. In addition to
this, you'll also be exposed to Angular best practices and get a bigger
scope and understanding of what Angular can actually do.

Conventions will be sprinkled into the book. It's good to note that
conventions, in general, sits on a wide spectrum. Its implementation is
a debatable matter and rests on the nature of your actual project.

From an architectural perspective, they are equally as important as best
practices. Choosing the right fit can save days of unnecessary
re-factoring.

When it comes to learning, there are three parts within the cycle:

1.  Discovery

2.  Maintaining

3.  Learning

The aim of this book is to allow you to hit on all these three areas.
Repetition with slight adaptation is key to turning short term knowledge
into long term understanding. That is why I'll repeat certain steps and
refer back to previously introduced content to help you move through the
cycle of learning.

Some might consider the suggestions and architectural implementation a
matter of opinion. However, after working at 5 different companies,
Angular's structure makes the projects' almost inherently the same.

By nature, the web is data heavy. Angular's strength is doing the heavy
work of transforming data into something accessible. Your user is most
likely doing one of the CRUD operations in some form or another. If you
observe your own interactions, you're either creating, updating,
deleting or observing the data.

Angular is the bridge between your user and the data.

Good architecture woks on the idea that if something new comes up, you
will be able to pivot your codebase to meet with the demands without it
breaking. Angular, when implemented properly, has the ability to do
this.

The aim of this book is to be app agnostic - but it will also work
alongside the pixel editor app to show you how Angular can be
integrated. It will also help build your architectural knowledge up over
time. The commits that work along this book is aimed to help you achieve
this.

Angular can do more than just your regular to-do list tutorial. It has a
ginormous ecosystem that I will help you tap into through this book.
Between the nuances discovered through RxJS, Angular's quirks and
`@ngrx/store`, it's easy to forget the enormity of everything.

This book is written with three different perspectives:

1.  The expert looking to organize thoughts on architecture, and learn
    prior unknowns.

2.  The developer who needs to refresh due to time elapsed.

3.  The first time learner.

The structure of this book will work in concise outlines, easily
accessible through numerical listing. I find it much easier to think in
outlines than having to traverse through long paragraphs.

Enterprise examples in Core
---------------------------

A lot of technical books just either give you giant paragraphs or
chapters. Either that or they give you examples that aren't easily
transferable to the real work.

This book is different because it will include enterprise level examples
that you may be able to apply right away to your current projects.

Even if you haven't finished the book from cover to cover, you'll still
have something workable right away.

 We Have Best Practices 
-----------------------

This book is developed around best practices for how to develop
enterprise level UI applications with Angular. It's also good to note
that external libraries and frameworks - such as GraphQL and E2E
testing, also has their own best practices standards.

I will do my best to help you differentiate between what is Angular and
what is considered 'other'.

Without further ado, let us begin!
