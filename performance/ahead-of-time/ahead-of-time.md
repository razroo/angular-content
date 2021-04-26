---
title: Ahead of Time Compilation
---
Angular uses Typescript. The structure uses directives, components,
`@Input()`'s and `@Output`'s. So, when one thinks about it, you start to
realize, "hey! Is Angular compiling it to browser ready HTML and
JavaScript for me"?

The answer to this question, is yes.

How Angular does that cannot be entirely controlled, as that is handled
by the internals of the framework. However, the real question that we
should be asking ourselves is when does this happen?

## Exploring Ahead of Time Compilation

Without using the ahead-of-time compilation flag `--aot` i.e.

```bash
ng serve
```

Angular will convert the code from Angular code to browser readable code
at run time. By using the `--aot` compiler i.e.

```bash
ng serve --aot
```

The Angular compiler will compile the code at build time. The benefits
of compiling the code at build time are as follows:

1. Faster rendering - Browser doesn't have to compile code first
2. Fewer Requests - The compiler will inline external html and css.
3. Smaller bundle sizes - Angular Compiler not included in bundle size.
4. Template errors - They happen inside of compiler, instead of at
   runtime.
5. Better security - HTML and Components(css included), are compiled
   into Javascript before the webpage loads. Preventing against many
   different types of injections.

The internals are somewhat complex, and the Angular documentation does a
reallygood job at discussing what that is. From a practical perspective,
let's discuss the expression limitations. I will admit, at this time,
why there are these limitations is beyond me.

## Expression Syntax Limitations

The AOT collector only understands a subset of JavaScript. It's quite a
long list. Therefore, when using the `--aot` flag, and the AOT compiler
comes across something it doesn't understand, it will throw the error
into the `.metadata.json`.

If it needs that piece of code to generate the application code, the
compiler will complain. (However, I have personally found that there are
scenarios wherein the AOT compiler will say that things are working as
expected, but it won't actually work).

The `ng serve` will go through as usual, but it will fail silently in
the form of it not appearing on the site. The easiest way to be aware
ofthe limitations is to change the config in your
`angularCompilerOptions`.

```ts
"angularCompilerOptions": {
  ...
  "strictMetadataEmit" : true
}  
```

By changing the `strictMetadataEmit` to `true`, it willemit an error to
the console directly, when using the `--aot` flag. Sometimes the
compiler will throw code that it cannot read into an AST.
