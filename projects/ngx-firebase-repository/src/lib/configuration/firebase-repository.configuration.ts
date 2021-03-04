import {FirebaseRepositoryParamConfiguration} from './firebase-repository-param.configuration';
import {ResourceParamConfiguration} from '@witty-services/ngx-repository';

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
