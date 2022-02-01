import { PropertyKeyConfiguration } from '@witty-services/ngx-repository';
import {WhereFilterOp} from 'firebase/firestore';

export interface FirebaseCriteriaContext {
  field: string;
  operator: WhereFilterOp;
}

/**
 * @ignore
 */
export interface FirebaseCriteriaContextConfiguration extends FirebaseCriteriaContext, PropertyKeyConfiguration {
}
