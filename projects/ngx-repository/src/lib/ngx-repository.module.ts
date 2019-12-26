import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {
  Normalizer,
  Denormalizer,
  NormalizerConfiguration
} from '@witty-services/repository-core';
import {InjectorStrategyRepositoryInstantiation} from './strategy/injector.strategy-repository-instantiation';

export interface Config {
  normalizerConfiguration: NormalizerConfiguration;
}

export function normalizerFactory<T>(configuration: NormalizerConfiguration): Normalizer<T> {
  return new Normalizer(configuration);
}

export function denormalizerFactory<T>(configuration: NormalizerConfiguration,
                                       strategy: InjectorStrategyRepositoryInstantiation): Denormalizer<T> {
  return new Denormalizer(strategy, configuration);
}

const moduleProviders: Provider[] = [
  InjectorStrategyRepositoryInstantiation,
  {
    provide: Normalizer,
    useFactory: normalizerFactory,
    deps: [NormalizerConfiguration]
  },
  {
    provide: Denormalizer,
    useFactory: denormalizerFactory,
    deps: [NormalizerConfiguration, InjectorStrategyRepositoryInstantiation]
  }
];

@NgModule({
  providers: [
    {
      provide: NormalizerConfiguration,
      useValue: new NormalizerConfiguration()
    },
    ...moduleProviders,
  ]
})
export class NgxRepositoryModule {

  public constructor() {}

  public static forRoot(config?: Config): ModuleWithProviders<NgxRepositoryModule> {
    return {
      ngModule: NgxRepositoryModule,
      providers: [
        {
          provide: NormalizerConfiguration,
          useValue: config && config.normalizerConfiguration ? config.normalizerConfiguration : new NormalizerConfiguration()
        },
        ...moduleProviders
      ]
    };
  }
}
