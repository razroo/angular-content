# latex-documentation
The optimal template and build system for writing documentation using latex

I have found the following build is particularly good when used in dual monitor
setup. It allows for one to have one's terminal on one screen and the pdf open
on another screen. One is therefore able to compile .tex to pdf running the wr
command and it will automatically update the pdf every time file is saved.

## In order to get this build going ##

### Install MacTex ###

Download MacTeX. MacTeX installs everything you need to compile tex files into
PDFs. This will take a while, so grab a coffee, a tea, or take a walk, or what
not.

### Install Skim (for previewing PDFs) ###

LatexTools makes use of Skim for previewing works-in-progress.
Download and install [Skim](http://skim-app.sourceforge.net/).
On OS X Yosemite, I installed version 1.4.17.

In addition, to make sure that pdf automatically refreshes when pdf is updated
once skim is installed, goto Skim -> Preferences -> Sync and check the box for
"Check for file Changes"

### Command line ###
```
npm install
pdftex main.tex
npm start
```

Anytime you come back to this project and want to start editing again, just run
`npm start`

That's it and enjoy your latex build!
