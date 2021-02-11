---
title: Internationalization and Localization
---

Internationalization is the process of making sure your app can be used
by a worldwide audience. Localization is the process of changing app's
text to represent locale of user.

Localization differs from Internationalization.

Internatlization is a process of transforming your app to be user
friendly outside of your original geographical target. When building a
product, a team will often build the infrastructure first, based on a
particular language. Then they will want to make it so that the app can
be based on numerous different demographics. However, being aware of the
following ahead of time will make internationalization more of a
seamless process. This chapter goes through the entire process of
internalization and localization.

General Concerns of Internationalization 
-----------------------------------------

1.  What type of dates, numbers, percentages and currencies should the
    user get.

2.  Setting aside text in components, so they can be swapped out to the
    appropriate language.

3.  Plural words are different in different languages. It's important to
    have something baked within the framework that does this.

4.  Alternate text based on scenario(e.g. if person in New York display
    such and such event, if person in San Francisco display message such
    and such.)

General Concerns of Localization 
---------------------------------

There are three concerns with regards to localization:

1.  Creating multiple language versions of app(will get to how that is
    done)

2.  Extracting Localizable text(We will get to this, but in short create
    an enterprise grade source file, that only deals with the text to be
    translated)

3.  Building and servimg an app for a given locale.

Default Locale
--------------

Angular's internal framework uses the BCP47 norm. It's very important to
note that if you plan on building on top of Angular's localization
framework, that you use this as your standard within the framework.
Specifications for BCP47 change over time. However, this might not make
a difference within your application, as this only happens to subset.

Angular by default will use `en-us`. Therefore the default locale is
American English.

i18n pipes
----------

Angular includes within the framework, the ability to use something
called i18n pipes. i18n is an abbreviation of word
\"internationalization\". It's perhaps the world's most clever
abbreviation standing for \"i plus eighteen letters, plus the letter
n\".

(Graphic goes here for internationalization)

There is no actual pipe actually called the \"i18n\" pipe. However,
these four pipes:

1.  `DatePipe`

2.  `CurrencyPipe`

3.  `DecimalPipe`

4.  `PercentPipe`

do use the `i18n` internal logic, and will automatically modify
themselves based on the locale supplied within the app. As mentioned
earlier,Angular will only by default import `en-US`. If you want to use
other languages within the app.

### Import Locale Data for Other Languages

If you would like to import data for other languages, import them
locally within your `app.module.ts` file.

``` {caption="app.module.ts"}
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
```

 Understanding Translation Process 
----------------------------------

The Angular translation process definitely seems foreign, and even after
going through it a couple of times, it can be difficult to grasp the
whole picture. Here is Angular's 4-step translation process:

1.  It determines what is static text(as opposed to dynamic text
    retreived back from the backend), so that it can be translated.

2.  Uses the internal Angular CLI `i18n` command to transfer over
    determined translatable text to an industry standard translation
    file. (Need more information as to what this looks like.)

3.  Translates extracted text, into the target language. The dynamics of
    how this works, is that it edits the already existing file, to the
    targeted language.

4.  It then merges the translated file into the app, by replacing the
    original untranslated text, with the new translated text.

How to Make Content Translatable
--------------------------------

You might be wondering how to make content translatable. Angular
internally allows for content to be marked with the `i18n` tag like
such:

      <h1 i18n>i18n example</h1>

### Add a Description and a Meaning

Angular also offers the ability to add a description and a meaning to
the `i18n` tag.

``` {caption="i18n description"}
<h1 i18n="i18n tutorial text for internationalization chapter">i18n example</h1>
```

We can also add a meaning to the `i18n` tag, in additon, to our already
added description. The interface looks like this
`<meaning | description>`.

``` {caption="i18n \lstinline{<meaning | description>} Example"}
<h1 i18n="tutorial text|i18n tutorial text for internationalization chapter">i18n example</h1>
```

