 Unit Testing TDD - First Principles Discovery 
==============================================

Unit testing as a discipline is something that can be difficult to
write. Writing a good unit test is almost the same as writing good
software. If someone is following TDD standards and are required to know
all of the unit tests ahead of time, reality often doesn't cooperate.

This often leads to many developers leaving the TDD environment. If they
do write unit tests, it will be towards the end.

The following is a great way and as far as I am concerned the best way
to discover unit tests.

 What is the First Princples Thinking? 
--------------------------------------

In Physics[^1], there is a concept called, first principles thinking.
This means boiling down a principle to its essential truth and then
building up from there. With regards to Unit Testing, and specifically
test driven development, this principle will help to create fantastic
unit tests.

 First Princples Thinking - Rubber Ducking - An example 
-------------------------------------------------------

      Q: What would we like to get out of the choose size form?
      A: We would like to specify number of rows, number of columns, and pixel size.

      Q: Being that these are numbers, do we have any way of preventing the user from entering in any value other than an number?
      A: The input will only allow numbers.
      Q: Ok, do you see any value in setting up logic, so that if it is not a number, then it will throw an error?
      A: No, because there will never be a situation wherein they can not put in a number.
      Q: In that case, should we take a snapshot and make sure input fields are indeed of the type number. If not then it should error.

      Q: Now that we have established that these are always numbers, is there any limit on the size of this grid.
      A: Not really, I can see it as just being what the window size.
      Q: Hmm, I find that interesting, so you are saying that it can be any size.
      A: Yes for this iteration.
      Q: Okay, but it will be specific to window size.
      A: Yes.
      Q: Ok, so let's go ahead and create unit test, that it should have an error, that based on window size, if value is greater, it should automatically have it go to the height window size. In addition, there should be test that specifies as such.

      Q: Now that we have established that these we constrained window, is there any limit on the ratio between column size, and row size?
      A: No.
      Q: Is there any way that we can create a unit test, to just say that it passes, if there is a difference in ratio, between, then should not error out?
      A: Yes, need to figure this out though. Not sure how to do off hand.

      Q: Now that we have established that there are no constraints, what else is there for us to test. We have covered window size, ratio, input type, what about a max pixel Size?
      A: Hmm, why would we care about that?
      Q: Not sure, good point.

      Q: Hmm, that being said, should we only allow pixel size that is within the frame of the row and column size? For instance, let's say we have 20 rows, and 20 columns, should the pixel size be something that perfectly divides into 400?
      A: Not sure, it would be a lot of overhead at this point.
      Q: Almost feel like we should automatically control pixel size based on column and row size.
      A: Ok, out of scope, let's not.

      Q: Anything else?
      A: Not that I can think of.

      //End of Scene - dev takes a bow

These unit tests can be found in the Angular Pixel Illustrator repo.

[^1]: Not a physicist, but I heard of this concept the first time from
    Elon Musk. I am, however, a Talmudist, and in talmud we have a
    similar concept called Pilpul
