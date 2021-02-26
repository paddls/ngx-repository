import { Type } from '@angular/core';
import { merge } from 'lodash';
import { ResourceConfiguration } from '../configuration/resource.configuration';

/**
 * @ignore
 */
export const REPOSITORY_METADATA_KEY: string = 'repository';

/**
 * @ignore
 */
export const RESOURCE_CONFIGURATION_METADATA_KEY: string = 'resourceConfiguration';

export interface RepositoryConfiguration {
  resourceType: () => new(...args: any[]) => any;
  defaultConfiguration?: ResourceConfiguration;
}

// @dynamic
export function Repository(resourceType: () => Type<any>, configuration: ResourceConfiguration = null): any {
  return (target: any): void => {
    const defaultRepositoryConfiguration: RepositoryConfiguration = Reflect.getMetadata(REPOSITORY_METADATA_KEY, Object.getPrototypeOf(target));
    const defaultConfiguration: ResourceConfiguration = defaultRepositoryConfiguration ? defaultRepositoryConfiguration.defaultConfiguration : null;
    const params: RepositoryConfiguration = {
      resourceType,
      defaultConfiguration: merge({}, defaultConfiguration, configuration )
    };

    Reflect.defineMetadata(REPOSITORY_METADATA_KEY, params, target);
  };
}
