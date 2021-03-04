import {FirebaseStartAtContextConfiguration} from '../configuration/context/firebase-start-at-context.configuration';

/**
 * @ignore
 */
export const FIREBASE_START_AT_METADATA_KEY: string = 'firebaseStartAt';

export function FirebaseStartAt(): any {
  return (target: any, propertyKey: string) => {
    const firebaseStartAtContextConfiguration: FirebaseStartAtContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_START_AT_METADATA_KEY, firebaseStartAtContextConfiguration, target);
  };
}
