import 'reflect-metadata';

import { EnvironmentProviders, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { REPOSITORY_BUILDER_TOKEN } from '@paddls/ngx-repository';
import { HttpRepositoryDriver } from './driver/http-repository.driver';
import { HttpRequestBuilder } from './request/http-request.builder';
import { HttpRepositoryContextConfiguration } from './configuration/context/http-repository-context.configuration';
import { LogExecuteHttpRequestEventListener } from './driver/listener/log-execute-http-request-event.listener';
import { HttpRepositoryBuilder } from './repository/http-repository.builder';
import { HTTP_REPOSITORY_CONFIGURATION } from './configuration/http-repository.configuration';

const PROVIDERS: (Provider | EnvironmentProviders)[] = [
  HttpRepositoryBuilder,
  HttpRepositoryDriver,
  HttpRequestBuilder,
  {
    provide: REPOSITORY_BUILDER_TOKEN,
    useExisting: HttpRepositoryBuilder,
    multi: true
  },
  provideHttpClient(withInterceptorsFromDi())
];

export interface NgxHttpRepositoryModuleConfiguration {

  configuration?: HttpRepositoryContextConfiguration;

  debug?: boolean;
}

export function provideNgxHttpRepositoryModule(config: NgxHttpRepositoryModuleConfiguration = {debug: false}): EnvironmentProviders | Provider[] {
  const providers: Provider | EnvironmentProviders[] = [
    ...PROVIDERS,
    {
      provide: HTTP_REPOSITORY_CONFIGURATION,
      useValue: config?.configuration || {}
    }
  ];

  if (config.debug) {
    providers.push(LogExecuteHttpRequestEventListener);
  }

  return providers;
}

/**
 * @ignore
 */
@NgModule({
  imports: [], providers: [
    ...PROVIDERS
  ]
})
export class NgxHttpRepositoryModule {

  /**
   *  @deprecated The method should not be used, use provideNgxHttpRepositoryModule
   */
  public static forRoot(config: NgxHttpRepositoryModuleConfiguration = {debug: false}): ModuleWithProviders<NgxHttpRepositoryModule> {
    const providers: Provider[] = [
      {
        provide: HTTP_REPOSITORY_CONFIGURATION,
        useValue: config?.configuration || {}
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
