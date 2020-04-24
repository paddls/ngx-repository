import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export const FIREBASE_LIMIT_TO_LAST_METADATA_KEY: string = 'firebaseLimit';

export interface FirebaseLimitToLastContextConfiguration extends PropertyKeyConfiguration {
}

export function FirebaseLimitToLast(): any {
  return (target: any, propertyKey: string) => {
    const firebaseLimitToLastContextConfiguration: FirebaseLimitToLastContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_LIMIT_TO_LAST_METADATA_KEY, firebaseLimitToLastContextConfiguration, target);
  };
}
