 Testing Cypress Locally With Authentication 
============================================

There is going to be the need to add authentication to your application.
This translates to a log in process to verify your identity.

The difficulty with this is that all enterprise organizations re-direct
the user to an alternate link to log in.

After a user logs in with username and password, this individual will
then be re-directed to appropriate app. This re-direct will trigger a
CORS issue. The error usually looks something like the following:

    CypressError: Cypress detected a cross origin error happened on page load:

    Blocked a frame with origin "url" from accessing a cross-origin frame.

If you want to test locally, and see your updates in real time, you will
need to get around this CORS issue.

Steps to Solve Cors Issue
-------------------------

1.  Add the following to your `plugins/index.js` file

        module.exports = (on, config) => {
          on('before:browser:launch', (browser = {}, args) => {
            console.log(config, browser, args);
            if (browser.name === 'chrome') {
              args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process");
              args.push("--load-extension=cypress/extensions/Ignore-X-Frame-headers_v1.1");
            }
            return args;
          });
        };

2.  Add the following to your `cypress.json` file
    `chromeWebSecurity: false`

3.  Change the appropriate environment url to use localhost (might be
    different in your development environment) in the cypress.json file.
    `test_url: "http://localhost:4200",`

4.  Download the [Ignore X-Frame
    Headers](http://chrome.google.com/webstore/detail/ignore-x-frame-headers/gleekbfjekiniecknbkamfmkohkpodhe)
    plugin within Cypress launched browser. Will remain downloaded, even
    when you end your Cypress session.

Friendly Reminder
-----------------

These four steps are all you will need in order to run Cypress locally.
Ideally your organization should have special urls to run your apis in a
test environment. If that is the case, do not forget to change them in
your environment.ts file.
