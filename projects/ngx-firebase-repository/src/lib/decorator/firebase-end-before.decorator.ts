import {PropertyKeyConfiguration} from '@witty-services/ngx-repository';

/**
 * @ignore
 */
export const FIREBASE_END_BEFORE_METADATA_KEY: string = 'firebaseEndBefore';

/**
 * @ignore
 */
export interface FirebaseEndBeforeContextConfiguration extends PropertyKeyConfiguration {
}

export function FirebaseEndBefore(): any {
  return (target: any, propertyKey: string) => {
    const firebaseEndBeforeContextConfiguration: FirebaseEndBeforeContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_END_BEFORE_METADATA_KEY, firebaseEndBeforeContextConfiguration, target);
  };
}
