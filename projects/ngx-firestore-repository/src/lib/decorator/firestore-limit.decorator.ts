import {FirestoreLimitContextConfiguration} from '../configuration/context/firestore-limit-context.configuration';

/**
 * @ignore
 */
export const FIRESTORE_LIMIT_METADATA_KEY: string = 'firestoreLimit';

export function FirestoreLimit(): any {
  return (target: any, propertyKey: string) => {
    const firestoreLimitContextConfiguration: FirestoreLimitContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIRESTORE_LIMIT_METADATA_KEY, firestoreLimitContextConfiguration, target);
  };
}
