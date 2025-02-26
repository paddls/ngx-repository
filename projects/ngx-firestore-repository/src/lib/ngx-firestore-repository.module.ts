import 'reflect-metadata';

import { EnvironmentProviders, makeEnvironmentProviders, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FirestoreRepositoryBuilder } from './repository/firestore-repository-builder.service';
import { FIRESTORE_APP } from './ngx-firestore-repository.module.di';
import { REPOSITORY_BUILDER_TOKEN } from '@paddls/ngx-repository';
import { FirestoreNormalizer } from './normalizer/firestore.normalizer';
import { FirestoreRepositoryDriver } from './driver/firestore-repository-driver.service';
import { FirestoreRequestBuilder } from './request/firestore-request-builder.service';
import { FirestoreCriteriaRequestBuilder } from './request/firestore-criteria-request-builder.service';
import {
  LogExecuteFirestoreRequestEventListener
} from './driver/listener/log-execute-firestore-request-event.listener';
import { Firestore } from 'firebase/firestore';

export interface NgxFirestoreRepositoryModuleConfiguration { // @TODO: RMA/TNI : Add global configuration like ngx-http

  firestore?: Firestore;

  debug?: boolean;
}

export function provideNgxFirestoreRepository(config: NgxFirestoreRepositoryModuleConfiguration = { debug: false }): EnvironmentProviders {
  const providers: Provider[] = [
    FirestoreRepositoryBuilder,
    FirestoreNormalizer,
    FirestoreRepositoryBuilder,
    FirestoreRepositoryDriver,
    FirestoreRequestBuilder,
    FirestoreCriteriaRequestBuilder,
    {
      provide: REPOSITORY_BUILDER_TOKEN,
      useExisting: FirestoreRepositoryBuilder,
      multi: true
    },
    {
      provide: FIRESTORE_APP,
      useValue: config.firestore
    }
  ];

  if (config.debug) {
    providers.push(LogExecuteFirestoreRequestEventListener);
  }

  return makeEnvironmentProviders(providers);
}

/**
 * @ignore
 */
@NgModule()
export class NgxFirestoreRepositoryModule {

  /**
   * @deprecated use provideNgxFirestoreRepository instead
   */
  public static forRoot(config: NgxFirestoreRepositoryModuleConfiguration = { debug: false }): ModuleWithProviders<NgxFirestoreRepositoryModule> {
    return {
      ngModule: NgxFirestoreRepositoryModule,
      providers: [
        provideNgxFirestoreRepository(config)
      ]
    };
  }
}
