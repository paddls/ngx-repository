import {PropertyKeyConfiguration} from '@witty-services/ngx-repository';

/**
 * @ignore
 */
export const FIREBASE_START_AFTER_METADATA_KEY: string = 'firebaseStartAfter';

/**
 * @ignore
 */
export interface FirebaseStartAfterContextConfiguration extends PropertyKeyConfiguration {
}

export function FirebaseStartAfter(): any {
  return (target: any, propertyKey: string) => {
    const firebaseStartAfterContextConfiguration: FirebaseStartAfterContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_START_AFTER_METADATA_KEY, firebaseStartAfterContextConfiguration, target);
  };
}
