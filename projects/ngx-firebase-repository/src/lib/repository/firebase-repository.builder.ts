import { Injectable, Type } from '@angular/core';
import { FIREBASE_RESOURCE_METADATA_KEY } from '../decorator/firebase-resource.decorator';
import { FirebaseRepository } from './firebase.repository';
import { AbstractRepository, AbstractRepositoryBuilder, RequestManager } from '@witty-services/ngx-repository';
import { FirebaseRepositoryDriver } from '../driver/firebase-repository.driver';

/**
 * @ignore
 */
@Injectable()
export class FirebaseRepositoryBuilder extends AbstractRepositoryBuilder {

  public constructor(private readonly driver: FirebaseRepositoryDriver,
                     private readonly requestManger: RequestManager) {
    super(FIREBASE_RESOURCE_METADATA_KEY);
  }

  public supports<T>(resourceType: Type<T>, repositoryType: Type<AbstractRepository<T>>): boolean {
    return repositoryType === FirebaseRepository;
  }

  protected getRepositoryInstance<T, K>(resourceType: Type<T>): FirebaseRepository<T> {
    const repositoryClass: Type<FirebaseRepository<T, K>> = this.createRepositoryClass(FirebaseRepository, resourceType);

    return new repositoryClass(this.requestManger, this.driver);
  }
}
