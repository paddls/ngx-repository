import 'reflect-metadata';

import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {HttpDriver} from './driver/http/http.driver';
import {HttpConnection} from './connection/http/http.connection';
import {Normalizer} from './normalizer/normalizer';
import {HttpQueryBuilder} from './query-builder/http/http.query-builder';
import {NormalizerConfiguration} from './normalizer/normalizer.configuration';
import {HTTP_DENORMALIZER_TOKEN, HTTP_PAGE_BUILDER_TOKEN} from './ngx-repository.module.di';
import {Denormalizer} from './normalizer/denormalizer';
import {HttpNoPageBuilder} from './page-builder/http/http-no.page-builder';
import {HttpClientModule} from '@angular/common/http';

export interface Config {
  normalizerConfiguration?: NormalizerConfiguration;
  httpPageBuilder?: Provider;
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
    deps: [HttpConnection, NormalizerConfiguration]
  },
  HttpNoPageBuilder
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

  public static forRoot(config?: Config): ModuleWithProviders<NgxRepositoryModule> {
    const newConfiguration: ModuleWithProviders<NgxRepositoryModule> = {
      ngModule: NgxRepositoryModule,
      providers: [
        {
          provide: NormalizerConfiguration,
          useValue: config && config.normalizerConfiguration ? config.normalizerConfiguration : new NormalizerConfiguration()
        },
        ...MODULE_PROVIDERS
      ]
    };

    if (config && config.httpPageBuilder) {
      newConfiguration.providers.push(config.httpPageBuilder);
    } else {
      newConfiguration.providers.push({
        provide: HTTP_PAGE_BUILDER_TOKEN,
        useExisting: HttpNoPageBuilder
      });
    }

    return newConfiguration;
  }
}
