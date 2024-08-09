import { FirestoreRepositoryParamConfiguration } from './firestore-repository-param.configuration';
import { ResourceConfiguration, ResourceParamConfiguration } from '@paddls/ngx-repository';
import { InjectionToken } from '@angular/core';
import { FIRESTORE_OPERATIONS } from '../request/firestore.operation';
import isString from '@paddls/utils/src/is-string';
import isUndefined from '@paddls/utils/src/is-undefined';
import get from '@paddls/utils/src/get';
import omit from '@paddls/utils/src/omit';

export const FIRESTORE_REPOSITORY_CONFIGURATION: InjectionToken<FirestoreResourceConfiguration> = new InjectionToken<FirestoreResourceConfiguration>('FIRESTORE_REPOSITORY_CONFIGURATION');

/**
 * @ignore
 */
export interface FirestoreResourceConfiguration extends FirestoreRepositoryParamConfiguration {

  read?: ResourceParamConfiguration;

  write?: ResourceParamConfiguration;

  findAll?: ResourceParamConfiguration;

  findOne?: ResourceParamConfiguration;

  findById?: ResourceParamConfiguration;

  create?: ResourceParamConfiguration;

  delete?: ResourceParamConfiguration;

  update?: ResourceParamConfiguration;

  patch?: ResourceParamConfiguration;
}

export function createFirestoreRepositoryConfiguration(params: ResourceConfiguration): FirestoreResourceConfiguration {
  return {
    findById: buildOperationParams(params, ['read', 'findById']),
    findOne: buildOperationParams(params, ['read', 'findOne']),
    findAll: buildOperationParams(params, ['read', 'findAll']),
    create: buildOperationParams(params, ['write', 'create']),
    update: buildOperationParams(params, ['write', 'update']),
    patch: buildOperationParams(params, ['write', 'patch']),
    delete: buildOperationParams(params, ['write', 'delete'])
  };
}

function buildOperationParams<T>(params: ResourceConfiguration, path: string[]) {
  const rootConfiguration: any = omit(params, FIRESTORE_OPERATIONS);
  const configurations: any[] = [
    rootConfiguration,
    ...path.map((key: string) => get(params, key))
      .filter((value: any) => !isUndefined(value))
  ].map((value: any) => isString(value) ? {path: value} : value);

  return Object.assign({}, ...configurations);
}
