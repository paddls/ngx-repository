import {FirebaseStartAfterContextConfiguration} from '../configuration/context/firebase-start-after-context.configuration';

/**
 * @ignore
 */
export const FIREBASE_START_AFTER_METADATA_KEY: string = 'firebaseStartAfter';

export function FirebaseStartAfter(): any {
  return (target: any, propertyKey: string) => {
    const firebaseStartAfterContextConfiguration: FirebaseStartAfterContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_START_AFTER_METADATA_KEY, firebaseStartAfterContextConfiguration, target);
  };
}
