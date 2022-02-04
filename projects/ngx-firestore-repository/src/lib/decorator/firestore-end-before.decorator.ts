import {FirestoreEndBeforeContextConfiguration} from '../configuration/context/firestore-end-before-context.configuration';

/**
 * @ignore
 */
export const FIRESTORE_END_BEFORE_METADATA_KEY: string = 'firestoreEndBefore';

export function FirestoreEndBefore(): any {
  return (target: any, propertyKey: string) => {
    const firestoreEndBeforeContextConfiguration: FirestoreEndBeforeContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIRESTORE_END_BEFORE_METADATA_KEY, firestoreEndBeforeContextConfiguration, target);
  };
}
