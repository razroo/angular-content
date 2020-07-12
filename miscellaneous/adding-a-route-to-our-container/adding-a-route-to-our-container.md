 Adding a Route to Our Container 
================================

At this point, being that we did not initialize our app with routing
[^1], we will need to add a routing file to our app. In our app root, we
will be adding an app.routing.module.ts file.

It will look something like the following:

``` {caption="app.routing.module.ts file"}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseSizePage } from './containers/choose-size-page/choose-size-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'choose-size',
    pathMatch: 'full'
  },
  {
    path: 'choose-size',
    component:  ChooseSizePage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

In it, we are redirecting the default path to go to the choose-size url.
When the url switches over to choose-size path, it will load the
choose-size component. We are also obviously going to import the
AppRoutingModule in our app.module.ts file:

``` {caption="app.module.ts file"}
import { AppRoutingModule } from './app.routing.module';
@NgModule({
  imports: [
    //...
    AppRoutingModule,
    //..
```

We are also going to delete the competing:

``` {caption="app.module.ts file"}
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'choose-size',
          pathMatch: 'full'
        },
        {
          path: 'choose-size',
          component: ChooseSizeComponent
        }
      ],
      { initialNavigation: 'enabled' }
    ),
```

That we had in our app.module.ts, to tidy up that app a bit.

Terrific, we now have our app by default re-routing to the choose-size
url path and loading the choose-size component. Let's move onto styling
real quick next.

[^1]: So that we may learn as we develop
