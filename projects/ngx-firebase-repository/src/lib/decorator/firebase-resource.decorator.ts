import { FirebaseResourceConfiguration } from '../configuration/firebase-repository.configuration';

/**
 * @ignore
 */
export const FIREBASE_RESOURCE_METADATA_KEY: string = 'firebaseResource';

export function FirebaseResource(params: FirebaseResourceConfiguration): any {
  return (target: any): void => {
    Reflect.defineMetadata(FIREBASE_RESOURCE_METADATA_KEY, params, target);
  };
}