You might be wondering how offering a meaning and description will make
a difference to the translation of the application. The Angular
extraction tool preserves both meaning and description in the
translation source file. The translator then translating the source
file, it also can use the meaning and description to properly determine
how file should be translated. When using only a meaning, or a
description, the compiler will preserve the meaning, or description with
the compiled text.

#### Combination of Meaning and Description

However, the combination of meaning and description within your app,
will produce a specific id of a translation, taking the combination of
meaning and description, meaning is the main identifier in this process.
If the meaning is different, the Angular compiler produce a different
id. If the meaning is the same but the description is different the
compiler will still produce the same id.

Set a Custom ID for Persistence and Maintenance
-----------------------------------------------

For each file that the Angular translator produces, it will by default
attach an id to that file as well. It will look something like the
following:

``` {caption="example.fr.xlf.html"}
<trans-unit id="ba01234d3d68bf669f97b8d96a4c5d8d9559aa3" datatype="html">
```

When the text is changed the extractor tool will generate new text. You
must then go ahead and manually change the id.

### Setting up Custom ID

Angular will also allow you to set up a custom id for your translatable
text:

    <h1 i18n="@@sampleText">i18n Sample</h1>

The custom id persists even when text changes. This allows for
maintenance and scalability. Perhaps even the ability to hook an id into
a content management system, and allow for an admin to control
translation of different parts of the application.

### Using a Custom ID with a Description and/or Meaning

There is also the option within the app to use a custom id with the
description.

``` {caption="custom id with description"}
<h1 i18n="i18n tutorial text for internationalization chapter@@sampleText">i18n example</h1>
```

In addition, you can add meaning along with description to your custom
id:

``` {caption="custom id with meaning and description"}
<h1 i18n="tutorial text|i18n tutorial text for internationalization chapter@@sampleText">
  i18n example
</h1>
```

### Translating attributes

Text can be contained inside of an attribute such as `placeholder`, or
`title`. Due to the dynamics of how the `i18n` compiler works, if you
would like to translate the text within an attribute, you will have to
use the `i18n` flavored attribute. It follows the syntax of `i18n-x`
wherein `x` is the name of the attribute you want to translate.

    <img [src]="logo" i18n-title title="Razroo logo" />

 Regular Expressions - Pluralization \| Selections 
--------------------------------------------------

Different languages treat the plural form of a word different ways.
Angular offers a plural pipe out of the box. This is combination with
`i18n` allows for a very sophisticated method with regards to
internationalization.

    <span i18n>Updated {minutes, plural, =0 {just now} =1 {one minute ago} other {{{minutes}} minutes ago}}</span>

The plural pipe, allows for the specification of the following
categories:

1.  =0(or any other number)

2.  zero

3.  one

4.  two

5.  few

6.  many

7.  other

In the above code, we are specifying:

1.  Just now if the numbers of minutes is 0

2.  \"one minute ago\" if the number of minutes is 1

3.  and for every other amount we are specifying \"x minutes ago\"

By tagging in the `i18n` attribute into our span element, we are
translating the appropriate text based on the appropriate scenario.

### Alternative Text Messages

In addition to the scenario of plural text, another scenario to keep in
mind is when we want to select a certain text based on the variable
provided.

    <span i18n>The author is {gender, select, male {male} female {female} other {other}}</span>  

In the above text, based on whether, or not the author is a female, or
male, or other, we will allow for a specific type of text to be
displayed. In addition, being that we are supplying the `i18n` pipe to
our app, this text will appropriately be changed to the correct text
based on a certain localization.

### Alternative + Plural Combined

There is also the option is combine plural and alternative text message
capabilities together.

    <span i18n>Updated: {minutes, plural,
    =0 {just now}
    =1 {one minute ago}
    other {{{minutes}} minutes ago by {gender, select, male {male} female {female} other {other}}}}
    </span>

As you can see in the above code, the other section, is combined with
code for select. Absolutely wonderful.

Translation Source File
-----------------------

### Understanding the Angular Translation Process

Before describing how to create a translation source file, let's discuss
the purpose of a translation source file. The idea is, is that we have
tagged all files that we would like to translate, with the `i18n`
attribute (which really isn't an attribute, and is more a compiler
specific indicator, but I digress). After the source file is created, we
have an xml specific file. It will look something like this:

