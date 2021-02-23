import { PathParamConfiguration } from '@witty-services/ngx-repository';

/**
 * @ignore
 */
export interface FirebaseResourceConfiguration extends PathParamConfiguration {
  firebaseConfiguration?: string; // TODO @RMA multiple firebase project configuration
}
