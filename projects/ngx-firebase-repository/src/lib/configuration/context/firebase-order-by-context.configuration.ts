import {PropertyKeyConfiguration} from '@witty-services/ngx-repository';
import {FieldPath, OrderByDirection} from 'firebase/firestore';

export interface FirebaseOrderByContext {
  field: string | FieldPath;
  directionStr?: OrderByDirection;
}

/**
 * @ignore
 */
export interface FirebaseOrderByContextConfiguration extends PropertyKeyConfiguration {
}