``` {caption="src/locale/messages.xlf"}
<trans-unit id="introductionHeader" datatype="html">
  <source>Hello i18n!</source>
  <note priority="1" from="description">An introduction header for this sample</note>
  <note priority="1" from="meaning">User welcome</note>
</trans-unit>
```

Now if we would like to create a french equivalent file, we would create
a source file with the `fr` suffix.

``` {caption="src/locale/messages.fr.xlf"}
<trans-unit id="introductionHeader" datatype="html">
  <source>Hello i18n!</source>
  <note priority="1" from="description">An introduction header for this sample</note>
  <note priority="1" from="meaning">User welcome</note>
</trans-unit>
```

### XLIFF Editor

This in an enterprise setting, the xlf file is usually sent over to a
french translator, who will then convert the English inside of these
french files, to french. They will use something called an XLIFF Editor,
which stands for textitXML Localization Interchange File Format. The xlf
file suffix stands for *XML Localization Format*.

### Create a Translation Source File

The Angular CLI has an internal mechanism for generating a translation
source file. Simply open a terminal window at the root of the app
project and run the `CLI` command `xi18n`.

    ng xi18n 

Personally, I like to create files inside of the app's `src/locale`
folder path. For that let's change the output path using the CLI:

    ng xi18n --output-path src/locale  

#### Generating Different Translation Formats

The Angular CLI also offers the ability to alter the format of the
outputted file.

1.  XLIFF 1.2 (default)

2.  XLIFF 2

3.  XML Message Bundle (XMB)

Respectively, that would be:

    ng xi18n  --i18n-format=xlf
    ng xi18n  --i18n-format=xlf2
    ng xi18n  --i18n-format=xmb  

#### Other Notable CLI options

The CLI also offers the ability to change the name of the translation
source file using the `--outFile` command option

    ng xi18n --out-file source.xlf  

There is also the option to change the base locale of your app, from the
default `US-EN` using the `--i18n-locale` command option.

    ng xi18n --i18n-locale fr

### Translate the source text

As mentioned earlier, when we were trying to understand the process
behind creating a source file, we mentioned that we will be creating
translation source files. We will then be going ahead and sending those
translation source files over to a translator. As standard practice
Razroo recommends a folder that can be used for the localization
process. We do this by using the `output-path` option mentioned before:

    ng xi18n --output-path src/locale  

and the file that will be generated will be the `messages.xlf` file:

``` {caption="src/locale/messages.xlf"}
<trans-unit id="introductionHeader" datatype="html">
  <source>Hello i18n!</source>
  <note priority="1" from="description">An introduction header for this sample</note>
  <note priority="1" from="meaning">User welcome</note>
</trans-unit>
```

Now after translation, and creating the respective French file, it will
look something like the following:

``` {caption="src/locale/messages.fr.xlf(after translation)"}
<trans-unit id="introductionHeader" datatype="html">
  <source>Hello i18n!</source>
  <target>Bonjour i18n !</target>
  <note priority="1" from="description">An introduction header for this sample</note>
  <note priority="1" from="meaning">User welcome</note>
</trans-unit>
```

In the above you will notice that we create a target equivalent XML tag.
This is used by the framework internally to say what the source should
be translated over to.

Translation Source File that includes plural and select expressions
-------------------------------------------------------------------

### Translating Plural

To translate a `plural` we only translate the text related values.

``` {caption="src/locale/messages.fr.xlf"}
<trans-unit id="5a134dee893586d02bffc9611056b9cadf9abfad" datatype="html">
  <source>{VAR_PLURAL, plural, =0 {just now} =1 {one minute ago} other {<x id="INTERPOLATION" equiv-text="{{minutes}}"/> minutes ago} }</source>
  <target>{VAR_PLURAL, plural, =0 {à l'instant} =1 {il y a une minute} other {il y a <x id="INTERPOLATION" equiv-text="{{minutes}}"/> minutes} }</target>
</trans-unit>  
```

