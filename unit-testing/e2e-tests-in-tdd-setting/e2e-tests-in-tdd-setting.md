 E2E Testing in a TDD/BDD Setting 
=================================

One of the tricky things with regards to E2E tests is how it fits into a
TDD/BDD environment. Writing unit tests before we can see anything in
our UI already takes a good amount of discipline. Adding in an E2E test
to the workflow seems like a bit much?

Ok, so let's get into the thick of it. I think we'll all have a good
time!

 Where does E2E Testing fit in a TDD/BDD Setting? 
-------------------------------------------------

###  Write an E2E test and Watch it Fail 

Begin with E2E test, and watch it fail.

###  Write Unit tests and watch them fail 

Write a unit test, that works towards satisfying the goal of your E2E
test, and then watch it fail. One note, is that spectrum of what you
will write, will be wider, being that a single E2E will have a wider
scope. This is alright.

###  Code Until All Unit Tests are Satisfied 

Implement code to satisfy your unit tests.

###  Optional - Tuck in any untucked corners 

There might be some unit tests that will need to be written, that might
not be directly correlated with the Protractor tests written for the E2E
test. Writing these additional tests at this time, in between the next
E2E test, would make sense.

###  Check to see if E2E Test Passes 

When all unit tests pass, you should now run the command for running E2E
commands.

###  Repeat the Process 

Now that you have run your E2E tests, and unit tests, and have now code
the appropriate HTML to run unit tests, you should now repeat process
with appropriate unit tests.

*Note: We will not be writing any E2E tests yet, as we do not have any
two components to integrate yet*
