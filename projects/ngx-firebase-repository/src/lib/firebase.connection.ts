import {Inject, Injectable, Type} from '@angular/core';
import {FIREBASE_RESOURCE_METADATA_KEY, FirebaseResourceContext} from './decorator/firebase-resource.decorator';
import {FirebaseRepository} from './firebase.repository';
import {FirebaseDriver} from './firebase.driver';
import {FirebaseQueryBuilder} from './firebase.query-builder';
import {FIREBASE_CREATE_RESPONSE_BUILDER, FIREBASE_FIND_ONE_RESPONSE_BUILDER, FIREBASE_PAGE_BUILDER_TOKEN} from './ngx-firebase-repository.module.di';
import {AbstractRepository, Connection, PathDenormalizer} from '@witty-services/ngx-repository';
import {FirebaseNormalizer} from './firebase.normalizer';
import {FirebasePageBuilder} from './firebase-page-builder';
import {FirebaseResponseBuilder} from './firebase-response-builder';
import * as firebase from 'firebase';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

/**
 * @ignore
 */
@Injectable()
export class FirebaseConnection extends Connection<FirebaseResourceContext, { id: any }|QuerySnapshot<DocumentData>|DocumentSnapshot> {

  public constructor(private readonly driver: FirebaseDriver,
                     private readonly normalizer: FirebaseNormalizer,
                     private readonly pathDenormalizer: PathDenormalizer,
                     private readonly queryBuilder: FirebaseQueryBuilder,
                     @Inject(FIREBASE_PAGE_BUILDER_TOKEN) private readonly pageBuilder: FirebasePageBuilder,
                     @Inject(FIREBASE_CREATE_RESPONSE_BUILDER) private readonly firebaseItemCreateBuilder: FirebaseResponseBuilder,
                     @Inject(FIREBASE_FIND_ONE_RESPONSE_BUILDER) private readonly firebaseItemFindOneBuilder: FirebaseResponseBuilder) {
    super(FIREBASE_RESOURCE_METADATA_KEY);
  }

  protected getRepositoryInstance<T, K>(resourceType: new(...args: any) => T): FirebaseRepository<T, K> {
    return new FirebaseRepository<T, K>(
      this.driver,
      this.normalizer,
      this.pathDenormalizer,
      this.queryBuilder,
      this.pageBuilder,
      this.firebaseItemCreateBuilder,
      this.firebaseItemFindOneBuilder
    );
  }

  public supports<T, K>(repositoryType: Type<AbstractRepository<T, K, FirebaseResourceContext, { id: any }|QuerySnapshot<DocumentData>|DocumentSnapshot>>): boolean {
    return repositoryType === FirebaseRepository;
  }
}
