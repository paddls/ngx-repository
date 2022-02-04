import {FirestoreEndAtContextConfiguration} from '../configuration/context/firestore-end-at-context.configuration';

/**
 * @ignore
 */
export const FIRESTORE_END_AT_METADATA_KEY: string = 'firestoreEndAt';

export function FirestoreEndAt(): any {
  return (target: any, propertyKey: string) => {
    const firestoreEndAtContextConfiguration: FirestoreEndAtContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIRESTORE_END_AT_METADATA_KEY, firestoreEndAtContextConfiguration, target);
  };
}
