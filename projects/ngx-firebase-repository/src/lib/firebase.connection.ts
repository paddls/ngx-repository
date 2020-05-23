import {Inject, Injectable, Type} from '@angular/core';
import {Observable} from 'rxjs';
import {FIREBASE_RESOURCE_METADATA_KEY, FirebaseResourceContext} from './decorator/firebase-resource.decorator';
import {FirebaseRepository} from './firebase.repository';
import {FirebaseDriver} from './firebase.driver';
import {FirebaseQueryBuilder} from './firebase.query-builder';
import {
  FIREBASE_CREATE_RESPONSE_BUILDER,
  FIREBASE_FIND_ONE_RESPONSE_BUILDER,
  FIREBASE_PAGE_BUILDER_TOKEN
} from './ngx-firebase-repository.module.di';
import {AbstractRepository, Connection, PageBuilder, PathDenormalizer, ResponseBuilder} from '@witty-services/ngx-repository';
import {FirebaseNormalizer} from './firebase.normalizer';

@Injectable()
export class FirebaseConnection extends Connection<FirebaseResourceContext, Observable<any>> {

  public constructor(private readonly driver: FirebaseDriver,
                     private readonly normalizer: FirebaseNormalizer,
                     private readonly pathDenormalizer: PathDenormalizer,
                     private readonly queryBuilder: FirebaseQueryBuilder,
                     @Inject(FIREBASE_PAGE_BUILDER_TOKEN) private readonly pageBuilder: PageBuilder<any>,
                     @Inject(FIREBASE_CREATE_RESPONSE_BUILDER) private readonly firebaseItemCreateBuilder: ResponseBuilder<any>,
                     @Inject(FIREBASE_FIND_ONE_RESPONSE_BUILDER) private readonly firebaseItemFindOneBuilder: ResponseBuilder<any>) {
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

  public supports<T, K>(repositoryType: Type<AbstractRepository<T, K, FirebaseResourceContext, Observable<any>>>): boolean {
    return repositoryType === FirebaseRepository;
  }
}
