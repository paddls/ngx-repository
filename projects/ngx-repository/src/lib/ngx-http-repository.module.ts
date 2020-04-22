import 'reflect-metadata';

import {NgModule, Provider} from '@angular/core';
import {HttpDriver} from './http/http.driver';
import {HttpConnection} from './http/http.connection';
import {HttpQueryBuilder} from './http/http.query-builder';
import {NormalizerConfiguration} from './normalizer/normalizer.configuration';
import {HTTP_DENORMALIZER_TOKEN, HTTP_PAGE_BUILDER_TOKEN} from './ngx-http-repository.module.di';
import {NORMALIZER_CONFIGURATION_TOKEN} from './ngx-repository.module.di';
import {Denormalizer} from './normalizer/denormalizer';
import {HttpNoPageBuilder} from './http/http-no.page-builder';
import {HttpClientModule} from '@angular/common/http';

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
