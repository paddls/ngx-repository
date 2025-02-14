import 'reflect-metadata';

import { EnvironmentProviders, makeEnvironmentProviders, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { REPOSITORY_BUILDER_TOKEN } from '@paddls/ngx-repository';
import { HttpRepositoryDriver } from './driver/http-repository.driver';
import { HttpRequestBuilder } from './request/http-request.builder';
import { HttpRepositoryContextConfiguration } from './configuration/context/http-repository-context.configuration';
import { LogExecuteHttpRequestEventListener } from './driver/listener/log-execute-http-request-event.listener';
import { HttpRepositoryBuilder } from './repository/http-repository.builder';
import { HTTP_REPOSITORY_CONFIGURATION } from './configuration/http-repository.configuration';

export interface NgxHttpRepositoryModuleConfiguration {

  configuration?: HttpRepositoryContextConfiguration;

  debug?: boolean;
}

export function provideNgxHttpRepository(config: NgxHttpRepositoryModuleConfiguration = { debug: false }): EnvironmentProviders {
  const providers: (Provider | EnvironmentProviders)[] = [
    provideHttpClient(withInterceptorsFromDi()),
    HttpRepositoryBuilder,
    HttpRepositoryDriver,
    HttpRequestBuilder,
    {
      provide: REPOSITORY_BUILDER_TOKEN,
      useExisting: HttpRepositoryBuilder,
      multi: true
    },
    {
      provide: HTTP_REPOSITORY_CONFIGURATION,
      useValue: config?.configuration || {}
    }
  ];

  if (config.debug) {
    providers.push(LogExecuteHttpRequestEventListener);
  }

  return makeEnvironmentProviders(providers);
}


/**
 * @ignore
 */
@NgModule()
export class NgxHttpRepositoryModule {

  /**
   * @deprecated use provideNgxHttpRepository instead
   */
  public static forRoot(config: NgxHttpRepositoryModuleConfiguration = { debug: false }): ModuleWithProviders<NgxHttpRepositoryModule> {
    return {
      ngModule: NgxHttpRepositoryModule,
      providers: [
        provideNgxHttpRepository(config)
      ]
    };
  }
}
