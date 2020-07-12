 Coverage Reporting 
===================

Coverage reporting for an Angular application using the Angular CLI is
easy to implement. Albeit easy to generate coverage reporting, it's
interesting, because as a software engineer who develops exclusively
using TDD/BDD, coverage reporting becomes of less important. I find
myself spontaneously checking up on coverage reporting from time to time
(usually every week), to make sure the team is hitting the numbers we
want.

Testivus On Test Coverage
-------------------------

There is a funny, yet honestly, largely impacting founding post by
[Alberto Savioa](artima.com/weblogs/viewpost.jsp?thread=204677). It is
entitled, \"Testivus On Test Coverage\".

Here is a copy of it here for your enjoyment.

The Impact of Testivus
----------------------

Testivus's impact on unit testing cannot be overrated.

At most organizations that I have worked at, 80% is indeed the golden
number. The question is, what is the validity of the number 80%? First,
and foremost, I think that culturally 80% is intuitively considered
above average. Particularly because 70% from an academic perspective is
considered as passing by many.

However, I would also like to assess the number objectively. 80% seems
to coincide with the Pareto principle. Alfred Pareto's principle claims
that 80 percent of consequences come from 20 percent of the causes.

In a super interesting article, Microsoft learned that, "\...that 80
percent of the errors and crashes in Windows and Office are caused by 20
percent of the entire pool of bugs detected.

So you might ask why don't we keep the rule of 20% to the most important
features. Well this might just be an impossible task. For a software
engineer to be aware of potential bugs before they happen, is once
again, impossible. Instead what we should do is focus on 80%. This means
that we have a 4/5 chance of catching a 20% bug.

The phenomenon of the Pareto Rule
---------------------------------

It is also important to realize that within the Pareto rule there is a
20% within the 80%. That is the difficulty of completing a meaningful
test - that is, one that solves 80% of uses cases - increases.

The interesting thing about the Pareto rule is that one can make the
argument that the 20% features that make an 80% impact are those that
are hardest to test.

So arguably those tend to overlooked. However, similar to what Testivus
said, if we want a blanket rule, let's apply the Pareto Priority
Index(PPI): [^1]

$$PPI = \frac{\text{savings} \times \text{probability of success}}
           {\text{cost} \times \text{time of completion}}$$

The Pareto Priority Index, is really just fancy way of saying if you
find this unit test is taking you too long, and it's not worth it,
granted the unknown of what this unit test is, move on. So this
number(80%) is debatable, but given the above, 80% seems like a very
respectable amount. I personally keep it at 80, and even the Angular
docs recommend
[80](https://github.com/angular/angular-cli/wiki/stories-code-coverage).

 Different Types of Coverage Reporting 
--------------------------------------

The following are the four different types of coverage reporting:

1.  Statements - Has each statement in the program been executed?

2.  Branches - Has each branch of each control structure been executed?
    For instance, have all case statement, or if/else statements been
    called?

3.  Functions - Has each function (or subroutine) in the program been
    called?

4.  Lines - has each executable line in the source file been executed?

### Distinguish Between Statements + Branches

I generally find it difficult to distinguish between a statement, and a
branch. The following is a great example. Let's say we have the
following scenario:

    determineStatement(a: any, b: any): boolean {
      if(a){
         if(b){
           statement2 = true;
         }
         statement1 = true
      }
    }

If we test a = true, and that b = true, that will give us 100% statement
coverage, as we have tested all statements. However, we have not tested
the hidden else statements. Therefore while the statement coverage
within our function is 100%, the branch coverage is only at 50%.

### Understanding Letters on Side of Code Coverage

1.  'E' stand for 'else path not taken'. Meaning that if path has been
    test, but not the else path.

2.  'I' stand for 'if path not taken'.

3.  'xN' in left column, is the amount of times the line has been
    executed.

### Understanding Colors

1.  Orange: Functions not covered.

2.  Pink: Statements not covered.

3.  Red: Non executed lines, or pieces of code.

4.  Yellow: Branches not covered.

 Code Coverage Enforcement 
--------------------------

In line with our decided 80% coverage, we can go into our karma.conf.js
file and add the following in the coverageIstanbulReport: key.

    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 80,
        lines: 80,
        branches: 80,
        functions: 80
      }
    }

Now we have made it that our unit testing will fail whenever we reach a
threshold below 80%. This is useful for development, and useful for
devOps, as we can keep a consistent way of keeping our unit tests at a
certain level.

 Running a Coverage Report in Angular 
-------------------------------------

My preferred method, is to add a package.json script for running a
--code-coverage report. It would look something like the following:

      {
        ...,
        test-coverage: ng test --code-coverage
      }

and then in your terminal run:

    npm run test test-coverage

Viola! Just like that, the CLI will take care of emitting code-coverage
for you.

 Opening up Coverage Reporting 
------------------------------

In order to open up a coverage report, after a coverage report has been
generated, simply navigate to your coverage/src folder, and click on the
index.html file.

 Trap of Coverage Reporting 
---------------------------

In a perfect world, all functions would be pure and they would solve one
use case. However, that is frequently not the case. In addition, even if
it was the case, a unit test should still be tested against numerous use
cases. So Coverage reporting while on paper makes seems like it is 80%
it might be 10% to 20% less than that.

[^1]: https://www.sixsigmadaily.com/the-six-sigma-approach-to-project-selection/
