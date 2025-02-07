---
title: Pipes
---

Angular offers the ability to use Pipes out of the box. The idea behind
a pipe is to get data, transform it, and show new transformed data to
users.

Just as a primer, using the native angular date pipe, a pipe would do
something such as the following:

```
<!-- The chained hero's birthday is -->
{{ birthday | date | uppercase}}
```
    

This would display

    FRIDAY, APRIL 15, 1988

The pipe here is taking in the timestamp of

      577065600

and converting it to the proper date. Having such dates in one's
application makes it very easy to go ahead and transform data throughout
one's app. Here we are also chaining pipes, so that the transformed data
that comes back in addition to being transformed, is also capitalized.

 Performance Considerations 
---------------------------

It is important off the cuff to be aware of some performance concerns
when it comes to pipes.

###  Understanding Angulars Change Detection 

This is a good time to interject and get into Angular's change
detection. Change detection in Angular works from the top down. That is,
if a specific set of data changes within a component, then the entire
component will update as a result of new data.

Angular pipes change how that it is done by changing content directly on
the object, and only updating that one specific part. By using pipes, it
allows us to increase the component's performance.

 When to Use Pipes 
------------------

Pipes cover a lot of ground. Within our architecture, one of the pipes
that will be used more so that others in the async pipe. However, now is
not the place to put that here. What is important, is that pipes can be
used transform data.Should they always be used whenever one is
transforming data?

I like to think of pipes as unique to html. They have a way of dealing
of performance when working with html templates. However, within a
component itself it is questionable. To be honest this can go either
way. From a maintainability perspective, whenever data is being
transformed, it should be turned into a pipe, instead of a service. That
would be the simple rule.

In addition, there are impure pipes that one can potentially do, which
usually has little to do with transforming data. Once again the async
pipe is something that would register along these lines. However, I have
not seen the need to create an impure pipe with the architecture given.
