---
title: Bundle Size
---

Bundle sizes can make such a large difference to a user, using the app
for the first time, while simultaneously being one of the easier things
to tackle.

Being Aware of Bundle Size
--------------------------

When you run `ng build --prod`, Angular will generate 4 files:

1.  runtime.\*.js

2.  main.\*.js

3.  polyfills.\*.js

4.  styles.\*.css

Of the above, the largest will be main.js files. If we dissect our
bundle size, it's important to keep in mind that this bundle size will
be contributed to by a number of different things. This chapter won't go
into how to decrease the bundle size before it is bundled, but rather
after it has been bundles.

Gzip
----

gzipping for those that are not familiar, is the process of taking a
chunk of data and making it smaller. The original data can be restored
by un-zipping the compressed file. Within the context of HTTP protocol,
it has the ability to unzip a file. There is a bit of a cost from the
side of the browser to unzip a file. However, generally the benefit of a
lower bundle size, outweighs the fact that the browser will have to
unzip the file. All that is needed, is for your devops person, to set
the gzip setting on your server.

gzipped files are about 20% the size of the original file, which of
course, will drastically decrease the initial load timeof your app. If
you would like to check and see whether, or not your files are gzipeed,
you can simply open up your console, and check the \"Content-Encoding\"
under the Response Headers. If it says \"Content-Encoding: \"gzip\",
then you are in good hands, otherwise, you might be in trouble.

###  How to Gzip 

Gzip'ing is something that should be controlled by your CDN, which will
also deal with a slew of other things to make sure your files are
served. However, your backend team will be able to deal with this one
relatively quick, if they are not using a CDN system, due to many
packages out of the box dealing with this.

Analyze Your Angular Bundle
---------------------------

Webpack has a built in tool that one can use to analyze build. For
starters, it has an incredible visualization of what your entire build
looks like.[^1] In addition, it will tell you about things such as:

1.  You forgot to remove some packages that you aren't using anymore.

2.  Some packages are larger than expected, and can be replaced with
    another.

3.  You have improperly imported libraries.

In order to get the above data:

1.  npm install -g webpack-bundle-analyzer 

    Then, in you Angular app, run:

2.  ng build --stats-json

    We are going to be running stats on the original non minified build,
    as we want to make sure we do not muddy the results coming back from
    out stats.

3.  Finally we run:

        webpack-bundle-analyzer path/to/your/stats.json  

    and navigate to `localhost:8888` wherein we will see our results.

Monitoring Bundle Size
----------------------

In Angular 7, and later, angular adds a config in your
`angular.json`file. It has a property called \"budgets\", and it looks
like this:

```ts
"budgets": [
      {
        "type": "initial",
        "maximumWarning": "2mb",
        "maximumError": "5mb"
      }
    ]
```
       

This will throw an error if bundle size exceeds 2mb, and throw an error
if bundle size exceeds 5mb. It is very much so possible to use this
feature inyour CI/CD pipeline. Feel free to go over to your devops
person, and ask them to integrate it.
