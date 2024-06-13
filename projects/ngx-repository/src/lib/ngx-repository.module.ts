import 'reflect-metadata';

import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {NgxRepositoryService} from './ngx-repository.service';
import {DEFAULT_NORMALIZER_CONFIGURATION, NormalizerConfiguration} from '@paddls/ts-serializer';
import {RequestManager} from './core/manager/request.manager';
import {RepositoryNormalizer} from './normalizer/repository-denormalizer';
import {DenormalizeResponseProcessor} from './core/response/processor/denormalize-response.processor';
import {PageResponseProcessor} from './core/response/processor/page-response.processor';
import {IdResponseProcessor} from './core/response/processor/id-response.processor';
import {PathColumnResponseProcessor} from './core/response/processor/path-column-response.processor';
import {OriginalQueryResponseProcessor} from './core/response/processor/original-query-response.processor';
import {PublisherService} from './core/event-stream/publisher.service';
import {NgxSerializerModule, NORMALIZER_CONFIGURATION_TOKEN} from '@paddls/ngx-serializer';
import {VoidResponseProcessor} from './core/response/processor/void-response.processor';
import {ResponseBuilder} from './core/response/response.builder';
import {BodyResponseProcessor} from './core/response/processor/body.response-processor';
import {TokenRegistry} from '../public-api';

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
  ResponseBuilder,
  DenormalizeResponseProcessor,
  PageResponseProcessor,
  IdResponseProcessor,
  BodyResponseProcessor,
  VoidResponseProcessor,
  OriginalQueryResponseProcessor,
  PathColumnResponseProcessor,
  PublisherService
];

/**
 * @ignore
 */
export const NGX_REPOSITORY_INJECTOR_INSTANCE: string = 'NGX_REPOSITORY_INJECTOR_INSTANCE';

export function provideNgxRepositoryModule(config?: Config): Provider[] {
  return [
    ...MODULE_PROVIDERS,
    {
      provide: NORMALIZER_CONFIGURATION_TOKEN,
      useValue: config && config.normalizerConfiguration ? config.normalizerConfiguration : DEFAULT_NORMALIZER_CONFIGURATION
    }
  ];
}



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
    Reflect.defineMetadata(NGX_REPOSITORY_INJECTOR_INSTANCE, injector, NgxRepositoryModule);
    TokenRegistry.clear();
    NgxRepositoryService.getInstance = () => injector.get(NgxRepositoryService); // TODO @RMA review this
    PublisherService.getInstance = () => injector.get(PublisherService);
  }

  /**
   * @deprecated The method should not be used, use provideNgxRepositoryModule instead
   */
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
