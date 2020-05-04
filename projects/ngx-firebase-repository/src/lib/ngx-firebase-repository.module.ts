import 'reflect-metadata';

import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {FirebaseConnection} from './firebase.connection';
import {FirebaseDriver} from './firebase.driver';
import {
  FIREBASE_APP,
  FIREBASE_CREATE_RESPONSE_BUILDER,
  FIREBASE_DENORMALIZER_TOKEN,
  FIREBASE_FIND_ONE_RESPONSE_BUILDER,
  FIREBASE_PAGE_BUILDER_TOKEN
} from './ngx-firebase-repository.module.di';
import {FirebaseQueryBuilder} from './firebase.query-builder';
import {FirebasePageBuilder} from './firebase.page-builder';
import {FirebaseCreateResponseBuilder} from './firebase-create.response-builder';
import {FirebaseFindOneResponseBuilder} from './firebase-find-one.response-builder';
import {Denormalizer, NORMALIZER_CONFIGURATION_TOKEN, NormalizerConfiguration} from '@witty-services/ngx-repository';
import {FirebaseNormalizer} from './firebase.normalizer';

export function denormalizerTokenFactory(connection: FirebaseConnection, normalizerConfiguration: NormalizerConfiguration): Denormalizer {
  return new Denormalizer(connection, normalizerConfiguration);
}

const MODULE_PROVIDERS: Provider[] = [
  FirebaseDriver,
  FirebaseConnection,
  FirebaseQueryBuilder,
  FirebaseNormalizer,
  {
    provide: FIREBASE_DENORMALIZER_TOKEN,
    useFactory: denormalizerTokenFactory,
    deps: [FirebaseConnection, NORMALIZER_CONFIGURATION_TOKEN]
  },
  {
    provide: FIREBASE_PAGE_BUILDER_TOKEN,
    useClass: FirebasePageBuilder
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

@NgModule({
  providers: [
    ...MODULE_PROVIDERS
  ]
})
export class NgxFirebaseRepositoryModule {

  public static forRoot(firebaseApp?: firebase.app.App): ModuleWithProviders<NgxFirebaseRepositoryModule> {
    return {
      ngModule: NgxFirebaseRepositoryModule,
      providers: [
        ...MODULE_PROVIDERS,
        {
          provide: FIREBASE_APP,
          useValue: firebaseApp
        }
      ]
    };
  }
}
