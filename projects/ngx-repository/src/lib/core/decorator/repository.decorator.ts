import { Type } from '@angular/core';
import { merge } from 'lodash';
import { ResourceConfiguration } from '../configuration/resource.configuration';
import {RepositoryContextConfiguration} from '../configuration/context/repository-context.configuration';

/**
 * @ignore
 */
export const REPOSITORY_METADATA_KEY: string = 'repository';

/**
 * @ignore
 */
export const RESOURCE_CONFIGURATION_METADATA_KEY: string = 'resourceConfiguration';

// @dynamic
export function Repository<RC extends ResourceConfiguration, T = any>(resourceType: () => Type<T>, configuration: RC = null): any {
  return (target: any): void => {
    const defaultRepositoryConfiguration: RepositoryContextConfiguration<T> = Reflect.getMetadata(REPOSITORY_METADATA_KEY, Object.getPrototypeOf(target));
    const defaultConfiguration: ResourceConfiguration = defaultRepositoryConfiguration ? defaultRepositoryConfiguration.defaultConfiguration : null;
    const params: RepositoryContextConfiguration<T> = {
      resourceType,
      defaultConfiguration: merge({}, defaultConfiguration, configuration )
    };

    Reflect.defineMetadata(REPOSITORY_METADATA_KEY, params, target);
  };
}

export function getRepositoryContextConfiguration<T>(target: any): RepositoryContextConfiguration<T> {
  return Reflect.getMetadata(REPOSITORY_METADATA_KEY, target);
}
