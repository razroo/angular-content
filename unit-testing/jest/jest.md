 Jest 
=====

 A Primer. 
----------

Jest is a test runner created by Facebook to allow for the \"Delightful
JavaScript Testing\".

 The Benefits of Jest Vs. Karma 
-------------------------------

1.  Fast and sandboxed

2.  Built-in code coverage reports

###  Fast and sandboxed 

Jest allows for parallel test runs across workers to maximize
performance. Console messages are buffered and printed together with
test results. Sandboxed test files and automatic global state resets for
every test so no two tests conflict with each other.

###  Built-in code coverage reports 

One has the ability to create code coverage reports using --coverage. No
additional setup or libraries are needed. Jest can collect code coverage
information from entire projects, including untested files. The UI, in
my humble opinion, for what it's worth, is not the greatest.

###  Does not require starting a Browser 

This one in particular helps with regards to CI/CD. Not requiring a
browser, does not require a browser to be built into the CI/CD. In
addition, a large part of performance issues with regards to unit tests,
is having to start the browser every time.

 Using Jest within an Nx Setting 
--------------------------------

      ng generate jest

      ng generate jest

After running the above generator, one can now run jest within your app.
When generating a lib, one can now do:

      ng generate lib libname --unit-test-runner jest

[^1]

 Primer on Jest Syntax 
----------------------

Real quick, I would like to go through a couple of things that Jest
offers over Karma.

Switching over from Karma to Jest
---------------------------------

At this point this is the main selling point of why Netanel Basel's
Spectator is so valuable is that it allows for tests to be converted
over to Jest automatically by simply switching the imports. Let us
pretend that we are unit testing a service:

    import { createService } from '@netbasal/spectator';
    import { AuthService } from './auth.service';
    import { DateService } from './date.service';

    const spectator = createService({
      service: AuthService,
      mocks: [DateService]
    });

    it('should be logged in', () => {
      const dateService = spectator.get<DateService>(DateService);
      dateService.isExpired.mockReturnValue(false);
      expect(spectator.service.isLoggedIn()).toBeTruthy();
    });

The above test is currently using karma. However, if we wanted to switch
it over to use Jest, all we would need to do is change the import path:

    - import { createService } from '@netbasal/spectator';
    + import { createService } from '@netbasal/spectator/jest';

Just like that magic, we can have our entire app using Jest.

[^1]: If you are coming from an existing nrwl workspace, please use the
    following blog post to find out how to upgrade to Jest
    https://blog.nrwl.io/nrwl-nx-6-3-faster-testing-with-jest-20a8ddb5064
