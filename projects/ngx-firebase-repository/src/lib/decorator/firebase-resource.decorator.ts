import { FirebaseRepositoryParamConfiguration } from '../configuration/firebase-repository-param.configuration';

/**
 * @ignore
 */
export const FIREBASE_RESOURCE_METADATA_KEY: string = 'firebaseResource';

export function FirebaseResource(params: FirebaseRepositoryParamConfiguration): any {
  return (target: any): void => {
    Reflect.defineMetadata(FIREBASE_RESOURCE_METADATA_KEY, params, target);
  };
}
