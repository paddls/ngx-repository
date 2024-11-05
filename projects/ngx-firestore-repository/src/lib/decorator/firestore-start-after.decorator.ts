import {
  FirestoreStartAfterContextConfiguration
} from '../configuration/context/firestore-start-after-context.configuration';

/**
 * @ignore
 */
export const FIRESTORE_START_AFTER_METADATA_KEY: string = 'firestoreStartAfter';

export function FirestoreStartAfter(): any {
  return (target: any, propertyKey: string) => {
    const firestoreStartAfterContextConfiguration: FirestoreStartAfterContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIRESTORE_START_AFTER_METADATA_KEY, firestoreStartAfterContextConfiguration, target);
  };
}
