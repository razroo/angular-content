 Creating Feature Flags 
=======================

Feature flags are an important part of Angular Architecture. What it
means is, that a feature can be hidden, disabled, change code flow.
Changing code flow means having an if statement turned off for instance
or have routing being prevented from going to component.

 Why are Feature Flags Important? 
---------------------------------

Feature flags are important, because they can allow the UI Engineering
team to work independently from the back end and Automation/QA
engineering. Some sample situations to illustrate this point:

 Creating a config using an API and server 
------------------------------------------

Ideally a feature flag system is created through the backend. There
would be some sort of management system, where a product owner can go
in, and turn off features specific to a certain part of the application.
There would then be a report that would go out monthly, let's say, that
would tell everyone within the company which features have been turned
off, to make sure there isn't dead code laying around for features that
aren't used. I will not go into detail here, but this is ideally how
this should be built out. \[TODO discuss this option more in detail\].

 Creating a config 
------------------

If your app currently does not have an api server that can be used in
order to pull in the config, then you can create your own config. You
can refer to the chapter on creating a config, on how someone would
solve this. With regards to using the config with app, a service would
need to be created as follows:

``` {.typescript language="JavaScript"}
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';

@Injectable()
export class FeatureFlagService {

  featureOff(featureName: string) {
    // Read the value from the config service
    if (AppConfig.settings.features.hasOwnProperty(featureName)) {
        return !AppConfig.settings.features[featureName];
    }
    return true; // if feature not found, default to turned off
  }

  featureOn(featureName: string) {
    return !this.featureOff(featureName);
  }
}
```
