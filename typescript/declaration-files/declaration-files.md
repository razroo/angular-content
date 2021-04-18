---
title: Declaration Files
---

## Why Declaration files are integral

Declaration files are an integral part of the Angular/Typescript ecosystem. However, it is uncommon to work with 
declaration files, because most major libraries have them bundled with respective npm library already(, or are written 
natively in Typescript). In addition, there are 5,000+ typings created by the open-source library DefinitelyTyped. 
Nonetheless, granted this is the reality of present-day Angular development, it is integral to understand how it works.
Every application usually has a one-off use case that makes it special. When that time arrives, knowing how a 
eclaration file works is going to come in handy. Most likely because you will need to create one yourself.

Declaration files, however, happen to be very involved. They require an understanding of numerous prior Typescript 
concepts. Let's go through that now, as efficiently we can.

Type Annotation
---------------

First, there is what we quite frequently see within a Typescript application called a type annotation. That looks something like this:

```ts
const userName: string;
```

In the above, we inform the Typescript compiler, that the type of this constant is a string. This is for a single value.
Let's move onto the next step in the ladder, type annotating an object.

Typescript Interface
--------------------

A Typescript interface can be used to describe an entire object, such as the following `User` interface:

```ts
export interface User { 
  password: string; 
  userName: string; 
  email: string;
}
```
Now, in our application, if we plan on having user data, we can (type) annotate that object with our interface. A common enterprise example of this:

```
import { User } from '@razroo/data-models/user';
export interface UserState {
  list: User; // list of Users; analogous to a sql normalized table
  selectedId?: string | number; // which User record has been
  selected loaded: boolean; // has the User list been loaded
  error?: any; // last none error (if any)
}
```
In the above UserState interface, our list, which is where our reducer is going to place user data, has the type annotation for the User interface.

### The Multiple Interface Dilemma

Ok, great, so now we know that we can create an interface, and use that to type annotate our object. However, what if wanted to use 10, or so interfaces from the `user.models.ts` file(the file where our user interfaces are located), is there are a more efficient way to import them all at once, instead of doing something like this:?

```ts
import { User , UserTable , UserSettings , UserForm , UserProject , UserCorporate, UserConsumer } from '@razroo/data-models/user';
// let's pretend that all imports are being used in this file, for the sake of
// brevity ..
export interface UserState {
  list: User; // list of Users; analogous to a sql normalized table
  // ..
}
// ..
```

Typescript's answer to this came in the form of the next two core concepts we shall discuss:

1. Modules
2. Namespaces

Modules in Typescript
---------------------

### What is a Module ###
A module in Typescript is any file containing:

#### Values ####
```ts
// e.g.
export const person: Person;
```

#### Functions ####
```ts
// i.e.
export function square(n: number) {
  return n * n; 
}
```

#### Classes ####
```ts
// i.e.
@Component({
  selector: 'razroo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}
}
```

### Example of Module in Typescript ###
A great example of using a module in Typescript is the classic `import`. It's so commonplace that you've undoubtedly 
come across it, and when you read this code example (probably) will say, "Ooooh, that's a module, I know what that is!".

```ts
import { add } from "./math";
```
^ the `math` file is a module in Typescript.

### Example of Module in Typescript

An example of using a module in Typescript is the classic `import`.
```typescript
import { add } from "./math";
```

the math file is a module in Typescript.

Namespaces in Typescript
------------------------

You most likely have come across a namespace in Typescript as well. A local namespace looks something like this:

```ts
import * as math from "./math";
```

wherein `math` is the namespace for the math module. Now that we have our namespace, we can tap into any method within the namespace, using classic dot notation:

```ts
math.add(2, 3);
// 5 as 2 + 3 = 5
```

A namespace put simply, is a way of grouping all Typescript interfaces, classes, functions, and variables under one single name. Similar to what we did above ^ for the math namespace. The benefits of this are two-fold:

1. Simplify the process of import.
2. Create a respective Typescript interface overlay for a non-Typescript Javascript library(something we will get to momentarily).

Global in Typescript - The Last Piece
-------------------------------------

There is just one last missing foundational piece in order to understand what a declaration file is.

In Typescript, there is the ability to create global variables, functions, and namespaces. For instance, if we want to create a variable called `car` and have it be available across our entire app, we can use something really cool called `declare`:

```ts
declare let razrooAssetsBaseURL = 'assets/logo';
```

Now that we have this global variable within our app, we can use it anywhere we want.

```ts
console.log('razrooAssetsBaseURL'); console.log(razrooAssetsBaseURL);
```

### Creating a Global Namespace ### 
We can also create a global namespace, without the need of using an import/export. We would do this by coding:

```ts
declare namespace razrooLib {
  function makeGreeting(s: string): string;
  let numberOfGreetings: number;
}
```

Now we are all set to finally jump into what a declaration file is.

What is a Declaration File?
---------------------------

Defined concisely:

> "A declaration file in Typescript is simply a way of transferring over a Javascript library to Typescript"

There is a bit to unpack in this definition, as it's not immediately apparent why a Javascript library would need to be
converted over to Typescript? In addition, how exactly would a declaration file covert a Javascript library to Typescript?

### Fantastic Moment.js Example ### 
The `Moment.js` library, is an extremely popular library used for dates. (For me personally, in the past 10 years working on applications, it is the only library to consistently be used in every application.) The actual library is written in Javascript. However, in order for the Typescript compiler to understand the Moment library, it is necessary to create a declaration file.

Lucky for us, the Moment.js core contributors have created their own typescript definition files. These definition files are bundled with the moment npm package. Let's look at the moment definition file:

```ts
declare namespace moment {
  //..
  interface Moment extends Object {
    format(format?: string): string;

    startOf(unitOfTime: unitOfTime.StartOf): Moment;
    endOf(unitOfTime: unitOfTime.StartOf): Moment;
    //..
  }
  //..
}
```
There are three things that have been done here, in order for this declaration file to take hold:

1. We created a global namespace called moment. Whenever Typescript imports the Javascript moment library, it immediately taps into the types for Moment, contained within the global moment namespace.
2. We create a type annotation for all of our methods. Here we are showing one of the more commonly used one's, 
format`(along with `startof` and `endOf`). Wherein the library specifies that it can optionally take in a string parameter, and returns a string.
3. The actual file has the suffix .d.ts. When a file has a suffix of .d.ts, the Typescript compiler will not immediately know of its existence. Instead, you will have to use a reference path similar to:

```ts
///<reference path="path/to/file.d.ts" />
```

The current practice is to place all reference paths in an `index.d.ts` file, and then feed that one index.d.ts file into your application. This is fed into main application, by putting this type into the `typings/types` field in your `package.json`.

```ts
{
  "name": "moment",
  ...
  "typings": "./moment.d.ts",
  ...
}
```
