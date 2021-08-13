import { HttpRepositoryParamConfiguration } from './http-repository-param.configuration';

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
