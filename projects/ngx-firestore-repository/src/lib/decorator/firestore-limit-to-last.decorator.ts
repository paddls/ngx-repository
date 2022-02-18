import {
  FirestoreLimitToLastContextConfiguration
} from '../configuration/context/firestore-limit-to-last-context.configuration';

/**
 * @ignore
 */
export const FIRESTORE_LIMIT_TO_LAST_METADATA_KEY: string = 'firestoreLimitToLast';

export function FirestoreLimitToLast(): any {
  return (target: any, propertyKey: string) => {
    const firestoreLimitToLastContextConfiguration: FirestoreLimitToLastContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIRESTORE_LIMIT_TO_LAST_METADATA_KEY, firestoreLimitToLastContextConfiguration, target);
  };
}
