import { firestore } from 'firebase';
import { PropertyKeyConfiguration } from '@witty-services/ngx-repository';
import FieldPath = firestore.FieldPath;
import OrderByDirection = firestore.OrderByDirection;

export interface FirebaseOrderByContext {
  field: string | FieldPath;
  directionStr?: OrderByDirection;
}

/**
 * @ignore
 */
export interface FirebaseOrderByContextConfiguration extends PropertyKeyConfiguration {
}
