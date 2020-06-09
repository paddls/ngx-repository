import {PropertyKeyConfiguration} from '@witty-services/ngx-repository';

/**
 * @ignore
 */
export const FIREBASE_END_AT_METADATA_KEY: string = 'firebaseEndAt';

/**
 * @ignore
 */
export interface FirebaseEndAtContextConfiguration extends PropertyKeyConfiguration {
}

export function FirebaseEndAt(): any {
  return (target: any, propertyKey: string) => {
    const firebaseEndAtContextConfiguration: FirebaseEndAtContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_END_AT_METADATA_KEY, firebaseEndAtContextConfiguration, target);
  };
}
