import 'reflect-metadata';

import { NgModule, Provider } from '@angular/core';
import { HttpRepositoryBuilder } from './repository/http-repository.builder';
import { HttpClientModule } from '@angular/common/http';
import { CONNECTIONS_TOKEN } from '@witty-services/ngx-repository';
import { HttpRepositoryDriver } from './driver/http-repository.driver';
import { HttpResponseBuilder } from './response/http-response.builder';
import {HttpRequestBuilder} from './request/http-request.builder';

const MODULE_PROVIDERS: Provider[] = [
  HttpRepositoryBuilder,
  HttpRepositoryDriver,
  HttpRequestBuilder,
  HttpResponseBuilder,
  {
    provide: CONNECTIONS_TOKEN,
    useExisting: HttpRepositoryBuilder,
    multi: true
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