### Translating Select

Similarly for select:

    <span i18n>The author is {gender, select, male {male} female {female} other {other}}</span>  

The Angular extraction tool, will break the above into two separate
parts:

``` {caption="src/locale/messages.fr.xlf"}
<trans-unit id="f99f34ac9bd4606345071bd813858dec29f3b7d1" datatype="html">
  <source>The author is <x id="ICU" equiv-text="{gender, select, male {...} female {...} other {...}}"/></source>
  <target>L'auteur est <x id="ICU" equiv-text="{gender, select, male {...} female {...} other {...}}"/></target>
</trans-unit>  
<trans-unit id="eff74b75ab7364b6fa888f1cbfae901aaaf02295" datatype="html">
  <source>{VAR_SELECT, select, male {male} female {female} other {other} }</source>
  <target>{VAR_SELECT, select, male {un homme} female {une femme} other {autre} }</target>
</trans-unit>
```

The first `<trans-unit>` will contain the text outside of `select`. The
second `<trans-unit>` will contain the text inside of the `select`
message. The reason that the extraction tool will separate it into two
separate sections, is because each expression unit is separate. (For our
`plural` expression it was all on it's own. If it had text outside of
the `plural` expression, it would indeed be separated into two parts)

### Translating a Nested Expression

So let's say that we have mixed and matched plural and select as
follows:

    <span i18n>Updated: {minutes, plural,
    =0 {just now}
    =1 {one minute ago}
    other {{{minutes}} minutes ago by {gender, select, male {male} female {female} other {other}}}}
    </span>

The result will be very similar to before. The extraction tool will
separate this into two different parts:

``` {caption="src/locale/messages.fr.xlf"}
<trans-unit id="972cb0cf3e442f7b1c00d7dab168ac08d6bdf20c" datatype="html">
  <source>Updated: <x id="ICU" equiv-text="{minutes, plural, =0 {...} =1 {...} other {...}}"/></source>
  <target>Mis à jour: <x id="ICU" equiv-text="{minutes, plural, =0 {...} =1 {...} other {...}}"/></target>
</trans-unit>
<trans-unit id="7151c2e67748b726f0864fc443861d45df21d706" datatype="html">
  <source>{VAR_PLURAL, plural, =0 {just now} =1 {one minute ago} other {<x id="INTERPOLATION" equiv-text="{{minutes}}"/> minutes ago by {VAR_SELECT, select, male {male} female {female} other {other} }} }</source>
  <target>{VAR_PLURAL, plural, =0 {à l'instant} =1 {il y a une minute} other {il y a <x id="INTERPOLATION" equiv-text="{{minutes}}"/> minutes par {VAR_SELECT, select, male {un homme} female {une femme} other {autre} }} }</target>
</trans-unit>  
```

Merge Translated Files I.E. How to Use With App
-----------------------------------------------

So now that we have our completed translated files, we will need to
provide the Angular compiler with three pieces of information:

1.  The translation file(e.g. `messages.fr.xlf`)

2.  The translation file format(e.g. `xlf`)

3.  The locale(e.g. `fr`)

### AOT v. JIT

This all depends on how you are compiling your app. Just to re-iterate,
there are two ways of doing this:

1.  AOT(Which compiles at build time)

2.  JIT(Which compiles at run time)

Depending on how you are running your app, this depends. If you are
running using AOT, then being that the compilation is being done at
build time, you will need to specify configurations. If you are using
JIT, you will have to specify providers with your app, so that it is
aware of the translation files.

### Merge Files with AOT Compiler

With AOT there will be four configurations:

1.  `i18nFile`: the path to the translation file.

2.  `i18nFormat`: the format of the translation file.

3.  `i18nLocale`: the locale id.

4.  `outputPath`: folder to distribute build.

That you will want to add to your `angular.json` file.

### Configuration for Development Environment

