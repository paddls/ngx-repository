import {InjectionToken} from '@angular/core';
import {PageBuilder, ResponseBuilder} from '@witty-services/ngx-repository';
import * as firebase from 'firebase';
import Firestore = firebase.firestore.Firestore;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import DocumentData = firebase.firestore.DocumentData;
import DocumentReference = firebase.firestore.DocumentReference;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

/** @ignore */
export const FIRESTORE_APP: InjectionToken<Firestore> = new InjectionToken<Firestore>('FIRESTORE_APP');

/** @ignore */
export const FIREBASE_PAGE_BUILDER_TOKEN: InjectionToken<PageBuilder<QuerySnapshot<DocumentData>>> = new InjectionToken<PageBuilder<QuerySnapshot<DocumentData>>>('FIREBASE_PAGE_BUILDER_TOKEN');

/** @ignore */
export const FIREBASE_CREATE_RESPONSE_BUILDER: InjectionToken<DocumentReference<DocumentData>> = new InjectionToken<DocumentReference<DocumentData>>('FIREBASE_CREATE_RESPONSE_BUILDER');

/** @ignore */
export const FIREBASE_FIND_ONE_RESPONSE_BUILDER: InjectionToken<ResponseBuilder<DocumentSnapshot>> = new InjectionToken<ResponseBuilder<DocumentSnapshot>>('FIREBASE_FIND_ONE_RESPONSE_BUILDER');
