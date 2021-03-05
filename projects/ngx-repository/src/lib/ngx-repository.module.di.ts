import { InjectionToken } from '@angular/core';
import { RepositoryBuilder } from './core/repository/repository.builder';
import { NormalizerConfiguration } from '@witty-services/ts-serializer';

/**
 * @ignore
 */
export const NORMALIZER_CONFIGURATION_TOKEN: InjectionToken<NormalizerConfiguration> = new InjectionToken<NormalizerConfiguration>('NORMALIZER_CONFIGURATION_TOKEN');

/**
 * @ignore
 */
export const REPOSITORY_BUILDER_TOKEN: InjectionToken<RepositoryBuilder> = new InjectionToken<RepositoryBuilder>('REPOSITORY_BUILDER');
