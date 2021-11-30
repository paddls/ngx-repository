import 'reflect-metadata';

import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { REPOSITORY_BUILDER_TOKEN } from '@witty-services/ngx-repository';
import { HttpRepositoryDriver } from './driver/http-repository.driver';
import { HttpRequestBuilder } from './request/http-request.builder';
import { HttpRepositoryContextConfiguration } from './configuration/context/http-repository-context.configuration';
import { LogExecuteHttpRequestEventListener } from './driver/listener/log-execute-http-request-event.listener';
import { HttpRepositoryBuilder } from './repository/http-repository.builder';
import { HTTP_REPOSITORY_CONFIGURATION } from './configuration/http-repository.configuration';

const PROVIDERS: Provider[] = [
  HttpRepositoryBuilder,
  HttpRepositoryDriver,
  HttpRequestBuilder,
  {
    provide: REPOSITORY_BUILDER_TOKEN,
    useExisting: HttpRepositoryBuilder,
    multi: true
  }
];

export interface NgxHttpRepositoryModuleConfiguration {

  configuration?: HttpRepositoryContextConfiguration;

  debug?: boolean;
}

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

  public static forRoot(config: NgxHttpRepositoryModuleConfiguration = { debug: false }): ModuleWithProviders<NgxHttpRepositoryModule> {
    const providers: Provider[] = [
      {
        provide: HTTP_REPOSITORY_CONFIGURATION,
        useValue: config ? config.configuration || {} : {} // TODO @RMA simplify when typescript 4
      }
    ];

    if (config.debug) {
      providers.push(LogExecuteHttpRequestEventListener);
    }

    return {
      ngModule: NgxHttpRepositoryModule,
      providers
    };
  }
}
