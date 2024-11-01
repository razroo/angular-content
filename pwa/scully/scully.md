---
title: Scully - Static Site Generation for Angular
---

Traditionally, static sites are just that - static. They didn't change
and what you coded is essentially what you'd get. However, with the
growth of APIs, the idea of JAMstack - that is, JavaScript, APIs, and
Markup - grew in popularity.

By 2017, enterprise-level JAMstack projects started to make an
appearance, with the first JAMstack conference commencing in 2018.

The idea behind JAMstack is that you can run entire websites without the
need for server side code. This leaves you with the ability to focus on
your front end experiences and reduce server response times for pages
significantly. Your data needs are covered by APIs, with JavaScript
dealing with the necessary connections between APIs and what users get
to experience.

Scully sits in the sweet spot of being Angular's first static site
generator that is helping fuel the growth of Angular based JAMstack
sites.

Under normal Angular circumstances, we'd lazy load each component as
they're needed. When it comes to JAMstack, pre-generated static pages
are required. This means that if JavaScript is disabled for whatever
reason, the site will continue to work.

When using Scully, you're essentially adding an additional step to the
build process that compiles and builds the required static pages, in
addition to the ability to generate the required code with the help of
'plugins' to get started.

The fun part of Scully is that the code generated can be unit tested.
This means that Scully can be implemented and integrated into your
projects with end to end testing capabilities.

In part, this is because the code generated fits neatly into the Angular
code seamlessly.

Getting started with Scully - the static part
---------------------------------------------

Scully can sit on top of any existing Angular project and can easily be
added via the CLI.

To add Scully to a project, simply use the following commands while in
the root folder of your project.

    ng add @scullyio/init

To build and run with Scully, use the following commands:

    ng build
    npm run scully

Once you've done this, you'd find static files inside your dist folder.
A folder called static will appear alongside your application folder.
Viola! You've just converted your existing Angular app into a JAMstack,
static (but still data dynamic capable) site.

Getting started with Scully - the generator part
------------------------------------------------

The perk with Scully is that it allows us to generate a blog using
Angular's generation schematics. What this means is that you can use ng
generate to create Scully templates.

To generate a simple blog, use the following command:

    ng g @scullyio/init:blog

This command will create a blog module with the required routes. You'll
also get a blog folder with some markdown files. Every time Scully
builds, the markdown files will be rendered into HTML.

To create your first post, use the following command:

    ng g @scullyio/init:post --name=”the-first-post”

If you look at your blog folder, you'd find a file called
the-first-post.md with some markdown content inside.

When you want to run the blog, you'll need to build it because Angular
can't read markdown and the contents of the post will need to be
compiled into HTML.

Every time you build, the markdown will be converted into the necessary
code and cut down on server response time because it's serving from
generated static files.

To serve your Scully site, run the following command:

    npm run scully serve

It's time we talked about Scully services Creating a Scully service is
similar to creating a typical Angular service. What a Scully service
enables your app with the ability to tap into the pre-rendered pages and
display the content as needed.

To do this, you need to import ScullyRoute and ScullyRoutesService into
your component and then initialize it as an Observable.
ScullyRouteService is a pre-written service by Scully and comes packaged
with the library.

    import{ ScullyRoute, ScullyRoutesService } from ‘@scullyio/ng-lib'
    …
    …
    export class AppComponent implements OnInit{
       posts$: Observable<ScullyRoute[]>;
       constructor(private srs: ScullyRoutesService){ }
    }

    To connect and display it in your view:

    <ul>
       <li *ngFor=”let post o posts$ | async”>
          <a [routerLink]=”post.route”>{{post.title}}</a>
       </li>
    </ul>

What about Angular Universal?
-----------------------------

Angular Universal has been around for a while and is the natural
solution to single-page apps SEO related rendering woes.

The similarities between Angular Universal and Scully lies in their
pre-rendering aspect. However, Angular Universal and Scully diverge on
how pre-rendering is done, thus marking the end of their main comparison
point.

When it comes to Angular Universal, there is server-side rendering
involved. This means that pages are built on the fly and then sent over
to the client-side. On a technicality, Angular Universal is not JAMstack
because it involves server-side rendering and is not a truly statically
generated site.

Scully however, comes pre-rendered at deployment. This works well if the
content deployed is not expected to change over time - making it perfect
for blogs and blog posts.

While Angular Universal is pretty simple in approach - generate a
pre-render on the server-side to give to client-side - Scully's
methodology runs at two levels.

The first level is that the pre-rendered page is given to the user when
requested. The second level is the actual 'real' Angular app that sits
in the background on top of the pre-rendered view. So what you're
essentially getting is the pre-render for a particular view (if
available) and the actual app - rather than the app and then the page.

This cuts down on the initial delay and the need to call your database
for data. As a result, Scully can help reduce the read loads on
databases in the long term, allowing for more cost-effective ways to
scale. This is because reading static files is much lower in cost than
reading from a database.

Final thoughts
--------------

It may not seem like a big deal but static site generation is a
rendering concept that reduces overall server loads and increases the
potential to scale in a cost-efficient manner. Scully is an exciting
community development because it automates the pre-rendering process and
contributes greatly to the JAMstack ecosystem.

Another perk of pre-rendered single-paged apps that are not widely
discussed enough is how it impacts on SEO and the ability to rank
effectively on search engines.

The issue that many new developers face with SPAs is that their app may
be working but fails to get picked up by major search engines because
crawlers and bots are simple in design and work best on content that is
not dynamically generated.

This problem is fixed when you use Scully as all pages are pre-rendered
and load data only when you navigate away and into a space that requires
dynamic content.

Integrating Scully into your existing development workflow to leverage
the ability to generate static content is something that can be easily
done. It is just a matter of importing Scully as a module, building the
project and then running it. This entire process can be scripted inside
your package.json scripts section.

As Scully grows, the ecosystem surrounding Scully is also expected to
grow in the same way it did with Angular Universal. While there is
debate if Scully will replace Angular Universal completely, it's still
too early to make any dramatic conclusions.

Scully, after all, is still quite new.

Scully does, however, provide a methodology that's highly needed but
unsupported effectively for blog related activities. The Internet is
built on content and Scully is a tool that helps Angular developers get
a leg up on supporting parts of the app that's traditionally linked with
content that's unlikely to change often.
