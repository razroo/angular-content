 Pixel Grid Container 
=====================

Now that we have created our Choose Size Form, let's go ahead and create
our own route for our presentation container.

 Create Pixel Grid Container Component 
--------------------------------------

    cd containers
    ng g module pixel-grid-page
    ng g component pixel-grid-page --export

 Import Pixel Grid Container Component 
--------------------------------------

In your app module, import the pixel-grid-page module. In the app
routing module, create a route for the pixel-grid-page.

    //app.module.ts
    + import { PixelGridPageModule } from './containers/pixel-grid-page/pixel-grid-page.module';

      ChooseSizePageModule,
    + PixelGridPageModule,
      NxModule.forRoot(),

 Set up Router Link 
-------------------

In any situation wherein a page has been created with routing, we are
going to need to create a routeLink, which will hook into the route
which will be created. In particular, in our app, we will be creating a
routerLink on the Create Pixel Grid button.

    //choose-size.module.ts
    + import { RouterModule } from '@angular/router';

    + RouterModule,

    //choose-size.component.html
    + <button routerLink="/pixel-grid"

    + RouterModule,