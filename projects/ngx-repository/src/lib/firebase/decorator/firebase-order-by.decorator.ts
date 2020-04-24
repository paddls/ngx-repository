import * as firebase from 'firebase';
import FieldPath = firebase.firestore.FieldPath;
import OrderByDirection = firebase.firestore.OrderByDirection;
import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export const FIREBASE_ORDER_BY_METADATA_KEY: string = 'firebaseOrderBy';

export interface FirebaseOrderByParam {
  field: string | FieldPath;
  directionStr?: OrderByDirection;
}

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
