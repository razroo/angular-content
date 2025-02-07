---
title: Angular Material Typography
---

Typography at a design level, is a way of presenting text in an
attractive fashion. In particular, this is in three areas:

1.  Decipher difference between letters.

2.  Make blocks of elements, such as paragraphs, or headers, easy to
    distinguish between each other.

3.  Have text that draws you in, or speaks to you as a reader. It should
    ideally be unique to your brand.

Typography, at a functionality level is a paradox. At its core, it is
not that complex. There maybe are 10-20 different html elements to keep
in mind. However, because those 10-20 different elements get used
literally everywhere, it makes typography the single most used item in
your site. Typography, while it by nature design, and therefore involves
less functionality, it should still be treated with the same gravity as
UI architecture.

This book, as well as the creators (i.e. Razroo), are strong believers
of using Material Design as part of your MVP. After that, moving onto
some sort of other design language system as soon as your product is
validated. So we recommend the use of Material Design with Angular, and
do indeed use it throughout the book. Understanding how to override the
Material typography, so that you yourself can do it, and let your
message, and brand bleed through the text is important!

Understanding Different Levels of Typography in Angular Material
----------------------------------------------------------------

Let us begin at ground zero and discuss the different levels of Angular
Material Typography. The easiest way do this, is to dissect the core
sass function for the Angular Material typography config. Razroo has
also added comments, to make it appropriate for the context of this
book.

```scss
// Represents a collection of typography levels.
// Defaults come from https://material.io/guidelines/style/typography.html
// Note: The spec doesn't mention letter spacing. The values here come from
// eyeballing it until it looked exactly like the spec examples.
@function mat-typography-config(
  $font-family:   'Roboto, "Helvetica Neue", sans-serif',
  // Large, one-off header, usually at the top of the page (e.g. a hero header).
  $display-4:     mat-typography-level(112px, 112px, 300, $letter-spacing: -0.05em),
  // Large, one-off header, usually at the top of the page (e.g. a hero header).
  $display-3:     mat-typography-level(56px, 56px, 400, $letter-spacing: -0.02em),
  // Large, one-off header, usually at the top of the page (e.g. a hero header).
  $display-2:     mat-typography-level(45px, 48px, 400, $letter-spacing: -0.005em),
  // Large, one-off header, usually at the top of the page (e.g. a hero header).
  $display-1:     mat-typography-level(34px, 40px, 400),
  // Section heading corresponding to the <h1> tag.
  $headline:      mat-typography-level(24px, 32px, 400),
  // Section heading corresponding to the <h2> tag.
  $title:         mat-typography-level(20px, 32px, 500),
  // Section heading corresponding to the <h3> tag.
  $subheading-2:  mat-typography-level(16px, 28px, 400),
  // Section heading corresponding to the <h4> tag.
  $subheading-1:  mat-typography-level(15px, 24px, 400),
  // Bolder body text.
  $body-2:        mat-typography-level(14px, 24px, 500),
  // Base body text.
  $body-1:        mat-typography-level(14px, 20px, 400),
  // Smaller body and hint text.
  $caption:       mat-typography-level(12px, 20px, 400),
  // Buttons and anchors.
  $button:        mat-typography-level(14px, 14px, 500),
  // Line-height must be unit-less fraction of the font-size.
  // Form input fields.
  $input:         mat-typography-level(inherit, 1.125, 400)
) {
  // ..rest of function goes here
}  
```

There are a total of 13 typography items, which we have the ability to
override. To understand how these feed into general components
throughout the site, let's take two a look at two examples. This is so
that we can get an intuitive sense as to how we can create our own
typography based on Angular Material Design.

### Angular Material Cards

Let's dissect the typography Sass mixin the Angular team uses for the
material card component.

```scss
@mixin mat-card-typography($config) {
  .mat-card {
    font-family: mat-font-family($config);
  }

  .mat-card-title {
    font: {
      size: mat-font-size($config, headline);
      weight: mat-font-weight($config, title);
    }
  }

  .mat-card-header .mat-card-title {
    font-size: mat-font-size($config, title);
  }

  .mat-card-subtitle,
  .mat-card-content {
    font-size: mat-font-size($config, body-1);
  }
}
```

1.  Title - Uses the config relating to `h2` for size (`$headline`), and
    weight of equivalent config for `h3`.

2.  Title within Header - Uses the config equivalent for (`h3`) through
    out.

3.  Subtitle and Content - Uses smaller body config (`$body-1`).

