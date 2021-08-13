import {FirebaseLimitToLastContextConfiguration} from '../configuration/context/firebase-limit-to-last-context.configuration';

/**
 * @ignore
 */
export const FIREBASE_LIMIT_TO_LAST_METADATA_KEY: string = 'firebaseLimit';

export function FirebaseLimitToLast(): any {
  return (target: any, propertyKey: string) => {
    const firebaseLimitToLastContextConfiguration: FirebaseLimitToLastContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_LIMIT_TO_LAST_METADATA_KEY, firebaseLimitToLastContextConfiguration, target);
  };
}
