import 'reflect-metadata';

import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {FirebaseConnection} from './firebase.connection';
import {FirebaseDriver} from './firebase.driver';
import {
  FIRESTORE_APP,
  FIREBASE_CREATE_RESPONSE_BUILDER,
  FIREBASE_FIND_ONE_RESPONSE_BUILDER,
  FIREBASE_PAGE_BUILDER_TOKEN
} from './ngx-firebase-repository.module.di';
import {FirebaseQueryBuilder} from './firebase.query-builder';
import {FirebaseNoPageBuilder} from './firebase-no.page-builder';
import {FirebaseCreateResponseBuilder} from './firebase-create.response-builder';
import {FirebaseFindOneResponseBuilder} from './firebase-find-one.response-builder';
import {CONNECTIONS_TOKEN} from '@witty-services/ngx-repository';
import {FirebaseNormalizer} from './firebase.normalizer';
import * as firebase from 'firebase';
import Firestore = firebase.firestore.Firestore;

const MODULE_PROVIDERS: Provider[] = [
  FirebaseDriver,
  FirebaseConnection,
  FirebaseQueryBuilder,
  FirebaseNormalizer,
  {
    provide: CONNECTIONS_TOKEN,
    useExisting: FirebaseConnection,
    multi: true
  },
  {
    provide: FIREBASE_PAGE_BUILDER_TOKEN,
    useClass: FirebaseNoPageBuilder
  },
  {
    provide: FIREBASE_CREATE_RESPONSE_BUILDER,
    useClass: FirebaseCreateResponseBuilder
  },
  {
    provide: FIREBASE_FIND_ONE_RESPONSE_BUILDER,
    useClass: FirebaseFindOneResponseBuilder
  }
];

/**
 * @ignore
 */
@NgModule({
  providers: [
    ...MODULE_PROVIDERS
  ]
})
export class NgxFirebaseRepositoryModule {

  public static forRoot(firestore?: Firestore): ModuleWithProviders<NgxFirebaseRepositoryModule> {
    return {
      ngModule: NgxFirebaseRepositoryModule,
      providers: [
        {
          provide: FIRESTORE_APP,
          useValue: firestore
        }
      ]
    };
  }
}
