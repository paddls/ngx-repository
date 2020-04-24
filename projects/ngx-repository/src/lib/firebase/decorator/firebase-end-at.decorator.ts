import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export const FIREBASE_END_AT_METADATA_KEY: string = 'firebaseEndAt';

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
