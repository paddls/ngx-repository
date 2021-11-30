import { HttpRepositoryParamConfiguration } from './http-repository-param.configuration';
import { InjectionToken } from '@angular/core';

export const HTTP_REPOSITORY_CONFIGURATION: InjectionToken<HttpRepositoryConfiguration> = new InjectionToken<HttpRepositoryConfiguration>('HTTP_REPOSITORY_CONFIGURATION');

export interface HttpRepositoryConfiguration extends HttpRepositoryParamConfiguration {
  read?: HttpRepositoryParamConfiguration;
  write?: HttpRepositoryParamConfiguration;
  findById?: HttpRepositoryParamConfiguration;
  findOne?: HttpRepositoryParamConfiguration;
  findAll?: HttpRepositoryParamConfiguration;
  create?: HttpRepositoryParamConfiguration;
  update?: HttpRepositoryParamConfiguration;
  patch?: HttpRepositoryParamConfiguration;
  delete?: HttpRepositoryParamConfiguration;
}
