<p align="left">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://cdn-images-1.medium.com/max/706/1*aLhaswytPZlnugBsDTQUfQ@2x.png" width="200" />
  </a>
</p>

# Official Repo for all Razroo Angular Content

# Background: Razroo Markdown Engine

The Razroo Markdown Engine is a Razroo engineered markdown engine, layered on top of Remark. For the most part, it uses libraries already available, with the exception of the embed code functionality. The Razroo Markdown engine does the following: 

1. Allows use of variables in markdown. E.g. 

e.g. “in this `{{section}}` “ will be “in this article” when building to the Razroo blog. When building to the book, it will be, “in this book”.

2. Allows for the ability to embed Github code by using the Github link syntax, using the following syntax:

https://github.com/razroo/razroo-fully-architected-dashboard/blob/master/libs/data-graphql/src/lib/data-graphql.module.ts#L1-L7

will compiled to: 
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class DataGraphqlModule {}
```

3. Converts Markdown to HTML.

## Reason for Razroo Markdown Engine

The reason for creating the Razroo Markdown engine is twofold: 1. Have a pseudo-autonomous workflow, for updating technical content. (will go into detail on this a bit more).

2. Allow for a single source of content, to be built out to multiple platforms.

# Workflow

## Netlify / Technical Writers 

Using the [Netlify CMS](https://angular-the-full-gamut-markdown.netlify.app/admin), for a particular category, e.g. Angular, Technical writers update content.

Technical writers use variables, and GitHub links to produce content. 

Using Netlify, there is a review process specifically from an editing perspective. 

When content is published, that content is then made as a commit on the specific content repo e.g. “Angular: The Full Gamut”. 

Software Engineers, i.e. non-writers look over the content really quick to make sure the code checks out. 

## Psuedo Autonomous Workflow

If code ever changes, i.e. code embedded is now different than what it was prior, then writers are notified via a new commit. 

A Jira ticket is made automatically and assigned to the lead technical writer to modify content. 

The lead technical writer for that project assigns the ticket to a writer to work on within a 2-week sprint. 

That’s all for the pseudo-autonomous workflow for content.

## If Code Is Not Available

Let’s say the technical writer is trying to write an article and it the respective code is not available. The technical writer creates a ticket, with a “High” urgency and passes that over to the tech lead. This ticket includes a file path/url, as well as a `<code goes here>`. The technical writer continues to write as if code exists. The developer will go in later on and submit the code in the appropriate place. 

# Build Process

## Building to a book

We use a library called markdown-include. Using this library, we create a singular main.md file, which contains an include and file path. e.g. 

#include ./introduction/introduction.md

This allows us to set the order of chapters in a more structured manner. This singular file, is then built using the razroo markdown engine, and transferred to the build folder. Final HTML file can be seen here: `build/book/main-book.html`.

### TODO Markdown Include --> JSON Schema
We plan on, moving forward, to transfer the repo from `markdown-include` over to json, similar to how we build for articles. This will allow us to re-use the same schema for the build process, and how we serve the files over the backend. 

## Articles 

### Building Articles 

Articles are built using the `articles.json` file. To build articles:
```
npm run build:articles
```

The JSON file contains three parts: 

1. `category:` - Category of content. Used for search/content filtering.
2. `author:` - Name of author to be displayed in blog. 
3. ```files: [{}]``` - Array of files to be built as articles.
    1. `path:` - Path of file to be built.
    2. `UID:` - Unique identifier and consists of 8 charachters. Created when article is built. Used to make sure that if another article, or route path, is created with the same name is an alternate category, it does not cause build errors. UID is only passed to api on creation. It is passed through on update of article. This UID could technically be built into api on backend side of things. 
    3. `id:` - Id created via the backend. When using the `npm run publish:articles` api.

### Publish Articles 
```
npm run publish:articles
```

This will both update existing articles, and create new articles. The `npm run publish:articles` algorithm knows whether or not an article exists by the `id:` key/value. If an id exists, then the alogorithm will know to update. If id does not exist, the alogrithm will know to create a new article. 

### Articles 

The order in which articles uploaded does not matter. More so the created at, and updated at is more important. Razroo Blog, using Netlify to Strapi crossover. Strapi API will then have complete control over all of the blog content. We are currently working to move over to nextJS. 

Technical Articles will not be able to be created from the actual Strapi blog. Only non-technical content. However, we are going to apply the same Razroo Markdown Engine logic to non-technical content as well. 
