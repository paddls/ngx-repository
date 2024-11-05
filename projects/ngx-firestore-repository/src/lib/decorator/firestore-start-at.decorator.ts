import {
  FirestoreStartAtContextConfiguration
} from '../configuration/context/firestore-start-at-context.configuration';

/**
 * @ignore
 */
export const FIRESTORE_START_AT_METADATA_KEY: string = 'firestoreStartAt';

export function FirestoreStartAt(): any {
  return (target: any, propertyKey: string) => {
    const firestoreStartAtContextConfiguration: FirestoreStartAtContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIRESTORE_START_AT_METADATA_KEY, firestoreStartAtContextConfiguration, target);
  };
}
