import {Observable} from 'rxjs';
import {Inject, Injector, Optional} from '@angular/core';
import {FirebaseDriver} from './firebase.driver';
import {
  FIREBASE_DENORMALIZER_TOKEN,
  FIREBASE_CREATE_RESPONSE_BUILDER,
  FIREBASE_FIND_ONE_RESPONSE_BUILDER,
  FIREBASE_PAGE_BUILDER_TOKEN
} from './ngx-firebase-repository.module.di';
import {FIREBASE_RESOURCE_METADATA_KEY, FirebaseResourceContext} from './decorator/firebase-resource.decorator';
import {FirebaseQueryBuilder} from './firebase.query-builder';
import {AbstractRepository, Denormalizer, Normalizer, PageBuilder, ResponseBuilder} from '@witty-services/ngx-repository';

export class FirebaseRepository<T, K> extends AbstractRepository<T, K, FirebaseResourceContext, any> {

  public constructor(driver: FirebaseDriver,
                     normalizer: Normalizer,
                     @Inject(FIREBASE_DENORMALIZER_TOKEN) denormalizer: Denormalizer,
                     queryBuilder: FirebaseQueryBuilder,
                     @Inject(FIREBASE_PAGE_BUILDER_TOKEN) pageBuilder: PageBuilder<Observable<any>>,
                     @Inject(FIREBASE_CREATE_RESPONSE_BUILDER) firebaseItemCreateBuilder: ResponseBuilder<any>,
                     @Inject(FIREBASE_FIND_ONE_RESPONSE_BUILDER) firebaseItemFineOneBuilder: ResponseBuilder<any>,
                     @Optional() injector?: Injector) {
    super(
      FIREBASE_RESOURCE_METADATA_KEY,
      driver,
      normalizer,
      denormalizer,
      queryBuilder,
      pageBuilder,
      firebaseItemCreateBuilder,
      firebaseItemFineOneBuilder
    );

    if (!this.repositoryContextConfiguration) {
      return;
    }

    if (!(this.resourceContextConfiguration.create instanceof Object)) {
      return;
    }

    if (!injector) {
      return;
    }

    this.createResponseBuilder = injector.get(this.resourceContextConfiguration.create.responseBuilder);
  }
}
