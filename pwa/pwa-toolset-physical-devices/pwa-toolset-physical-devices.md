---
title: PWA Toolset - Physical Devices
---

Here is a list of devices sizes you should support at minimum:

1.  Iphone 8

2.  Iphone 8 Plus

3.  Google Pixel 2

4.  Ipad (2018)

5.  Ipad Mini 4

 Browser Dependencies 
---------------------

The following is expected browser dependencies on Desktop:

1.  latest two Chrome releases

2.  latest two Firefox releases

3.  latest Safari

4.  latest Internet Explorer

5.  latest Internet Explorer

6.  latest Microsoft Edge

7.  Windows 10

8.  Windows 8

9.  macOS Sierra

 Testing Local Server on Physical Device 
----------------------------------------

Now that we have our physical devices that we would like to work on,
let's set up a way that we can test on these mobile devices. The
following three criteria should be solved:

1.  Url that remains the same for dev - to be used on mobile device

2.  When edit is made, it should update all mobile devides
    simultaneously

3.  Have all mobile devices in a central location, so that we can
    visibly see all changes that are being made

4.  synchronized interactions [^1]

 Ghost Labs 
-----------

Our winner for responsive testing is Ghost Labs. Ghost labs fulfills all
of the above criteria mentioned above. Going into short why we chose it
over all other contenders:

1.  Very easy to setup, and therefore removes overhead for initial setup

2.  There isn't anything required to install on different devices. It is
    simply a url that is used, and shared across device.

3.  Screenshots on remote mobile devices

4.  Ghostlab has a built in inspector for debugging

5.  One click workspace, in order to start up all devices once again.

6.  Presentation mode, allowing users to present web app.

###  Setting up Ghost Labs 

Buy the Ghost Lab Device Lab Selector. The whole point behind developing
on a physical mobile/tablet devices, is to improve developer workflow.
So that any change that happens, can be viewed immediately. The device
Lab selector serves that purpose.

![image](pwa/pwa-toolset-physical-devices/device-lab-stand){width="9.1cm"
height="6cm"}

Setting up ghost labs is as simple as running it in the mac application,
and being able to open on numerous devices. The following is a
screenshot of what you might see in your Ghostlab application:

![image](pwa/pwa-toolset-physical-devices/ghostlabs-screenshot){width="9.1cm"
height="6cm"}

Simply drag and drop the url of your browser into application. Click on
the play button. It will open up the above screenshot. You then have the
option of opening up the Ghost Labs generated url in any mobile device,
by simply scanning the qr code.

###  Notable Mentions of Ghost Labs 

1.  Synchronized browsing between different devices.

2.  Compile and refresh happens as if working with native CLI.

3.  Remote inspection of mobile devices.

4.  Remote screenshots.

###  Final Words on Ghost Labs 

With regards to setting up responsive development workflow, Ghost Labs
is next to none. The \$49 dollar licensing fee is chump change. The
amount of time saved on infrastructure, is worth the investment. The
device lab in addition to buying actual current devices might go up to
something in the ballpark of \$1,000 to \$2,500.

The engineers on your team have 8 hours a day to develop. Many times
taken up by meetings, architectural decisions, corporate events etc.
Allowing them to seamlessly develop, without having to re-configure
their browser is a time saver. Perhaps somewhere around 1 hour a week.
In addition, it helps promote developer happiness, by making their life
easier. At the end of the day, perhaps for this reason alone, it is
worth it.

[^1]: Clicking on a button in one place change it in all other places.
