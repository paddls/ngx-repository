import 'reflect-metadata';

import {NgModule, Provider} from '@angular/core';
import {HttpDriver} from './http.driver';
import {HttpConnection} from './http.connection';
import {HttpQueryBuilder} from './http.query-builder';
import {HTTP_CREATE_RESPONSE_BUILDER, HTTP_FIND_ONE_RESPONSE_BUILDER, HTTP_PAGE_BUILDER_TOKEN} from './ngx-http-repository.module.di';
import {HttpNoPageBuilder} from './http-no.page-builder';
import {HttpClientModule} from '@angular/common/http';
import {HttpBodyResponseBuilder} from './http-body.response-builder';
import {CONNECTIONS_TOKEN} from '@witty-services/ngx-repository';
import {BodyIdResponseBuilder} from './body-id.response-builder';

const MODULE_PROVIDERS: Provider[] = [
  HttpConnection,
  HttpDriver,
  HttpQueryBuilder,
  {
    provide: CONNECTIONS_TOKEN,
    useExisting: HttpConnection,
    multi: true
  },
  {
    provide: HTTP_PAGE_BUILDER_TOKEN,
    useClass: HttpNoPageBuilder
  },
  {
    provide: HTTP_CREATE_RESPONSE_BUILDER,
    useClass: BodyIdResponseBuilder
  },
  {
    provide: HTTP_FIND_ONE_RESPONSE_BUILDER,
    useClass: HttpBodyResponseBuilder
  }
];

/**
 * @ignore
 */
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
