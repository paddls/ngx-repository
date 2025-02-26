import { PropertyKeyConfiguration } from '@paddls/ngx-repository';
import { FieldPath, OrderByDirection } from 'firebase/firestore';

export interface FirestoreOrderByContext {
  field: string | FieldPath;
  directionStr?: OrderByDirection;
}

/**
 * @ignore
 */
export interface FirestoreOrderByContextConfiguration extends PropertyKeyConfiguration {
}
