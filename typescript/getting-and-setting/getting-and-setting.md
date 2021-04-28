---
title: Typescript - Getting and Setting
---

Creating a getter and setter is a common pattern in an OOP paradigm.
When using a class, Typescript offers an internal getter and setter. It
is important to note that within the Typescript documentation, a large
part of the reason why they create setters and getters is to give a way
of intercepting the setting of a particular element. [^1]

For example, you want to ensure that only one string is set and to the
right thing, you can use a setter to perform this job.

 Typescript - Why create a getter and setter? 
---------------------------------------------

While it can be seen as syntax sugar, a little bit of sweetness to your
code can make it easier to work with.

1.  Getting and setting is a integral part of OOP programming. Before
    redux came around, it was literally a part of every component
    without a doubt. Having a function pegged with a get, or set
    directly before the function, helps specify the intent of the
    getter, or setter.

2.  Yes, you can technically specify a function that will act as a
    setter or getter, it's a bit akward within an OOP setting and can
    lead to unwanted side effects.

            getDinerText()

            Diner.text

You can set and get without using the internal setter and getter that
Typescript has to offer. However, the syntax sugar will make it seem
like you are natively setting and getting. This also puts emphasis on
whenever an item is involved in get and set actions.

 Valuable getting and setting within an ngrx/store setting 
----------------------------------------------------------

So the question then becomes, if you are using ngrx/store within your
app, what's the reason for using get and set patterns?

The values that you have will either be set through \@Input's within
Angular or accessed through your \@ngrx/store.Having a getter and setter
within a component that contains deeply nested data would be very
useful. For example:

```ts
get numberOfDocuments(): number {
  try {
    return this.userLog.user.documents.length;
  } catch (e) {
    return 0;
  }
}
```

Now we have a getter with logic, that says that if it doesn't exist,
then it will return something 0. We can then do something like the
following:

```html
<span> Number of Documents: {{ numberOfDocuments }} </span>
```

[^1]: typescriptlang.orgdocshandbookclassesḣtml
