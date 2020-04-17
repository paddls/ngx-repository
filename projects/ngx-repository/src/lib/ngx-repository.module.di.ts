import {InjectionToken} from '@angular/core';
import {Denormalizer} from './normalizer/denormalizer';
import {PageBuilder} from './page-builder/page-builder';
import {NormalizerConfiguration} from './normalizer/normalizer.configuration';

export const NORMALIZER_CONFIGURATION_TOKEN: InjectionToken<NormalizerConfiguration> = new InjectionToken<NormalizerConfiguration>('NORMALIZER_CONFIGURATION_TOKEN');
export const HTTP_DENORMALIZER_TOKEN: InjectionToken<Denormalizer> = new InjectionToken<Denormalizer>('HTTP_DENORMALIZER_TOKEN');
export const HTTP_PAGE_BUILDER_TOKEN: InjectionToken<PageBuilder<any>> = new InjectionToken<PageBuilder<any>>('HTTP_PAGE_BUILDER_TOKEN');
