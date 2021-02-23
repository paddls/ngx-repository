import { Injectable, Type } from '@angular/core';
import { FIREBASE_RESOURCE_METADATA_KEY } from '../decorator/firebase-resource.decorator';
import { FirebaseRepository } from './firebase.repository';
import { Repository2, RepositoryBuilder, RequestManager } from '@witty-services/ngx-repository';
import { FirebaseRepositoryDriver } from '../driver/firebase-repository.driver';

/**
 * @ignore
 */
@Injectable()
export class FirebaseRepositoryBuilder extends RepositoryBuilder {

  public constructor(private readonly driver: FirebaseRepositoryDriver,
                     private readonly requestManger: RequestManager) {
    super(FIREBASE_RESOURCE_METADATA_KEY);
  }

  public supports(repositoryType: Type<Repository2>): boolean {
    return repositoryType === FirebaseRepository;
  }

  // TODO @RMA refactor repository builder
  protected getRepositoryInstance(resourceType: Type<any>): FirebaseRepository<any, any> {
    const repositoryClass: Type<FirebaseRepository<any, any>> = this.createRepositoryClass(FirebaseRepository, resourceType);

    return new repositoryClass(this.requestManger, this.driver);
  }
}
