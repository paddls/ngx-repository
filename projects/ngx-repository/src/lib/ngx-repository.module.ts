import 'reflect-metadata';

import { Injector, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NORMALIZER_CONFIGURATION_TOKEN } from './ngx-repository.module.di';
import { NgxRepositoryService } from './ngx-repository.service';
import { DEFAULT_NORMALIZER_CONFIGURATION, NormalizerConfiguration } from '@witty-services/ts-serializer';
import { RequestManager } from './core/manager/request.manager';
import { RepositoryNormalizer } from './normalizer/repository-denormalizer';
import { DenormalizeResponseProcessor } from './core/response/processor/denormalize-response.processor';
import { PageResponseProcessor } from './core/response/processor/page-response.processor';
import { PathColumnResponseProcessor } from './core/response/processor/path-column-response.processor';
import { OriginalQueryResponseProcessor } from './core/response/processor/original-query-response.processor';

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

  public constructor(injector: Injector) {
    NgxRepositoryService.getInstance = () => injector.get(NgxRepositoryService);
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
}
