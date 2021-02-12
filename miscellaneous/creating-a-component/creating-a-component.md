---
title: Creating a component
---
the definition of a component is something constituting of a larger
whole. Ideally anything we can turn into a component in an Angular
environment will help us. In addition, anything which we can re-use
across the app, is beneficial as well.

When creating components, Angular also makes use of modules. A module is
an independent unit, which is used to construct a larger interrelated
construct.

Angular stays true to these two definitions. A component can only be
declared by one component. If it is used by two, or more Angular will
complain, saying that it is already used by another component. Which by
definition only constitutes a larger whole. A module on the other hand,
is simply an independent unit. If we ever want to use our component with
two components, we will need to include it as part of a module.

As general good practice, whenever creating a component (unless that
particular component has children), to always create it with a module.

We have already created a component as needed for our router, but for
redundancy sake here are the steps again.

Also, because we will be using sass, let's make sure that our cli is
using sass. Open up the .angular-cli.json file, and change two areas.
One:

```
  ng set defaults.styleExt scss
```

This will make it, so that whenever we set up our components using the
cli, again it will be in sass. Second, change your existing styles.css
file to styles.scss.

Let's use the cli to create our first module called choose size.

```
  ng g module choose-size
  ng g component choose-size --exports
```

(The file at this time is included in our app as a route. Let's remove
the default nrwl text from app, so that all we have is choose-size
works.)

## Architecture time

Before, we haphazardly created a component in order to introduce
routers. Now that we are going to work on our actual component, let's
set aside to specific items with regards to architecture.

Whenever we want to create a page for our application that will be used
as a route, it is a container. Something which is simply there to
"contain" all of our components. In the root of our app directory we
are going to create a container folder. We are once again borrowing from
the example-app project in ngrx/store.

```
  mkdir containers
```

We will also be needing to mention, that we will be moving our
choose-size directory to a newly created components folder.

cd into your containers folder, and create a choose-size-page
module/component:

```
  ng g module choose-size-page
  ng g component choose-size-page
```

In this choose-size-page component, we will be adding our choose-size
component.

In order to do so, we will need to import the choose-size component in
our Angular app, and add it to our choose-size-page module like so:

```{caption="Importing
import { ChooseSizeModule } from  '../../components/choose-size/choose-size.module';

@NgModule({
  imports: [
    CommonModule,
    ChooseSizeModule
  ],
  declarations: [ChooseSizePageComponent]
})
```

In addition, we are going to want to make sure to add an exports
key/value to our choose-size module, so that by importing it, we have
the respective component available as well.

```{caption="Adding
  @NgModule({
   imports: [CommonModule],
   declarations: [ChooseSizeComponent],
   exports: [ChooseSizeComponent]
  })
```

With the component module properly imported, we can now use the
component in our choose-size-page html file:

```
// choose-size-page.component.html
<app-choose-size></app-choose-size>
```