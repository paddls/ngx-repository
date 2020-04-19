import 'reflect-metadata';

import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FirebaseConnection } from './driver/firebase/firebase.connection';
import { FirebaseDriver } from './driver/firebase/firebase.driver';
import { NORMALIZER_CONFIGURATION_TOKEN } from './ngx-repository.module.di';
import { FIREBASE_DENORMALIZER_TOKEN, FIREBASE_PAGE_BUILDER_TOKEN } from './ngx-firebase-repository.module.di';
import { NormalizerConfiguration } from './normalizer/normalizer.configuration';
import { Denormalizer } from './normalizer/denormalizer';
import { FirebaseQueryBuilder } from './driver/firebase/firebase.query-builder';
import { FirebaseNoPageBuilder } from './driver/firebase/firebase-no.page-builder';

export function denormalizerTokenFactory(connection: FirebaseConnection, normalizerConfiguration: NormalizerConfiguration): Denormalizer {
  return new Denormalizer(connection, normalizerConfiguration);
}

const MODULE_PROVIDERS: Provider[] = [
  FirebaseDriver,
  FirebaseConnection,
  FirebaseQueryBuilder,
  {
    provide: FIREBASE_DENORMALIZER_TOKEN,
    useFactory: denormalizerTokenFactory,
    deps: [FirebaseConnection, NORMALIZER_CONFIGURATION_TOKEN]
  },
  {
    provide: FIREBASE_PAGE_BUILDER_TOKEN,
    useClass: FirebaseNoPageBuilder
  }
];

@NgModule({
  imports: [],
  providers: [
    ...MODULE_PROVIDERS
  ]
})
export class NgxFirebaseRepositoryModule {

  public static forRoot(): ModuleWithProviders<NgxFirebaseRepositoryModule> {
    return {
      ngModule: NgxFirebaseRepositoryModule,
      providers: [
        ...MODULE_PROVIDERS
      ]
    };
  }
}
