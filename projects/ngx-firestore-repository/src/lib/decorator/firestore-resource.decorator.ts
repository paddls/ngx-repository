import { FirestoreResourceConfiguration } from '../configuration/firestore-repository.configuration';

/**
 * @ignore
 */
export const FIRESTORE_RESOURCE_METADATA_KEY: string = 'firestoreResource';

export function FirestoreResource(params: FirestoreResourceConfiguration): any {
  return (target: any): void => {
    Reflect.defineMetadata(FIRESTORE_RESOURCE_METADATA_KEY, params, target);
  };
}
