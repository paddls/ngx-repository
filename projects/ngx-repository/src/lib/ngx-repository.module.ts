import 'reflect-metadata';

import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {Normalizer} from './normalizer/normalizer';
import {DEFAULT_NORMALIZER_CONFIGURATION, NormalizerConfiguration} from './normalizer/normalizer.configuration';
import {NORMALIZER_CONFIGURATION_TOKEN} from './ngx-repository.module.di';
import {HttpClientModule} from '@angular/common/http';

export interface Config {
  normalizerConfiguration?: NormalizerConfiguration;
}

const MODULE_PROVIDERS: Provider[] = [
  Normalizer
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
