import 'reflect-metadata';

import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {Normalizer} from './normalizer/normalizer';
import {DEFAULT_NORMALIZER_CONFIGURATION, NormalizerConfiguration} from './normalizer/normalizer.configuration';
import {NORMALIZER_CONFIGURATION_TOKEN} from './ngx-repository.module.di';
import {Denormalizer} from './normalizer/denormalizer';
import {NgxRepositoryService} from './ngx-repository.service';

export interface Config {
  normalizerConfiguration?: NormalizerConfiguration;
}

const MODULE_PROVIDERS: Provider[] = [
  Denormalizer,
  NgxRepositoryService,
  Normalizer
];

@NgModule({
  providers: [
    ...MODULE_PROVIDERS
  ]
})
export class NgxRepositoryModule {

  public static ngxRepositoryService: NgxRepositoryService = null;

  public constructor(ngxRepositoryService: NgxRepositoryService) {
    NgxRepositoryModule.ngxRepositoryService = ngxRepositoryService;
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
}
