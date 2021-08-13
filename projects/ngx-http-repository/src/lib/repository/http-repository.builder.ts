import { Injectable, Type } from '@angular/core';
import { HTTP_RESOURCE_METADATA_KEY } from '../decorator/http-resource.decorator';
import { AbstractRepository, AbstractRepositoryBuilder, RequestManager } from '@witty-services/ngx-repository';
import { HttpRepository } from './http.repository';
import { HttpRepositoryDriver } from '../driver/http-repository.driver';

/**
 * @ignore
 */
@Injectable()
export class HttpRepositoryBuilder extends AbstractRepositoryBuilder {

  public constructor(private readonly driver: HttpRepositoryDriver,
                     private readonly requestManger: RequestManager) {
    super(HTTP_RESOURCE_METADATA_KEY);
  }

  public supports<T>(resourceType: Type<T>, repositoryType: Type<AbstractRepository<T>>): boolean {
    return repositoryType === HttpRepository;
  }

  protected getRepositoryInstance<T, K>(resourceType: Type<T>): HttpRepository<T, K> {
    const repositoryClass: Type<HttpRepository<T, K>> = this.createRepositoryClass<T>(HttpRepository, resourceType);

    return new repositoryClass(this.requestManger, this.driver);
  }
}
