import {InjectionToken} from '@angular/core';
import {Denormalizer, PageBuilder} from '@witty-services/ngx-repository';

export const FIREBASE_CONFIGURATION_TOKEN: InjectionToken<any> = new InjectionToken<any>('FIREBASE_CONFIGURATION_TOKEN');

export const FIREBASE_DENORMALIZER_TOKEN: InjectionToken<Denormalizer> = new InjectionToken<Denormalizer>('FIREBASE_DENORMALIZER_TOKEN');

export const FIREBASE_PAGE_BUILDER_TOKEN: InjectionToken<PageBuilder<any>> = new InjectionToken<PageBuilder<any>>('FIREBASE_PAGE_BUILDER_TOKEN');

export const FIREBASE_CREATE_RESPONSE_BUILDER: InjectionToken<any> = new InjectionToken<any>('FIREBASE_CREATE_RESPONSE_BUILDER');
export const FIREBASE_FIND_ONE_RESPONSE_BUILDER: InjectionToken<any> = new InjectionToken<any>('FIREBASE_FIND_ONE_RESPONSE_BUILDER');
