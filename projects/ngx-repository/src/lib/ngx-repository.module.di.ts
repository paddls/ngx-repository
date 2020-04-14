import {InjectionToken} from '@angular/core';
import {Denormalizer} from './normalizer/denormalizer';
import {PageBuilder} from './page-builder/page-builder';

export const HTTP_DENORMALIZER_TOKEN: InjectionToken<Denormalizer> = new InjectionToken<Denormalizer>('HTTP_DENORMALIZER_TOKEN');
export const HTTP_PAGE_BUILDER_TOKEN: InjectionToken<PageBuilder<any>> = new InjectionToken<PageBuilder<any>>('HTTP_PAGE_BUILDER_TOKEN');
