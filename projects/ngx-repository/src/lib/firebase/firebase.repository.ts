import {Observable} from 'rxjs';
import {Denormalizer} from '../normalizer/denormalizer';
import {Inject} from '@angular/core';
import {PageBuilder} from '../page-builder/page-builder';
import {FirebaseDriver} from './firebase.driver';
import {FIREBASE_DENORMALIZER_TOKEN, FIREBASE_PAGE_BUILDER_TOKEN} from '../ngx-firebase-repository.module.di';
import {Normalizer} from '../normalizer/normalizer';
import {RxjsRepository} from '../repository/rxjs.repository';
import {FIREBASE_RESOURCE_METADATA_KEY, FirebaseResourceContext} from './decorator/firebase-resource.decorator';
import {FirebaseQueryBuilder} from './firebase.query-builder';

export class FirebaseRepository<T, K> extends RxjsRepository<T, K, FirebaseResourceContext, Observable<any>> {

  public constructor(driver: FirebaseDriver,
                     normalizer: Normalizer,
                     @Inject(FIREBASE_DENORMALIZER_TOKEN) denormalizer: Denormalizer,
                     queryBuilder: FirebaseQueryBuilder,
                     @Inject(FIREBASE_PAGE_BUILDER_TOKEN) pageBuilder: PageBuilder<Observable<any>>) {
    super(FIREBASE_RESOURCE_METADATA_KEY, driver, normalizer, denormalizer, queryBuilder, pageBuilder);
  }
}
