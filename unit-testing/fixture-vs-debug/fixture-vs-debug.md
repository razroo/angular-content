 Fixture Vs. Debug 
==================

There are use cases where accessing the DOM as we've mentioned makes
sense from a unit testing perspective.

We want to make sure that the unit test that we've called is actually
called in the DOM as well. In Angular, there is the ability to tap into
the native element, which is a good old fashioned DOM Element.
Alternatively, there is the option to tap into the debug element. The
debug element offers a wrapper on top of nativeElement.

There are a couple of methods that a debugElement offers over a
nativeElement.

1.  componentInstance

2.  debugElement

3.  query(By directive)
