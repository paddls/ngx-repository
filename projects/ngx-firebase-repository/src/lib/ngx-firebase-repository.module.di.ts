import {InjectionToken} from '@angular/core';
import {Denormalizer, PageBuilder} from '@witty-services/ngx-repository';
import * as firebase from 'firebase';
import App = firebase.app.App;

export const FIREBASE_APP: InjectionToken<App> = new InjectionToken<App>('FIREBASE_APP');

export const FIREBASE_DENORMALIZER_TOKEN: InjectionToken<Denormalizer> = new InjectionToken<Denormalizer>('FIREBASE_DENORMALIZER_TOKEN');

export const FIREBASE_PAGE_BUILDER_TOKEN: InjectionToken<PageBuilder<any>> = new InjectionToken<PageBuilder<any>>('FIREBASE_PAGE_BUILDER_TOKEN');

export const FIREBASE_CREATE_RESPONSE_BUILDER: InjectionToken<any> = new InjectionToken<any>('FIREBASE_CREATE_RESPONSE_BUILDER');
export const FIREBASE_FIND_ONE_RESPONSE_BUILDER: InjectionToken<any> = new InjectionToken<any>('FIREBASE_FIND_ONE_RESPONSE_BUILDER');
