import 'reflect-metadata';

import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FirebaseRepositoryBuilder } from './repository/firebase-repository.builder';
import { FIRESTORE_APP } from './ngx-firebase-repository.module.di';
import { REPOSITORY_BUILDER_TOKEN } from '@witty-services/ngx-repository';
import { FirebaseNormalizer } from './normalizer/firebase.normalizer';
import { FirebaseRepositoryDriver } from './driver/firebase-repository.driver';
import { FirebaseRequestBuilder } from './request/firebase-request.builder';
import { FirebaseResponseBuilder } from './response/firebase-response.builder';
import { FirebaseCriteriaRequestBuilder } from './request/firebase-criteria-request.builder';
import firebase from 'firebase';
import Firestore = firebase.firestore.Firestore;

const MODULE_PROVIDERS: Provider[] = [
  FirebaseRepositoryBuilder,
  FirebaseNormalizer,
  FirebaseRepositoryBuilder,
  FirebaseRepositoryDriver,
  FirebaseRequestBuilder,
  FirebaseCriteriaRequestBuilder,
  FirebaseResponseBuilder,
  {
    provide: REPOSITORY_BUILDER_TOKEN,
    useExisting: FirebaseRepositoryBuilder,
    multi: true
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
