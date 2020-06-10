import {HttpRepository} from './http.repository';
import {Inject, Injectable, Injector, Type} from '@angular/core';
import {HTTP_RESOURCE_METADATA_KEY, HttpResourceContext} from './decorator/http-resource.decorator';
import {HttpResponse} from '@angular/common/http';
import {AbstractRepository, Connection, Normalizer, PathDenormalizer, ResponseBuilder} from '@witty-services/ngx-repository';
import {HttpDriver} from './http.driver';
import {HttpQueryBuilder} from './http.query-builder';
import {HTTP_CREATE_RESPONSE_BUILDER, HTTP_FIND_ONE_RESPONSE_BUILDER, HTTP_PAGE_BUILDER_TOKEN} from './ngx-http-repository.module.di';
import {HttpPageBuilder} from './http-page-builder';
import {HttpResponseBuilder} from './http-response-builder';

/**
 * @ignore
 */
@Injectable()
export class HttpConnection extends Connection<HttpResourceContext, HttpResponse<any>> {

  public constructor(private readonly httpDriver: HttpDriver,
                     private readonly normalizer: Normalizer,
                     private readonly pathDenormalizer: PathDenormalizer,
                     private readonly httpQueryBuilder: HttpQueryBuilder,
                     @Inject(HTTP_PAGE_BUILDER_TOKEN) private readonly httpPageBuilder: HttpPageBuilder,
                     @Inject(HTTP_CREATE_RESPONSE_BUILDER) private httpItemCreateBuilder: HttpResponseBuilder,
                     @Inject(HTTP_FIND_ONE_RESPONSE_BUILDER) private readonly httpItemFindOneBuilder: HttpResponseBuilder,
                     private readonly parentInjector: Injector) {
    super(HTTP_RESOURCE_METADATA_KEY);
  }

  protected getRepositoryInstance<T, K>(resourceType: new(...args: any) => T): HttpRepository<T, K> {
    const httpResourceContext: HttpResourceContext = Reflect.getMetadata(this.resourceContextKey, resourceType);
    if (httpResourceContext.create && httpResourceContext.create instanceof Object) {
      const createResponseBuilder: ResponseBuilder<HttpResponse<any>> = this.parentInjector.get(httpResourceContext.create.responseBuilder);
      if (!createResponseBuilder) {
        throw new Error(`${httpResourceContext.create.responseBuilder.name} is not found in Angular Injector.`);
      }
      this.httpItemCreateBuilder = createResponseBuilder;
    }

    return new HttpRepository<T, K>(
      this.httpDriver,
      this.normalizer,
      this.pathDenormalizer,
      this.httpQueryBuilder,
      this.httpPageBuilder,
      this.httpItemCreateBuilder,
      this.httpItemFindOneBuilder
    );
  }

  public supports<T, K>(repositoryType: Type<AbstractRepository<T, K, HttpResourceContext, HttpResponse<any>>>): boolean {
    return repositoryType === HttpRepository;
  }
}
