import { Injectable, Type } from '@angular/core';
import { HTTP_RESOURCE_METADATA_KEY } from '../decorator/http-resource.decorator';
import { Repository2, RepositoryBuilder, RequestManager } from '@witty-services/ngx-repository';
import { HttpRepository } from './http.repository';
import { HttpRepositoryDriver } from '../driver/http-repository.driver';

/**
 * @ignore
 */
@Injectable()
export class HttpRepositoryBuilder extends RepositoryBuilder {

  public constructor(private readonly driver: HttpRepositoryDriver,
                     private readonly requestManger: RequestManager) {
    super(HTTP_RESOURCE_METADATA_KEY);
  }

  public supports(repositoryType: Type<Repository2>): boolean {
    return repositoryType === HttpRepository;
  }

  // TODO @RMA refactor repository builder
  protected getRepositoryInstance(resourceType: Type<any>): HttpRepository<any, any> {
    const repositoryClass: Type<HttpRepository<any, any>> = this.createRepositoryClass(HttpRepository, resourceType);

    return new repositoryClass(this.requestManger, this.driver);
  }
}
