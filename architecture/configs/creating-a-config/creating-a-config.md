 Creating a Config 
==================

*Note: Creating your own config for the most part is not ideal. Ideally,
configs should be altered in the backend and pulled in as an API. It
should be noted, that any config has the potential of being exposed on
the front end, therefore making front end config unsafe. However, many
apps will experience iteration, even in larger enterprises. This chapter
therefore deals with the importance of having configs available within
app. In addition, the importance of having a config within app.*

 Use Case for Creating a Config 
-------------------------------

I would like to present why one would want to create their own config.
We are, of course, all aware of what the environment config that is
naturally baked into every Angular project [^1]. That is a great example
of a great config file, which allows us to determine which values to use
on the front end, based on environment. Another couple of situations
where a config file might make sense is:

-   Feature Flags

-   Api Server Rules

-   App Insights Key

-   OAuth

Technically, these can all be broken into a singular config. It would be
a giant environment file. However, it would be cleaner to break these
into smaller pieces, that give different values based on the central
environment file.

 How to Setup a Config File for App. 
------------------------------------

With the mono repo architecture we are using, let's assume that our code
is going into the folder. It will be in the common folder, wherein there
will be a configs folder. Something like this:

\[ \[common \[configs\] \] \]

###  How to Setup a Config File for App. 

As config files, are giant data globs, we are going to want to create an
interface for them. The actual config files will go in our config file.
So let's say we want to create a config specifically for OAuth, we would
create a config folder called oauth-config, with the following files:

\[ \[common \[configs \[oauth-config \[oauth-config.deploy.json,file\]
\[oauth-config.dev.json,file\] \[oauth-config.interface.ts,file\] \] \]
\] \]

###  Creating a Config Service 

It is then important at this point to create a service, that will take
it the appropriate config file, based on the appropriate environment.

``` {.typescript language="JavaScript"}
import { Injectable } from '@angular/core’;
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { IAppConfig } from './models/app-config.model';

@Injectable()
export class AppConfig {

    static settings: IAppConfig;

    constructor(private http: Http) {}

    load() {
        const jsonFile = `assets/config/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response : Response) => {
               AppConfig.settings = <IAppConfig>response.json();
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
```

###  Load Files Prior to App Creation 

Angular provides a token called APP\_INITIALIZER, which will allow for
our application to execute once application is finished.

``` {.typescript language="JavaScript"}
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
@NgModule({
    imports: [ , , , ],
    declarations: [ . . . ],
    providers: [
       AppConfig,
       { provide: APP_INITIALIZER,
         useFactory: initializeApp,
         deps: [AppConfig], multi: true }
    ],
    bootstrap: [
      AppComponent
    ]
})
export class AppModule { }
```

We now have the option to use this config anywhere we want throughout
the app.

[^1]: If not, feel free to look here \[Link to chapter on environment
    files goes here\]
