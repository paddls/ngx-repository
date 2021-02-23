import 'reflect-metadata';

import { Injector, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NORMALIZER_CONFIGURATION_TOKEN } from './ngx-repository.module.di';
import { NgxRepositoryService } from './ngx-repository.service';
import { DEFAULT_NORMALIZER_CONFIGURATION, NormalizerConfiguration } from '@witty-services/ts-serializer';
import { RequestManager } from './core/manager/request.manager';
import { RepositoryNormalizer } from './normalizer/repository-denormalizer';
import { DenormalizeResponseProcessor } from './core/response/transformer/denormalize-response.processor';
import { PageResponseProcessor } from './core/response/transformer/page-response.processor';
import { PathColumnResponseProcessor } from './core/response/transformer/path-column-response.processor';
import { OriginalQueryResponseProcessor } from './core/response/transformer/original-query-response.processor';

/**
 * @ignore
 */
export interface Config {
  normalizerConfiguration?: NormalizerConfiguration;
}

/**
 * @ignore
 */
const MODULE_PROVIDERS: Provider[] = [
  RepositoryNormalizer,
  NgxRepositoryService,
  RequestManager,
  DenormalizeResponseProcessor,
  PageResponseProcessor,
  OriginalQueryResponseProcessor,
  PathColumnResponseProcessor
];

/**
 * @ignore
 */
@NgModule({})
export class NgxRepositoryModule {

  public static injector: Injector = null;

  public constructor(injector: Injector) {
    NgxRepositoryModule.injector = injector;
  }

  public static forRoot(config?: Config): ModuleWithProviders<NgxRepositoryModule> {
    return {
      ngModule: NgxRepositoryModule,
      providers: [
        {
          provide: NORMALIZER_CONFIGURATION_TOKEN,
          useValue: config && config.normalizerConfiguration ? config.normalizerConfiguration : DEFAULT_NORMALIZER_CONFIGURATION
        },
        ...MODULE_PROVIDERS
      ]
    };
  }

  public static getNgxRepositoryService(): NgxRepositoryService {
    return NgxRepositoryModule.injector.get(NgxRepositoryService);
  }
}
