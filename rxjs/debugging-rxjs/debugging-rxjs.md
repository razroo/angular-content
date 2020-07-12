 Debugging Rxjs 
===============

One of the more difficult things to master when learning RxJS, is
learning how to debug a stream. Within regular Javascript/Typescript,
debugging is relatively easy. I find myself going to two different
methods when following this approach:

1.  console.log

2.  source when dev tool

Using Console.log
-----------------

In a regular Typescript/Javascript setting a `console.log` is a
relatively simple concept. We show(,or log out), whatever the current
status is of our code at a given time. So for instance, let's say that
we wanted to create a piece of code that takes the first and last name,
and combines(proper software term is concatenates) them together.
Something like this:

``` {caption="console in action"}
combinedName(firstName: string, lastName: string): string {
  return firstName + lastName;
}
```

So the developer, due to the low level of the logic of this function,
mistakenly forgets to add a white space in between. He decides to
console out the function, before applying the logic directly to the
application, to make sure it works as expected. So the developer does
something like this(assuming we are talking about a method within a
service):

    console.log(this.combinedName('James', 'Harden));

The developer is expecting it to look like 'James Harden', but instead
the developer finds out that it is 'JamesHarden'. The developer
immediately realizes that there is a missing white space in between the
two words, and edits the function, so that it works as expected:

    combinedName(firstName: string, lastName: string): string {
      return firstName + ' ' + lastName;
    } 

He then goes back, and refreshes the page where the `console.log`
was,and finds out that it now looks like:

    'James Harden'  

Using Source Within Developer Tool
----------------------------------

The only other tool that I usually have within my tool belt to dissect
an error immediately is the developer tools within chrome. Any time that
there is an error, there is a unique signature that your code will throw
out. In a modern day application, this will happen even if it isn't
unique to your application, due to the number of libraries/frameworks we
use. However, it can still be incredibly useful for hard to find bugs.
This article will not discuss this technique in depth. However, it will
be the top two tools in your debugging tool belt. Feel free to checkout
this video on egghead.io for more.

Debugging within RxJS - The Dilemma
-----------------------------------

The immediate issue with debugging RxJS from a traditional setting, is
that it's only the final result that can be debugged. So you might have
a stream of numerous chained events:

    this.companies$ = searchBy$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(''),      
      switchMap((criteria:string) => {
        const request$ = this.companyService.searchCompanies(criteria);
        return !criteria.length ? of([]) : request$          
      })
    );  

In the above, only in the switchMap, or in a subscribe will we be able
to tap into the result that we are looking for. For instance, let's go
through the potential bugs that might happen with the above stream:

1.  The result might not appear because it is within the `debounceTime`

2.  It might not have changed from the previous result i.e.
    `distinctUntilChanged` and therefore is not triggered.

3.  The `companyService.searchCompanies` request might be erroring out,
    or there might be some internal logic to the
    `companyService.searchCompanies` request making something error out.

So of course we need a similar way to console out our results along the
line of the stream, to figure out where our error is happening.

Using Tap
---------

`tap` is RxJS's way of taking the current value and outputting it. It is
commonly used in real life code, by taking the value returned by a
service, and emitting it. However, tap can also be used a debugger. For
instance, in the above code, let's say we aren't getting the result we
wanted. We can do the following:

    this.companies$ = searchBy$.pipe(
      debounceTime(300),
      tap(result => console.log(result)),
      distinctUntilChanged(),
      startWith(''),
      switchMap((criteria:string) => {
        const request$ = this.companyService.searchCompanies(criteria);
        return !criteria.length ? of([]) : request$
      })
    );  

In the above `tap`, a result is coming back so we know that it is not
erroring out before `debounceTime`. Ok, so let's move the tap one more
down:

    this.companies$ = searchBy$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(result => console.log(result)),
      startWith(''),
      switchMap((criteria:string) => {
        const request$ = this.companyService.searchCompanies(criteria);
        return !criteria.length ? of([]) : request$
      })
    );  

Here we are no longer receiving the console.log that we want. This is
telling us that the reason we might not be recieving our result, is that
it is not being registered as anything distinct.
