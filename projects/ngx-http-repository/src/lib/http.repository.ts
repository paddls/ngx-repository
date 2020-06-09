import {HttpResponse} from '@angular/common/http';
import {HTTP_RESOURCE_METADATA_KEY, HttpResourceContext} from './decorator/http-resource.decorator';
import {HttpDriver} from './http.driver';
import {HttpQueryBuilder} from './http.query-builder';
import {Inject, Injector, Optional} from '@angular/core';
import {HTTP_CREATE_RESPONSE_BUILDER, HTTP_FIND_ONE_RESPONSE_BUILDER, HTTP_PAGE_BUILDER_TOKEN} from './ngx-http-repository.module.di';
import {AbstractRepository, Normalizer, PageBuilder, PathDenormalizer, ResponseBuilder} from '@witty-services/ngx-repository';

/**
 * @ignore
 */
export class HttpRepository<T, K> extends AbstractRepository<T, K, HttpResourceContext, HttpResponse<any>> {

  public constructor(httpDriver: HttpDriver,
                     normalizer: Normalizer,
                     denormalizer: PathDenormalizer,
                     httpQueryBuilder: HttpQueryBuilder,
                     @Inject(HTTP_PAGE_BUILDER_TOKEN) httpPageBuilder: PageBuilder<HttpResponse<any>>,
                     @Inject(HTTP_CREATE_RESPONSE_BUILDER) httpCreateResponseBuilder: ResponseBuilder<HttpResponse<any>>,
                     @Inject(HTTP_FIND_ONE_RESPONSE_BUILDER) httpFineOneResponseBuilder: ResponseBuilder<HttpResponse<any>>,
                     @Optional() injector?: Injector) {
    super(
      HTTP_RESOURCE_METADATA_KEY,
      httpDriver,
      normalizer,
      denormalizer,
      httpQueryBuilder,
      httpPageBuilder,
      httpCreateResponseBuilder,
      httpFineOneResponseBuilder
    );

    if (!this.repositoryContextConfiguration) {
      return;
    }

    if (!(this.resourceContextConfiguration.create instanceof Object)) {
      return;
    }

    if (!injector) {
      return;
    }

    this.createResponseBuilder = injector.get(this.resourceContextConfiguration.create.responseBuilder());
  }
}
