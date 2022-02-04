import { PropertyKeyConfiguration } from '@witty-services/ngx-repository';
import {WhereFilterOp} from 'firebase/firestore';

export interface FirestoreCriteriaContext {
  field: string;
  operator: WhereFilterOp;
}

/**
 * @ignore
 */
export interface FirestoreCriteriaContextConfiguration extends FirestoreCriteriaContext, PropertyKeyConfiguration {
}
