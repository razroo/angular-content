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
