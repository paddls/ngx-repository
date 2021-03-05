import 'reflect-metadata';

import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { HttpRepositoryBuilder } from './repository/http-repository.builder';
import { HttpClientModule } from '@angular/common/http';
import { CONNECTIONS_TOKEN, getRepositoryContextConfiguration, Repository } from '@witty-services/ngx-repository';
import { HttpRepositoryDriver } from './driver/http-repository.driver';
import { HttpResponseBuilder } from './response/http-response.builder';
import { HttpRequestBuilder } from './request/http-request.builder';
import { HttpRepositoryConfiguration } from './configuration/http-repository.configuration';
import { HttpRepository } from './repository/http.repository';
import { merge } from 'lodash';
import {
  createHttpRepositoryConfiguration,
  HttpRepositoryContextConfiguration
} from './configuration/context/http-repository-context.configuration';
import { HttpFindAllResponseBuilder } from './response/http-find-all-response.builder';

const PROVIDERS: Provider[] = [
  HttpRepositoryBuilder,
  HttpRepositoryDriver,
  HttpRequestBuilder,
  HttpResponseBuilder,
  HttpFindAllResponseBuilder,
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
    ...PROVIDERS
  ]
})
export class NgxHttpRepositoryModule {
  public static forRoot(configuration?: HttpRepositoryContextConfiguration): ModuleWithProviders {
    if (configuration) {
      const defaultConfiguration: HttpRepositoryConfiguration = getRepositoryContextConfiguration(HttpRepository).defaultConfiguration;

      Repository(null, merge({}, defaultConfiguration, createHttpRepositoryConfiguration(configuration)))(HttpRepository);
    }

    return {
      ngModule: NgxHttpRepositoryModule
    };
  }
}
