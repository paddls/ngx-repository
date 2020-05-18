import {InjectionToken} from '@angular/core';
import {PageBuilder} from '@witty-services/ngx-repository';
import * as firebase from 'firebase';
import Firestore = firebase.firestore.Firestore;

export const FIRESTORE_APP: InjectionToken<Firestore> = new InjectionToken<Firestore>('FIRESTORE_APP');

export const FIREBASE_PAGE_BUILDER_TOKEN: InjectionToken<PageBuilder<any>> = new InjectionToken<PageBuilder<any>>('FIREBASE_PAGE_BUILDER_TOKEN');

export const FIREBASE_CREATE_RESPONSE_BUILDER: InjectionToken<any> = new InjectionToken<any>('FIREBASE_CREATE_RESPONSE_BUILDER');
export const FIREBASE_FIND_ONE_RESPONSE_BUILDER: InjectionToken<any> = new InjectionToken<any>('FIREBASE_FIND_ONE_RESPONSE_BUILDER');
