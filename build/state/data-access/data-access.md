 State Directory Structure 
==========================

When you start an Angular project for the first time, it can be
increasingly difficult to manage ngrx/store.

State, while it should ideally be tied to a feature, as the app moves
on, might not necessarily be tied to a specific feature, or page. State
as a single giant object is global by nature. It takes up a large
portion of any app.

It makes sense to put all state in a single repository, so that state
within the app can be transparent. For testing purposes, state is a very
large chunk of business logic for app and deserves it's own module for
bundling, and testing purposes.

Data Access Folder/File Structure 
----------------------------------

State is used as a method for accessing data, an appropriate name for
the folder/file tree for state makes sense to be called \"data-access\".
It will look something like the following:

All of the state related code is contained within a single folder. By
doing so, it solves all of the above three issues:

1.  State is global, and therefore can now be used by multiple features

2.  We have the ability to run ng test
    --project=px-illustrator-data-access-code-box and it will run code
    specifically for this data-access feature state

3.  By globalizing naming convention, we can streamline naming
    convention of all global files intended towards working towards the
    same purpose. Namely, our data-services, and features.

4.  In addition, it alleviates the potential issue of circular
    dependencies. If, for instance, we have feature folder A, and
    feature folder B. B might need state from A, and A might need
    feature state from B. By keeping all of our state global, it helps
    us circumvent this circular dependency problem.
