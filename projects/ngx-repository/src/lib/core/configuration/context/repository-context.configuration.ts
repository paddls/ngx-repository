import { ResourceConfiguration } from '../resource.configuration';
import { Type } from '@angular/core';

/**
 * @ignore
 */
export interface RepositoryContextConfiguration<T> {

  resourceType: () => Type<T>;

  defaultConfiguration?: ResourceConfiguration;
}
