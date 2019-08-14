 Lazy Loading Modules 
=====================

One of the more initially overlooked pieces of UI Architecture, is with
regards to lazy loading. Lazy loading, if not already familiar, is the
concept of loading something when it is required, rather than all at
once on page load. Similar to how lazy people only do things when it is
required of them, lazy loading will only load when it is required for
the page it is navigating to. With regards to Angular, lazy loading is a
routing/module architecture, and heavily tied to routing.

The main benefit of lazy loading, is so that on initial load of the web
page, we drastically decrease the bundle size. This improves user
experience. Thankfully, Angular makes it relatively easy to include a
lazy loaded module into the app. The Angular CLI even has a command, for
easily setting up a lazy loaded route. However, before we go ahead and
show the command, that automatically scaffolds lazy loading for us,
let's discuss how to add a lazy loaded route if we were to do that
process manually.

Adding a Lazy Loaded Module Using Angular CLI
---------------------------------------------

      ng g lib about --routing --lazy --directory=razroo

This command will automatically add a module to our lib. In addition,
will modify the route within the about.module.ts, so that it can be used
as a lazy loaded route.

What We Should Edit Post Generation
-----------------------------------

Now that we have generated a route for our \"about\" page, let's make
the two edits required post CLI generation.

### Editing app.module.routing.ts File

Edit one, will be in our main `app.module.routing.ts` file:

    {
      path: 'about',
      loadChildren: () =>  
        import('@razroo/razroo/about').then(
          module => module.RazrooAboutModule
        )
    },

[^1]

You will notice two things in the above code:

1.  A `path` key, standard for Angular routing, to specify what module
    should be loaded when navigating to a specific route.

2.  A `loadChildren` key, which calls a function followed by the
    standard syntax for importing a module.

In addition, being that we are using Nrwl Nx (which this book is
littered with) the import path is using our Nx workspaces shortened
path. Here that would be the `razroo-workspace/razroo-lib/lib-name`.

The second edit for us to make, will be in the actual module for our
about page:

    @NgModule({
      imports: [
        //...
        RouterModule.forChild([
          {path: '', pathMatch: 'full', component: AboutComponent}
        ])
      ],
      declarations: [AboutComponent]
    })
    export class RazrooAboutModule {}

The above is the cookie cutter process involved with creating a lazy
loaded module within an Angular application. Thankfully, due to Angular,
it is relatively painless process for what it is accomplishing. It is
architecture that is worth implementing early on in the app. In
particular, it might save you from circular dependency nightmares later
on.

[^1]: Just in case you are familiar with a different syntax, this is the
    latest syntax for Angular 8+.
