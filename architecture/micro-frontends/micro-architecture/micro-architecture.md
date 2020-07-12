Micro Architecture - Key Design Principles
==========================================

I personally feel that micro architecture has officially made it's way
over to front end architecture. This means that it is now important for
a UI Engineer, to be aware of what constitutes micro architecture.
Martin Fowler, one of my favorites, has an excellent article on what the
characteristics of micro-service architecture are.

\[I will admit that I'm a bit new to this micro-service architecture, as
I'm starting to break more into backend architecture. However, when I
did a deep dive, I started to look for something similar within front
end. That is sort what perked my interest, and why I am now writing
about it.\]

I would like to go through the points mentioned in this article and
others I've found as well. However, for the sake of efficiency, only
apply those concepts within the confines of micro frontend architecture.

Single Responsibility Principle
===============================

[Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin),
otherwise known as \"Uncle Bob\", is best known creating the Agile
Manifesto. In addition, he is well known for creating/promoting the
SOLID principles. One of the SOLID principles, in fact the first letter
stands for the single responsibility principle. The [single
responsibility
principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
states:

Micro front end architecture is a natural extension of this concept. It
takes front ends which serve different purposes, and makes it so that
they are developed, deployed, and maintained independently. However,
these services can still communicate with each other, thereby gathering
those things that change for the same reason.

Micro Frontend Architecture Design Principles
=============================================

[^1]

Micro Frontend technology is still being developed, and I think there is
still a lot of confusion around the benefits of such. I would imagine
there is going to be a happy medium moving forward. However, right now I
would like to present design principles as I view them, with the best
tech currently available.

Business Centric
----------------

Each front end address a particular business need of you application.
For instance, let's say that we have an online book store, and that we
would like:

1.  Shopping Cart

2.  Single Book Page

3.  Multiple Book Page

4.  Header

5.  Footer

Each one of these elements, serves an all around different business
purpose within our application. The shopping cart, to give people an
option to see everything they've bought so far. The multiple book page,
to give the user the ability to see all books we are going to sell. The
single book page, to get in depth detail of the book they want to buy.
The header, to allow people to properly navigate through our site. The
footer to give people an abstract of our information.

So, based on the fact that each one of these elements contains a
different business use, we would build them into their own
application(,or once again it's own library, as we will do). [^2]

Autonomous Features
===================

An autonomous feature (in software) means something that can control
itself independently. So an autonomous feature here means a front end
that can:

1.  Change, test and deploy independently

2.  Resiliency - If one area of application faults, allows us to degrade
    just one section of the application.

3.  Observable - Centralized logging, and monitoring, we can see what
    our individual micro front ends are doing.

without breaking other front ends. The immediate obvious benefit to
this, is allowing teams to work independently of each other.

Front End Framework Agnostic
============================

In practice, autonomous features requires this one distinct feature,
which is that applications are front end framework agnostic. From a
practical perspective, this means:

1.  Code isolation - All micro frontends are built as a separate
    library. We use [single-spa](github.com/CanopyTax/single-spa) to
    accomplish mounting separate front end frameworks. In addition,
    using Nrwl Nx to keep libs separate, and build separately.

2.  Base app - All of our micro frontends are going to need a base app
    to hook all of our frontends into each other. However, ideally being
    able to use the browser directly instead of a base app, is ideal.

3.  Front End API - Within the context of an enterprise Angular front
    end application. This means allowing our micro front ends to
    communicate with eacth other through:

    1.  The router

    2.  Browser Events(we reccomend using
        [eev](github.com/chrisdavies/eev))

Super Resilient
===============

Being that we are going to be hooking in potentially multiple
frameworks, that can have an impact on the initial load time of our
site. Being able to have a visible site, without data, or Javascript
being loaded is key. Using something like [Ghost
Elements](https://medium.com/angular-in-depth/https-medium-com-thomasburleson-animated-ghosts-bfc045a51fba),
is crucial, even more so than a single page application. Integrating
universal rendering, or static site generation is also a good idea, just
to make sure the ability of it loading is faster, granted the cohesive,
performance heavy nature of bundling.

Team Ownership
==============

This part can be a bit controversial, and I can definitely see some
companies having opposition to this, being that the ecosystem isn't yet
fully ready for something like this. However, the idea is, is that now
we have a micro frontend, we can actually tie an entire \"slice\" of our
product, end to end, by one team. This means that a single member, will
be expected to contribute to front end, backend and the database.
Arguably, this is beneficial for four reasons:

1.  Simplifies communication. No need to talk to database, or dev-ops,
    because they are the dev-ops.

2.  Simplifies co-ordination. No reason to talk to backend, or database
    specialist, because they are the specialist.

3.  Changes happen quicker - Due to expeditious communication.

4.  Improved performance - The developer get's to see how optimization
    they made on database, or back end, affects the performance on the
    front end.

Final Thoughts on Micro Frontends
=================================

The most humorous and simultaneously enlightening piece I found while
putting it all together, is a Tweet by [Dan
Abramov](twitter.com/dan_abramov/status/1132493678730252288?s=20). It's
a very brave tweet, something along the lines of, \"I don't understand
micro-frontends\". Two of my favorite open sourcers on this topic, Joel
Denning + Michael Greers, respond something like the following. It
allows teams to be:

1.  Autonomous(work on their own without co-ordination of other teams)

2.  Full stack

The above two are the single greatest reasons given by both and them,
and are synonymous with the reasons for micro-services. However, as I
started to think about it more, not quite.

The difference for me, in my very humble opinion between the
two(micro-services vs micro-frontends), is that the tech + tools
available within a singular framework(such as Angular) is arguably
easier to work with. The micro front end ecosystem does not have a state
management that can be used across all frameworks, or dev tools such as
Nrwl Nx. It's going to require a very large overhead from the team's
side of things. For me, it doesn't make sense at this point in time to
implement. Especially if this does indeed start to become an issue,
micro frontends can start to be built out, at this point in time.

Once the tool ecosystem becomes more sophisticated for micro frontends,
this is something I would start reccomending. Right now, I don't think
it's fair to have teams work full stack, and learn multiple frameworks,
unless the company is willing to invest in something like that.

[^1]: https://martinfowler.com/articles/micro-frontends.html

[^2]: martinfowler.com/articles/microservices.html\#OrganizedAroundBusinessCapabilities