This gives us a bit of an idea. The config, as expected, directly
correlates to the purpose of the mat-card to give extra importance. It
also brings home, that mat-card isn't meant to directly encompass main
content of the page. (However, once again, it's ultimately you who get's
decide how you want to use something.)

Dynamics of Applying Angular Material Typography Globally
---------------------------------------------------------

It is important to note, that the Angular Material theme will not by
default change native global HTML elements. HTML Elements such as
headers (`<h1>, <h2>, <h3>`), list items(`<li>`), and `<p>` tags will
not be styled by default. However, Angular Material Design design does
have it's own internal typography system, that can be seen here:

```scss
@mixin mat-base-typography($config, $selector: '.mat-typography') {
  .mat-h1, .mat-headline, #{$selector} h1 {
    @include mat-typography-level-to-styles($config, headline);
    margin: 0 0 16px;
  }

  .mat-h2, .mat-title, #{$selector} h2 {
    @include mat-typography-level-to-styles($config, title);
    margin: 0 0 16px;
  }

  .mat-h3, .mat-subheading-2, #{$selector} h3 {
    @include mat-typography-level-to-styles($config, subheading-2);
    margin: 0 0 16px;
  }

  .mat-h4, .mat-subheading-1, #{$selector} h4 {
    @include mat-typography-level-to-styles($config, subheading-1);
    margin: 0 0 16px;
  }  
  // ...
}
```

In the above, we can see that Angular Material stays true to the
Material spec, and applies the respective style. I.e.

1.  .mat-h1 - headline

2.  .mat-h2 - title

3.  .mat-h3 - subheading-2

4.  .mat-h4 - subheading-1

This is true for all of other global typography HTML elements as well.

### Code Example

There is a class that one can use called `.mat-typography` that the
Angular Material library provides. To apply it globally, you can apply
it on the div wrapper for your content:

```html
<div class="page-wrap">
  <razroo-header></razroo-header>
  <div class="content mat-typography">
    <router-outlet></router-outlet>
  </div>
  <razroo-footer></razroo-footer>
</div>
```

Realizing That Material Specs Do Not Cover Everything
-----------------------------------------------------

It is important to realize, that the Material specs will not cover every
use case. In particular, this is exemplified by code inside of the
`\_theming.scss` file.

```scss
  // Note: the spec doesn't have anything that would correspond to h5 and h6, but we add these for
  // consistency. The font sizes come from the Chrome user agent styles which have h5 at 0.83em
  // and h6 at 0.67em.
  .mat-h5, #{$selector} h5 {
    @include mat-typography-font-shorthand(
        // calc is used here to support css variables
      calc(#{mat-font-size($config, body-1)} * 0.83),
      mat-font-weight($config, body-1),
      mat-line-height($config, body-1),
      mat-font-family($config, body-1)
    );

    margin: 0 0 12px;
  }

  .mat-h6, #{$selector} h6 {
    @include mat-typography-font-shorthand(
        // calc is used here to support css variables
      calc(#{mat-font-size($config, body-1)} * 0.67),
      mat-font-weight($config, body-1),
      mat-line-height($config, body-1),
      mat-font-family($config, body-1)
    );

    margin: 0 0 12px;
  }
```

As you can see in the above example, core Angular Engineers have had to
comment inside of their core code base, that the spec doesn't have
anything that correlates, but they have created styling for consistency
sake. In the same vein, it is important to realize that Material Design
will not cover all use cases that you need. You will have to use your
general sense of what Material Design covers in order to fill in the
gaps where there is nothing mentioned specifically in the specs.

Mat Typography Customization
----------------------------

Within Angular Material we have the ability to customize internally the
material typography config:

```scss
@import '~@angular/material/theming';

// Define a custom typography config that overrides the font-family as well as the
// `headlines` and `body-1` levels.
$custom-typography: mat-typography-config(
  $font-family: 'Roboto, monospace',
  $headline: mat-typography-level(32px, 48px, 700),
  $body-1: mat-typography-level(16px, 24px, 500)
);
```

Once we have created our config we can use it in one of four ways:

1.  Override Typography CSS classes(e.g. `mat-h1, mat-display-1, etc.`)
```scss
@include mat-base-typography($custom-typography);
```

2.  Override typography for a specific Angular Material component.
```scss
@include mat-checkbox-typography($custom-typography);
```

3.  Override typography for all Angular Material
```scss
@include angular-material-typography($custom-typography);
```

4.  Override typography in the core CSS
```scss
@include mat-core($custom-typography);
```

My personal favorite is to use `mat-core`, just because it anyways has
to be included atleast once per project.
