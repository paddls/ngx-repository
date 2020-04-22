import {InjectionToken} from '@angular/core';
import {Denormalizer} from './normalizer/denormalizer';
import {PageBuilder} from './page-builder/page-builder';

export const FIREBASE_DENORMALIZER_TOKEN: InjectionToken<Denormalizer> = new InjectionToken<Denormalizer>('FIREBASE_DENORMALIZER_TOKEN');
export const FIREBASE_PAGE_BUILDER_TOKEN: InjectionToken<PageBuilder<any>> = new InjectionToken<PageBuilder<any>>('FIREBASE_PAGE_BUILDER_TOKEN');
