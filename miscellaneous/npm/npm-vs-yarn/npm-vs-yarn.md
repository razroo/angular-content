 Npm Vs. Yarn 
=============

One of the inevitable conversations that comes into play when starting
to use an app for the first time is to use yarn.

Once upon a time, yarn introduced a yarn.lock file. This was fantastic
and really did decrease install time. In addition, the syntax was a bit
more intuitive, such as yarn add vs npm install. However, as time
progressed, NPM received its own lock file. Performance time between the
two became negligible. In addition, yarn always came with its own set of
problems.

 Reasons to stick with NPM 
--------------------------

1.  There are no noticeable differences between Yarn and NPM

2.  NPM has been borrowing features from Yarn.

3.  NPM has it's own package lock.

4.  NPM Ci, will tell differences between package.json and
    package.json.lock.

That's really all the argument there is need to be had. At this point in
time Yarn really does not offer anything valuable in ways of NPM.
However, having the entire team use Yarn, when it doesn't come at a
particular advantage and at times at a dis-advantage does not make
complete sense.

So, if your team is curious which package manager to go with, unless
they have a personal preference as a collective unit, feel free to tell
them NPM.
