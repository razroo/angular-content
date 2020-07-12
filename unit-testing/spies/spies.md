 Spies 
======

Spy's are an integral part of any unit testing suite. Spies help
simplify the unit test suite to such a great extent, that not discussing
the finer details of how it should work, almost seems like a crime.

 A Primer 
---------

First and foremost, spies are actually one of the finer points of unit
testing.

Personally, when I started writing them professionally for Verizon,
spies were one of the more difficult things for me to understand. I
found the name particularly confusing. A spy?! You mean I am spying on a
function that I already know about? Wait, so you mean I am giving my
unit tests the ability to tell if function has run, or what it has been
called with? Also, it gives me the ability to hijack it with a different
function, or call through as is? Wow, I can't think of any name to call
that? Ok, now I understand why it was called a spy.

###  Spy User Example 

    describe('', () => {
      const userId = '123';
      it('should call the userFacade.getUsers function, when getusers' +
      'is called', () => {
        spyOn(userFacade, 'getUsers');
        component.getUsers(userId);
        expect(userFacade.getUsers).toHaveBeenCalledWith(userId);
      });
    });

The above is a classic example of what a real world spy would do. Here,
we just want to just make sure that the facade is indeed being called
when the appropriate component function is run.

 Two Methods of Declaring Spies 
-------------------------------

It would seem that there are two schools of thought when it comes to how
one should place the spy. Some place the spy within the actual
beforeEach statement. This simplifies the use of doing so.

The other approach, is to apply the spy inside of every it block that
has use of it. While I do not think it is a huge deal to have one
approach over, the other, I do see the benefit of placing the spy in
every it block that uses it.

Why?

Generally, in an enterprise Angular application there will be a very
small amount of spy's that will be set out throughout the application.
So adopting a always put a spy in a beforeEach, can be:

1.  Irresponsible for performance reasons (from a code perspective. I
    would still gladly call you my friend).

2.  Totilitarian in nature of adoption. However, due to the fact that
    not all tests require spies, it can be confusing.

It would make sense that putting spies in individual it blocks will make
the most sense.

 Strategy for Using Spies 
-------------------------

Spies work particularly well with function composition. The attempt of
this book is not to overlap with common unit testing principles, such as
functions should be kept small. It is to introduce to those that might
be less familiar with how to use spies, how it should be used.

Let us imagine a large function. This function applies sorting by
alphabetical order, converts the text to camel case, and then converts
it into a dictionary. From an abstract level we can apply each of these
into their own function.

    alphabetize(users: users[]) {
      return sort(users);
    }

    camelCase(userName: string) {
      return camelCase(userName);
    }

    convertToDictionary(userId, user) {
      return {
        [userId]: user
      }
    }

    convertUser(users: users[]) {
      const users = this.alphabetize(users);
      users.map((user: user[]) => {
        convertToDictionary(camelCase(user));
      })
    }

We can then run a unit test for each of the above functions, and then
run a spy on them, for our global function. It would look something like
the following:

    describe('alphabetize', () => {
      it('should alphabetize users', () => {
        // appropriate unit test goes here
      });
    });

    describe('camelCase', () => {
      it('should convert userNames to camelCase', () => {
        // appropriate unit test goes here
      });
    });

    describe('convertToDictionary', () => {
      it('should convert users to dictionary', () => {
       // appropriate unit test goes here
      });
    });

    describe('convertUser', () => {
      const users = [...usersMock];
      it('should convertUser to appropriate name', () => {
        spyOn(component, 'alphabetize');
        spyOn(component, 'camelCase');
        spyOn(component, 'convertToDictionary');
        component.converUsers(users);
        expect(component.alphabetize).toHaveBeenCalledWith(users);
        expect(component.camelCase).toHaveBeenCalled();
        expect(component.convertToDictionary).toHaveBeenCalled();
      });
    });

Here we can see that all of our unit tests are tested individually. When
it comes to composing them all into a giant function, from a unit
testing perspective, all we need to do is make sure that they were
indeed called with the correct parameters.

 A Final Note 
-------------

Spies are a relatively simple concept. However, there are finer points
that make spies a little bit of a confusing topic to understand. This
chapter is an attempt to make that a bit easier.
