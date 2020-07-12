 Change Detection 
=================

Change detection is one of the foundation principles behind Angular. It
is a large part of what makes the framework what it is. Understanding
the minute details of Angular's change detection can translate to
helping us understand all other parts of the framework. In addition, it
can help us increase performance boosts.

Understanding Change Detection as a Concept
-------------------------------------------

Without a framework in place, we would change a particular piece of text
using JavaScript. For instance, let's say we have a promise which
returns data, with that new data, we would do something like the
following:

    yellowBoxText = newData;

In a framework, doing something like this isn't necessary and one has
the option to go lean into the framework to this for you. Here is a
quick primer:

    <!-- In our html file -->
    {{ newData.name}}
    // In our Typescript file
    this.facade.user$.subscribe((userData) => {
        this.newData = userData;
      });
    });

Very simply, using the above, any time that our newData changes, all of
the relevant data inside of out html file will be updated.

 Understanding Change Detection Performance 
-------------------------------------------

Every component in Angular has its own change detection. This means that
if data changes for the component, only that particular component will
be updated. In addition change detection in Angular is top down. If a
parent component is changed then all child components will be
re-rendered.

In addition there is the ability to emit data. Even if a component is a
parent component, it will still be updated accordingly.

###  Sibling Components under Same Parent Component 

Sibling components under the same parent component will not update
unless they both feed from the same component. Keeping change detection
at this level from an architectural perspective is really all you need
to know. It is important to know about zone.js the internal workings of
how change detection works in Angular.
