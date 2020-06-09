import * as firebase from 'firebase';
import FieldPath = firebase.firestore.FieldPath;
import OrderByDirection = firebase.firestore.OrderByDirection;
import {PropertyKeyConfiguration} from '@witty-services/ngx-repository';

/**
 * @ignore
 */
export const FIREBASE_ORDER_BY_METADATA_KEY: string = 'firebaseOrderBy';

export interface FirebaseOrderByContext {
  field: string | FieldPath;
  directionStr?: OrderByDirection;
}

/**
 * @ignore
 */
export interface FirebaseOrderByContextConfiguration extends PropertyKeyConfiguration {
}

export function FirebaseOrderBy(): any {
  return (target: any, propertyKey: string) => {
    const firebaseOrderByContextConfiguration: FirebaseOrderByContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_ORDER_BY_METADATA_KEY, firebaseOrderByContextConfiguration, target);
  };
}
