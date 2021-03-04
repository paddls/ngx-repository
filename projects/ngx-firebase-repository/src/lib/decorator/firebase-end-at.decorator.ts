import {FirebaseEndAtContextConfiguration} from '../configuration/context/firebase-end-at-context.configuration';

/**
 * @ignore
 */
export const FIREBASE_END_AT_METADATA_KEY: string = 'firebaseEndAt';

export function FirebaseEndAt(): any {
  return (target: any, propertyKey: string) => {
    const firebaseEndAtContextConfiguration: FirebaseEndAtContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_END_AT_METADATA_KEY, firebaseEndAtContextConfiguration, target);
  };
}
