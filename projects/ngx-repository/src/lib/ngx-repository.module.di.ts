import {InjectionToken} from '@angular/core';
import {NormalizerConfiguration} from './normalizer/normalizer.configuration';

export const NORMALIZER_CONFIGURATION_TOKEN: InjectionToken<NormalizerConfiguration> = new InjectionToken<NormalizerConfiguration>('NORMALIZER_CONFIGURATION_TOKEN');