``` {caption="angular.json"}
"build": {
  ...
  "configurations": {
    ...
    "fr": {
      "aot": true,
      "outputPath": "dist/my-project-fr/",
      "i18nFile": "src/locale/messages.fr.xlf",
      "i18nFormat": "xlf",
      "i18nLocale": "fr",
      ...
    }
  }
},
"serve": {
  ...
  "configurations": {
    ...
    "fr": {
      "browserTarget": "*project-name*:build:fr"
    }
  }
}  
```

You can pass configuration to the `ng-serve`, or `ng-build`commands by
doing the following:

    ng serve --configuration=fr

### Configuration for Production Environment

For prod, we specify a separate `production-fr` build configuration in
the CLI configuration file:

``` {caption="angular.json"}
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": { ... },
    "configurations": {
      "fr": {
        "aot": true,
        "outputPath": "dist/my-project-fr/",
        "i18nFile": "src/locale/messages.fr.xlf",
        "i18nFormat": "xlf",
        "i18nLocale": "fr",
        "i18nMissingTranslation": "error",
      }
    }
  },
  ...
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
      "browserTarget": "my-project:build"
    },
    "configurations": {
      "production": {
        "browserTarget": "my-project:build:production"
      },
      "fr": {
        "browserTarget": "my-project:build:fr"
      }
    }
  }
}  
```

### Merge Files with JIT Compiler

JIT is an entirely different beast than working with AOT.

####  Knowledge of Three Things 

The JIT compiler requires the knowledge of three things to support
translation:

1.  Import language translation file as a string constant

2.  Create corresponding translation provider

3.  Bootstrap app with aforementioned providers

####  Three Providers To Be Aware Of 

There are three providers within an Angular JIT translation setting to
be aware of:

1.  `TRANSLATIONS` - String containing content of translation file.

2.  `TRANSLATIONS_FORMAT` - Format of file i.e. `xlf, xlf2, or xtb`

3.  `LOCALE_ID` - locale of the target language

### Merge Files with JIT Compiler In practice

Let's take a look at how this might work in practice.

First and foremost, in our main.ts let's provide:

1.  `TRANSLATIONS` (We will be using the webpack raw-loader to return
    the content as a string)

2.  `TRANSLATIONS_FORMAT`

``` {caption="src/main.ts"}
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// use the require method provided by webpack
declare const require;
// we use the webpack raw-loader to return the content as a string
const translations = require('raw-loader!./locale/messages.fr.xlf').default;

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  ]
});  
```

Next, let's provide the `LOCALED_ID` in our main module:

``` {caption="app.module.ts"}
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../src/app/app.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent ],
  providers: [ { provide: LOCALE_ID, useValue: 'fr' } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }  
```

Know When a Translation is Missing
----------------------------------

When a translation is missing the build will still succeed. However, it
will still generate an error. As to what level that is, that is
something that you can control. There are three levels:

1.  Error - Throw an error. If AOT, build will fail. If JIT, app will
    fail to load.

2.  Warning - Shows a warning(\"Missing translation\") in the console,
    or shell.

3.  Ignore - Do nothing yo.

### Specify Warning in Practice

For the AOT Compiler we specify the warning in the actual `angular.json`
file.

``` {caption="angular.json"}
"configurations": {
  ...
  "fr": {
    ...
    "i18nMissingTranslation": "error"
  }
}  
```

Notice that in the above, the option for `i18nMissingTranslation` is
located within the key/value for `fr`.

For the JIT Compiler, the configuration is set within the `main.ts`
file:

``` {caption="src/main.ts"}
import { MissingTranslationStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
// ...

platformBrowserDynamic().bootstrapModule(AppModule, {
  missingTranslation: MissingTranslationStrategy.Error,
  providers: [
    // ...
  ]
});
```

Notice the added `missingTranslation: MissingTranslationStrategy.Error,`

Tips and Tricks
---------------

### Using ng-container with i18n

While something that might seem obvious for the experience Angular
developer, it is still a notable mention. You can use `ng-container` to
removemthe requirement of having an html element be created when
translating text. E.g.

    <ng-container i18n>Translate this into multiple languages</ng-container>
