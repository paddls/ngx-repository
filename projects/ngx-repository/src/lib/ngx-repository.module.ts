import 'reflect-metadata';

import {
  EnvironmentProviders,
  importProvidersFrom,
  inject,
  Injector,
  makeEnvironmentProviders,
  ModuleWithProviders,
  NgModule,
  provideAppInitializer
} from '@angular/core';
import { NgxRepositoryService } from './ngx-repository.service';
import { DEFAULT_NORMALIZER_CONFIGURATION, NormalizerConfiguration } from '@paddls/ts-serializer';
import { RequestManager } from './core/manager/request.manager';
import { RepositoryNormalizer } from './normalizer/repository-denormalizer';
import { DenormalizeResponseProcessor } from './core/response/processor/denormalize-response.processor';
import { PageResponseProcessor } from './core/response/processor/page-response.processor';
import { IdResponseProcessor } from './core/response/processor/id-response.processor';
import { PathColumnResponseProcessor } from './core/response/processor/path-column-response.processor';
import { OriginalQueryResponseProcessor } from './core/response/processor/original-query-response.processor';
import { PublisherService } from './core/event-stream/publisher.service';
import { NgxSerializerModule, NORMALIZER_CONFIGURATION_TOKEN } from '@paddls/ngx-serializer';
import {VoidResponseProcessor} from './core/response/processor/void-response.processor';
import {ResponseBuilder} from './core/response/response.builder';
import {TokenRegistry} from './core/registry/token.registry';
import {BodyResponseProcessor} from './core/response/processor/body.response-processor';

/**
 * @ignore
 */
export interface Config {
  normalizerConfiguration?: NormalizerConfiguration;
}

export function provideNgxRepository(config?: Config): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => ((injector: Injector) => (): void => {
      TokenRegistry.clear();
      NgxRepositoryModule.injector = injector;
    })(inject(Injector))()),
    importProvidersFrom(
      NgxSerializerModule.forRoot(config && config.normalizerConfiguration ? config : {normalizerConfiguration: DEFAULT_NORMALIZER_CONFIGURATION})
    ),
    {
      provide: NORMALIZER_CONFIGURATION_TOKEN,
      useValue: config && config.normalizerConfiguration ? config.normalizerConfiguration : DEFAULT_NORMALIZER_CONFIGURATION
    },
    RepositoryNormalizer,
    NgxRepositoryService,
    RequestManager,
    ResponseBuilder,
    DenormalizeResponseProcessor,
    PageResponseProcessor,
    IdResponseProcessor,
    BodyResponseProcessor,
    VoidResponseProcessor,
    OriginalQueryResponseProcessor,
    PathColumnResponseProcessor,
    PublisherService
  ]);
}

/**
 * @ignore
 */
@NgModule()
export class NgxRepositoryModule {

  public static injector: Injector = null;

  /**
   * @deprecated use provideNgxRepository() instead
   */
  public static forRoot(config?: Config): ModuleWithProviders<NgxRepositoryModule> {
    return {
      ngModule: NgxRepositoryModule,
      providers: [
        provideNgxRepository(config)
      ]
    };
  }
}
