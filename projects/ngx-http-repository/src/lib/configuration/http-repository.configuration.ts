import { HttpRepositoryParamConfiguration } from './http-repository-param.configuration';

export interface HttpRepositoryConfiguration extends HttpRepositoryParamConfiguration {
  read?: HttpRepositoryParamConfiguration;
  findAll?: HttpRepositoryParamConfiguration;
  update?: HttpRepositoryParamConfiguration|string; // TODO @RMA typing create wrapper for @HttpResource
}
