 Format all the things 
======================

In a Nrwl setting, we have a format npm script that is available to us
by default. It looks something like this:

      nx format write

This will call a .prettier file that has been created by the nx
workspace command. It will automatically format files for you based on
the settings inside the file. It's like a pro-active linter that will
format code for you.

There are two things you should also know about prettier:

1.  You will have to format your tslint, so that it does not compete
    with prettier.

2.  You are going to want to hook up prettier with your IDE, so prettier
    can go to work without having to run it in your terminal.

 How to add prettier to Webstorm 
--------------------------------

Here's how to add prettier to Webstorm.

![image](dev-tools/linting/format-all-the-things/prettier-file-watcher-webstorm)
