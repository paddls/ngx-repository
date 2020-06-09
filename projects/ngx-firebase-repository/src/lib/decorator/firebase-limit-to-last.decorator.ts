import {PropertyKeyConfiguration} from '@witty-services/ngx-repository';

/**
 * @ignore
 */
export const FIREBASE_LIMIT_TO_LAST_METADATA_KEY: string = 'firebaseLimit';

/**
 * @ignore
 */
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
