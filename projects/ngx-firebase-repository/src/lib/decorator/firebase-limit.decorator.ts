import {FirebaseLimitContextConfiguration} from '../configuration/context/firebase-limit-context.configuration';

/**
 * @ignore
 */
export const FIREBASE_LIMIT_METADATA_KEY: string = 'firebaseLimit';

export function FirebaseLimit(): any {
  return (target: any, propertyKey: string) => {
    const firebaseLimitContextConfiguration: FirebaseLimitContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_LIMIT_METADATA_KEY, firebaseLimitContextConfiguration, target);
  };
}
