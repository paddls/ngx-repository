import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export const FIREBASE_START_AT_METADATA_KEY: string = 'firebaseStartAt';

export interface FirebaseStartAtContextConfiguration extends PropertyKeyConfiguration {
}

export function FirebaseStartAt(): any {
  return (target: any, propertyKey: string) => {
    const firebaseStartAtContextConfiguration: FirebaseStartAtContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_START_AT_METADATA_KEY, firebaseStartAtContextConfiguration, target);
  };
}
