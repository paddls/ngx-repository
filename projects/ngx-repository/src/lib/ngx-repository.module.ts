import 'reflect-metadata';

import { Injector, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NgxRepositoryService } from './ngx-repository.service';
import { DEFAULT_NORMALIZER_CONFIGURATION, NormalizerConfiguration } from '@witty-services/ts-serializer';
import { RequestManager } from './core/manager/request.manager';
import { RepositoryNormalizer } from './normalizer/repository-denormalizer';
import { DenormalizeResponseProcessor } from './core/response/processor/denormalize-response.processor';
import { PageResponseProcessor } from './core/response/processor/page-response.processor';
import { IdResponseProcessor } from './core/response/processor/id-response.processor';
import { PathColumnResponseProcessor } from './core/response/processor/path-column-response.processor';
import { OriginalQueryResponseProcessor } from './core/response/processor/original-query-response.processor';
import { TokenRegistry } from '../public-api';
import { PublisherService } from './core/event-stream/publisher.service';
import { NgxSerializerModule, NORMALIZER_CONFIGURATION_TOKEN } from '@witty-services/ngx-serializer';
import { VoidResponseProcessor } from './core/response/processor/void-response.processor';

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
  IdResponseProcessor,
  VoidResponseProcessor,
  OriginalQueryResponseProcessor,
  PathColumnResponseProcessor,
  PublisherService
];

/**
 * @ignore
 */
@NgModule({
  imports: [
    NgxSerializerModule
  ],
  providers: MODULE_PROVIDERS
})
export class NgxRepositoryModule {

  public constructor(injector: Injector) {
    TokenRegistry.clear();
    NgxRepositoryService.getInstance = () => injector.get(NgxRepositoryService);
    PublisherService.getInstance = () => injector.get(PublisherService);
  }

  public static forRoot(config?: Config): ModuleWithProviders<NgxRepositoryModule> {
    return {
      ngModule: NgxRepositoryModule,
      providers: [
        {
          provide: NORMALIZER_CONFIGURATION_TOKEN,
          useValue: config && config.normalizerConfiguration ? config.normalizerConfiguration : DEFAULT_NORMALIZER_CONFIGURATION
        }
      ]
    };
  }
}
