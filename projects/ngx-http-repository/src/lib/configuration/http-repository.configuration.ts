import { HttpRepositoryParamConfiguration } from './http-repository-param.configuration';

export interface HttpRepositoryConfiguration extends HttpRepositoryParamConfiguration {
  read?: HttpRepositoryParamConfiguration;
  create?: HttpRepositoryParamConfiguration;
  delete?: HttpRepositoryParamConfiguration;
  findAll?: HttpRepositoryParamConfiguration;
  update?: HttpRepositoryParamConfiguration|string; // TODO @RMA typing create wrapper for @HttpResource
}
