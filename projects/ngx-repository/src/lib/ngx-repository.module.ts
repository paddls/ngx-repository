import 'reflect-metadata';

import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {HttpDriver} from './driver/http/http.driver';
import {HttpConnection} from './connection/http/http.connection';
import {Normalizer} from './normalizer/normalizer';
import {HttpQueryBuilder} from './query-builder/http/http.query-builder';
import {DEFAULT_NORMALIZER_CONFIGURATION, NormalizerConfiguration} from './normalizer/normalizer.configuration';
import {HTTP_DENORMALIZER_TOKEN, HTTP_PAGE_BUILDER_TOKEN, NORMALIZER_CONFIGURATION_TOKEN} from './ngx-repository.module.di';
import {Denormalizer} from './normalizer/denormalizer';
import {HttpNoPageBuilder} from './page-builder/http/http-no.page-builder';
import {HttpClientModule} from '@angular/common/http';

export interface Config {
  normalizerConfiguration?: NormalizerConfiguration;
}

export function httpDenormalizerToken(httpConnection: HttpConnection, normalizerConfiguration: NormalizerConfiguration): Denormalizer {
  return new Denormalizer(httpConnection, normalizerConfiguration);
}

const MODULE_PROVIDERS: Provider[] = [
  HttpConnection,
  HttpDriver,
  HttpQueryBuilder,
  Normalizer,
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
export class NgxRepositoryModule {

  public static injector: Injector = null;

  public constructor(injector: Injector) {
    NgxRepositoryModule.injector = injector;
  }

  public static forRoot(config: Config = {}): ModuleWithProviders<NgxRepositoryModule> {
    return {
      ngModule: NgxRepositoryModule,
      providers: [
        {
          provide: NORMALIZER_CONFIGURATION_TOKEN,
          useValue: {
            ...DEFAULT_NORMALIZER_CONFIGURATION,
            ...(config.normalizerConfiguration || {})
          }
        },
        ...MODULE_PROVIDERS
      ]
    };
  }
}
