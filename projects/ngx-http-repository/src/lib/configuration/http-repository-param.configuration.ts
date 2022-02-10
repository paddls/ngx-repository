import { PathParamConfiguration, ResourceParamConfiguration } from '@paddls/ngx-repository';

export interface HttpRepositoryParamConfiguration extends ResourceParamConfiguration, PathParamConfiguration {
  path?: string;
  method?: string;
}
