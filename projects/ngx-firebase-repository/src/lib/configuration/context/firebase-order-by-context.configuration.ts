import firebase from 'firebase';
import { PropertyKeyConfiguration } from '@witty-services/ngx-repository';
import FieldPath = firebase.firestore.FieldPath;
import OrderByDirection = firebase.firestore.OrderByDirection;

export interface FirebaseOrderByContext {
  field: string | FieldPath;
  directionStr?: OrderByDirection;
}

/**
 * @ignore
 */
export interface FirebaseOrderByContextConfiguration extends PropertyKeyConfiguration {
}
