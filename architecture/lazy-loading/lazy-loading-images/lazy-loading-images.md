 Lazy Loading Images 
====================

Even though we discussed lazy loading modules, we might also want to
lazy load the content inside of the lazily loaded modules. There is a
very popular article from
[Google](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/)
that is generally spread around with regards to performance for
webpages. In short, it presents the following very persuasive set of
data:

@ l \*4c @ As page load time increases\
Seconds & Probability of Bounce\
1s to 3s & Increases by 32%\
1s to 5s & Increases by 90%\
1s to 6s & Increases by 106%\
1s to 10s & Increases by 123%\

As we can see with the data presented above, performance of our webpages
are very important. More so it presents the data very clearly that the
faster a webpage is, the higher probability there is to retain our user
base.

The Idea of Lazy Loading Images
-------------------------------

There are, of course, many different ways to increase performance. The
intent of this chapter, however, is just to discuss the one performance
boost that is gained by lazy loading images. The idea of lazy loading
images, similar to lazy loading modules in general, is to load an image
only when a user get's to that image.

### Side bar - User Experience and Lazy Loaded Images

It is important to note, that we do not want to lazy load all images
that are present on our page. For instance, imagine that we were
creating a blog for our website. On each single blog page, we have a
feature image that shows up first for our blog. In addition, we have
more images that show up throughout the remainder of the blog. It can be
strongly argued that lazy loading should not be applied to the feature
image. Because, it would potentially cause an awkward experience for the
user, to load the page and then wait an additional second to see what
the feature image looks like.

Therefore, when creating lazy loaded images, it is important to not
create a blanket rule that will apply to all images. Rather, those
images which are not primary to the page, those should be lazy loaded.

 Real Talk - Implementing Lazy Loading 
--------------------------------------

Within Angular, there would be a way to implement lazy loading from
scratch.

The simplest solution I've seen is wrapping an Angular Directive around
the `Intersection Observer` api. It will allow you to determine when an
element is in the viewport. This
[approach](https://blog.angularindepth.com/a-modern-solution-to-lazy-loading-using-intersection-observer-9280c149bbc),
works great, however, there are readily available npm plugins that do
this for Angular. While the author of the aforementioned article did
create their own [plugin](https://github.com/TradeMe/ng-defer-load)
there is another that is much more mature. It implements the
intersection observer as well, and is called `ng-lazyload-image`.

ng-lazyload-images
------------------

Razroo's preferred package is ng-lazyload-image. It is the most mature
of all packages in the Angular eco-system, has the most stars, and
fantastic documentation.

### Install

``` {.bash language="bash"}
npm install ng-lazyload-image --save
```

### Setup

``` {language="javascript"}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- import it
import { AppComponent } from './app.component';

@NgModule({
    declarations: [ AppComponent ],
    imports: [ BrowserModule, LazyLoadImageModule ], // <-- and include it
    bootstrap: [ AppComponent ]
})
export class MyAppModule {}
```

``` {language="javascript"}
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image'; // <-- include intersectionObserverPreset
  import { AppComponent } from './app.component';
  
  @NgModule({
      declarations: [ AppComponent ],
      imports: [
        BrowserModule,
        LazyLoadImageModule.forRoot({
          preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
        })
      ],
      bootstrap: [ AppComponent ]
  })
  export class MyAppModule {}
```

Example Use Case
----------------

The following is an example use case, of how to create a lazy loaded
image with ng-lazy-load:

``` {language="javascript"}
import { Component } from '@angular/core';

@Component({
  selector: 'image',
  template: `
    <img [defaultImage]="defaultImage" [lazyLoad]="image">
  `
})
class ImageComponent {
  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
}
```

The package also has examples for multiple other use cases such as
background images, responsive images, async images(i.e. `| async`) etc.

Transitioning Photos
--------------------

Something that you might want to do is add a transition to your photo,
so that it swaps out the defaultImage with the lazyLoaded image. Doing
something like this would be relatively straightforward. For instance:

    img.ng-lazyloaded {
      animation: fadein .5s;
    }
    @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }  

That is all it would take to put a transition effect on your photos.

 Hooking Up Lazy Loading To Our Back End 
----------------------------------------

In short, you would get all image urls from the actual GraphQL query.
You would put them underneath the `lazyload` directive. Just like that
you have lazy loaded configured.
