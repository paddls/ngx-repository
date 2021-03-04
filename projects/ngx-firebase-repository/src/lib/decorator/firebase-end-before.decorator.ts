import {FirebaseEndBeforeContextConfiguration} from '../configuration/context/firebase-end-before-context.configuration';

/**
 * @ignore
 */
export const FIREBASE_END_BEFORE_METADATA_KEY: string = 'firebaseEndBefore';

export function FirebaseEndBefore(): any {
  return (target: any, propertyKey: string) => {
    const firebaseEndBeforeContextConfiguration: FirebaseEndBeforeContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_END_BEFORE_METADATA_KEY, firebaseEndBeforeContextConfiguration, target);
  };
}
