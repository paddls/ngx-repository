import 'reflect-metadata';

import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {NORMALIZER_CONFIGURATION_TOKEN} from './ngx-repository.module.di';
import {NgxRepositoryService} from './ngx-repository.service';
import {PathDenormalizer} from './normalizer/path.denormalizer';
import {DEFAULT_NORMALIZER_CONFIGURATION, Normalizer, NormalizerConfiguration} from '@witty-services/ts-serializer';

/**
 * @ignore
 */
export function normalizerFactory(configuration: NormalizerConfiguration): Normalizer {
  return new Normalizer(configuration);
}

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
  PathDenormalizer,
  NgxRepositoryService,
  {
    provide: Normalizer,
    useFactory: normalizerFactory,
    deps: [NORMALIZER_CONFIGURATION_TOKEN]
  },
  PathDenormalizer
];

/**
 * @ignore
 */
@NgModule({
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
        }
      ]
    };
  }

  public static getNgxRepositoryService(): NgxRepositoryService {
    return NgxRepositoryModule.injector.get(NgxRepositoryService);
  }
}
