import {PropertyKeyConfiguration} from '@witty-services/ngx-repository';

export const FIREBASE_LIMIT_METADATA_KEY: string = 'firebaseLimit';

export interface FirebaseLimitContextConfiguration extends PropertyKeyConfiguration {
}

export function FirebaseLimit(): any {
  return (target: any, propertyKey: string) => {
    const firebaseLimitContextConfiguration: FirebaseLimitContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_LIMIT_METADATA_KEY, firebaseLimitContextConfiguration, target);
  };
}
