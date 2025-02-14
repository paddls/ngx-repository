import { inject, Injectable, Type } from '@angular/core';
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

  private readonly driver = inject(HttpRepositoryDriver);
  private readonly requestManger = inject(RequestManager);
  private readonly configuration = inject<HttpRepositoryConfiguration>(HTTP_REPOSITORY_CONFIGURATION);

  public constructor() {
    super(HTTP_RESOURCE_METADATA_KEY);
  }

  public supports<T>(_: Type<T>, repositoryType: Type<AbstractRepository<T>>): boolean {
    return repositoryType === HttpRepository;
  }

  protected getRepositoryInstance<T, K>(resourceType: Type<T>): HttpRepository<T, K> {
    const repositoryClass: Type<HttpRepository<T, K>> = this.createRepositoryClass<T>(HttpRepository, resourceType);

    return new repositoryClass(this.requestManger, this.driver, this.configuration);
  }
}
