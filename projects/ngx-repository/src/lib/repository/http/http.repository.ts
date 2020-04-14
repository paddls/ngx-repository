import {RxjsRepository} from '../rxjs.repository';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HTTP_RESOURCE_METADATA_KEY, HttpResourceContext} from '../../decorator/http/http-resource.decorator';
import {HttpDriver} from '../../driver/http/http.driver';
import {Normalizer} from '../../normalizer/normalizer';
import {HttpQueryBuilder} from '../../query-builder/http/http.query-builder';
import {Denormalizer} from '../../normalizer/denormalizer';
import {Inject} from '@angular/core';
import {HTTP_DENORMALIZER_TOKEN, HTTP_PAGE_BUILDER_TOKEN} from '../../ngx-repository.module.di';
import {PageBuilder} from '../../page-builder/page-builder';

export class HttpRepository<T, K> extends RxjsRepository<T, K, HttpResourceContext, HttpRequest<any>, Observable<HttpResponse<any>>> {

  public constructor(httpDriver: HttpDriver,
                     normalizer: Normalizer,
                     @Inject(HTTP_DENORMALIZER_TOKEN) denormalizer: Denormalizer,
                     httpQueryBuilder: HttpQueryBuilder,
                     @Inject(HTTP_PAGE_BUILDER_TOKEN) httpPageBuilder: PageBuilder<Observable<HttpResponse<any>>>) {
    super(HTTP_RESOURCE_METADATA_KEY, httpDriver, normalizer, denormalizer, httpQueryBuilder, httpPageBuilder);
  }
}
