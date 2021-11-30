import { FirebaseRepositoryParamConfiguration } from './firebase-repository-param.configuration';
import { ResourceParamConfiguration } from '@witty-services/ngx-repository';
import { InjectionToken } from '@angular/core';

export const FIREBASE_REPOSITORY_CONFIGURATION: InjectionToken<FirebaseResourceConfiguration> = new InjectionToken<FirebaseResourceConfiguration>('FIREBASE_REPOSITORY_CONFIGURATION');

/**
 * @ignore
 */
export interface FirebaseResourceConfiguration extends FirebaseRepositoryParamConfiguration {

  read?: ResourceParamConfiguration;

  write?: ResourceParamConfiguration;

  findAll?: ResourceParamConfiguration;

  findOne?: ResourceParamConfiguration;

  findById?: ResourceParamConfiguration;

  create?: ResourceParamConfiguration;

  delete?: ResourceParamConfiguration;

  update?: ResourceParamConfiguration;
}
