---
title: Typescript - Immutability
---

Immutability is one of the core concepts when it comes to data. I first
learned about it when I was introduced to Redux. However, as time
progressed it was something that I learn to integrate with all of my
projects. In regard to Typescript, it allows type annotations in the way
of Immutability:

    export interface User {
      readonly firstName: string;
      readonly lastName: string;
    }

    let user: User = {
      firstName: 'Larry',
      lastName: 'Snow'
    };

    // This will result in a compile time error
    person.firstName = 'Pam';

Instead this promotes using immutability. So if someone would like to
turn this data into something else, they would do something like the
following:

    export interface NewUser extends User {
      location: string;
    }
    let newUser: NewUser = {
      ...user,
      location: 'New York'
    };
