import {PropertyKeyConfiguration} from '@witty-services/ngx-repository';

export const FIREBASE_END_BEFORE_METADATA_KEY: string = 'firebaseEndBefore';

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
