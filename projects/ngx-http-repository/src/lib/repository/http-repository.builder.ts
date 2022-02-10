import { Inject, Injectable, Type } from '@angular/core';
import { HTTP_RESOURCE_METADATA_KEY } from '../decorator/http-resource.decorator';
import { AbstractRepository, AbstractRepositoryBuilder, RequestManager } from '@paddls/ngx-repository';
import { HttpRepository } from './http.repository';
import { HttpRepositoryDriver } from '../driver/http-repository.driver';
import {
  HTTP_REPOSITORY_CONFIGURATION,
  HttpRepositoryConfiguration
} from '../configuration/http-repository.configuration';

/**
 * @ignore
 */
@Injectable()
export class HttpRepositoryBuilder extends AbstractRepositoryBuilder {

  public constructor(private readonly driver: HttpRepositoryDriver,
                     private readonly requestManger: RequestManager,
                     @Inject(HTTP_REPOSITORY_CONFIGURATION)
                     private readonly configuration: HttpRepositoryConfiguration) {
    super(HTTP_RESOURCE_METADATA_KEY);
  }

  public supports<T>(resourceType: Type<T>, repositoryType: Type<AbstractRepository<T>>): boolean {
    return repositoryType === HttpRepository;
  }

  protected getRepositoryInstance<T, K>(resourceType: Type<T>): HttpRepository<T, K> {
    const repositoryClass: Type<HttpRepository<T, K>> = this.createRepositoryClass<T>(HttpRepository, resourceType);

    return new repositoryClass(this.requestManger, this.driver, this.configuration);
  }
}
