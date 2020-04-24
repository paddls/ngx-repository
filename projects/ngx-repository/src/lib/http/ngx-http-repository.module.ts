import 'reflect-metadata';

import {NgModule, Provider} from '@angular/core';
import {HttpDriver} from './http.driver';
import {HttpConnection} from './http.connection';
import {HttpQueryBuilder} from './http.query-builder';
import {
  HTTP_DENORMALIZER_TOKEN,
  HTTP_CREATE_RESPONSE_BUILDER,
  HTTP_FIND_ONE_RESPONSE_BUILDER,
  HTTP_PAGE_BUILDER_TOKEN
} from './ngx-http-repository.module.di';
import {HttpNoPageBuilder} from './http-no.page-builder';
import {HttpClientModule} from '@angular/common/http';
import {NormalizerConfiguration} from '../normalizer/normalizer.configuration';
import {Denormalizer} from '../normalizer/denormalizer';
import {NORMALIZER_CONFIGURATION_TOKEN} from '../ngx-repository.module.di';
import {HttpBodyResponseBuilder} from './http-body.response-builder';

export function httpDenormalizerToken(httpConnection: HttpConnection, normalizerConfiguration: NormalizerConfiguration): Denormalizer {
  return new Denormalizer(httpConnection, normalizerConfiguration);
}

const MODULE_PROVIDERS: Provider[] = [
  HttpConnection,
  HttpDriver,
  HttpQueryBuilder,
  {
    provide: HTTP_DENORMALIZER_TOKEN,
    useFactory: httpDenormalizerToken,
    deps: [HttpConnection, NORMALIZER_CONFIGURATION_TOKEN]
  },
  {
    provide: HTTP_PAGE_BUILDER_TOKEN,
    useClass: HttpNoPageBuilder
  },
  {
    provide: HTTP_CREATE_RESPONSE_BUILDER,
    useClass: HttpBodyResponseBuilder
  },
  {
    provide: HTTP_FIND_ONE_RESPONSE_BUILDER,
    useClass: HttpBodyResponseBuilder
  }
];

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ...MODULE_PROVIDERS
  ]
})
export class NgxHttpRepositoryModule {
}
