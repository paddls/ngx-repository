import { PathParamConfiguration, ResourceParamConfiguration } from '@witty-services/ngx-repository';

export interface HttpRepositoryParamConfiguration extends ResourceParamConfiguration, PathParamConfiguration {
  path?: string;
  method?: string;
}
