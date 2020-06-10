import {Observable} from 'rxjs';
import {Inject, Injector, Optional} from '@angular/core';
import {FirebaseDriver} from './firebase.driver';
import {FIREBASE_CREATE_RESPONSE_BUILDER, FIREBASE_FIND_ONE_RESPONSE_BUILDER, FIREBASE_PAGE_BUILDER_TOKEN} from './ngx-firebase-repository.module.di';
import {FIREBASE_RESOURCE_METADATA_KEY, FirebaseResourceContext} from './decorator/firebase-resource.decorator';
import {FirebaseQueryBuilder} from './firebase.query-builder';
import {AbstractRepository, ColumnContextConfiguration, COLUMNS_METADATA_KEY, PathDenormalizer, PropertyKeyConfiguration} from '@witty-services/ngx-repository';
import {FIREBASE_CREATED_AT_METADATA_KEY, FirebaseCreatedAtContextConfiguration} from './decorator/firebase-created-at.decorator';
import {intersectionBy} from 'lodash';
import {FirebaseNormalizer} from './firebase.normalizer';
import {FirebaseResponseBuilder} from './firebase-response-builder';
import * as firebase from 'firebase';
import {FirebasePageBuilder} from './firebase-page-builder';
import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

/**
 * @ignore
 */
export class FirebaseRepository<T, K> extends AbstractRepository<T, K, FirebaseResourceContext, QuerySnapshot<DocumentData>|{ id: any }> {

  public constructor(driver: FirebaseDriver,
                     normalizer: FirebaseNormalizer,
                     denormalizer: PathDenormalizer,
                     queryBuilder: FirebaseQueryBuilder,
                     @Inject(FIREBASE_PAGE_BUILDER_TOKEN) pageBuilder: FirebasePageBuilder,
                     @Inject(FIREBASE_CREATE_RESPONSE_BUILDER) firebaseItemCreateBuilder: FirebaseResponseBuilder,
                     @Inject(FIREBASE_FIND_ONE_RESPONSE_BUILDER) firebaseItemFineOneBuilder: FirebaseResponseBuilder,
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

    this.createResponseBuilder = injector.get(this.resourceContextConfiguration.create.responseBuilder());
  }

  public create(object: T, query?: any): Observable<K> {
    if (!query) {
      query = {};
    }
    query.id = this.getResourceId(object);

    return super.create(object, query);
  }

  public update(object: T, query: any = {}): Observable<void> {
    const createdAts: FirebaseCreatedAtContextConfiguration[] = Reflect.getMetadata(FIREBASE_CREATED_AT_METADATA_KEY, object) || [];
    const columns: ColumnContextConfiguration<any, any>[] = Reflect.getMetadata(COLUMNS_METADATA_KEY, object) || [];
    const columnsToUpdate: ColumnContextConfiguration<any, any>[] = intersectionBy(columns, createdAts, (meta: PropertyKeyConfiguration) => meta.propertyKey);
    columnsToUpdate.forEach((columnToUpdate: ColumnContextConfiguration<any, any>) => columnToUpdate.readOnly = false);

    Reflect.defineMetadata(FIREBASE_CREATED_AT_METADATA_KEY, [], object);
    Reflect.defineMetadata(COLUMNS_METADATA_KEY, columns, object);

    return super.update(object, query);
  }
}
