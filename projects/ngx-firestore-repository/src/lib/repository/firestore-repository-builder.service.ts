import { inject, Injectable, Type } from '@angular/core';
import { FIRESTORE_RESOURCE_METADATA_KEY } from '../decorator/firestore-resource.decorator';
import { FirestoreRepository } from './firestore.repository';
import { AbstractRepository, AbstractRepositoryBuilder, RequestManager } from '@paddls/ngx-repository';
import { FirestoreRepositoryDriver } from '../driver/firestore-repository-driver.service';

/**
 * @ignore
 */
@Injectable()
export class FirestoreRepositoryBuilder extends AbstractRepositoryBuilder {

  private readonly driver = inject(FirestoreRepositoryDriver);
  private readonly requestManger = inject(RequestManager);

  public constructor() {
    super(FIRESTORE_RESOURCE_METADATA_KEY);
  }

  public supports<T>(resourceType: Type<T>, repositoryType: Type<AbstractRepository<T>>): boolean {
    return repositoryType === FirestoreRepository;
  }

  protected getRepositoryInstance<T, K>(resourceType: Type<T>): FirestoreRepository<T> {
    const repositoryClass: Type<FirestoreRepository<T, K>> = this.createRepositoryClass(FirestoreRepository, resourceType);

    return new repositoryClass(this.requestManger, this.driver);
  }
}
