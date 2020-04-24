import {Observable} from 'rxjs';
import {Denormalizer} from '../normalizer/denormalizer';
import {Inject} from '@angular/core';
import {PageBuilder} from '../page-builder/page-builder';
import {FirebaseDriver} from './firebase.driver';
import {
  FIREBASE_DENORMALIZER_TOKEN,
  FIREBASE_CREATE_RESPONSE_BUILDER,
  FIREBASE_FIND_ONE_RESPONSE_BUILDER,
  FIREBASE_PAGE_BUILDER_TOKEN
} from './ngx-firebase-repository.module.di';
import {Normalizer} from '../normalizer/normalizer';
import {FIREBASE_RESOURCE_METADATA_KEY, FirebaseResourceContext} from './decorator/firebase-resource.decorator';
import {FirebaseQueryBuilder} from './firebase.query-builder';
import {ResponseBuilder} from '../item-builder/response-builder';
import {AbstractRepository} from '../repository/abstract.repository';

export class FirebaseRepository<T, K> extends AbstractRepository<T, K, FirebaseResourceContext, any> {

  public constructor(driver: FirebaseDriver,
                     normalizer: Normalizer,
                     @Inject(FIREBASE_DENORMALIZER_TOKEN) denormalizer: Denormalizer,
                     queryBuilder: FirebaseQueryBuilder,
                     @Inject(FIREBASE_PAGE_BUILDER_TOKEN) pageBuilder: PageBuilder<Observable<any>>,
                     @Inject(FIREBASE_CREATE_RESPONSE_BUILDER) firebaseItemCreateBuilder: ResponseBuilder<any>,
                     @Inject(FIREBASE_FIND_ONE_RESPONSE_BUILDER) firebaseItemFineOneBuilder: ResponseBuilder<any>) {
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
  }
}
