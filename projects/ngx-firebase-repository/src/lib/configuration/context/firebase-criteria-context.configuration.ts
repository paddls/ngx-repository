import firebase from 'firebase';
import { PropertyKeyConfiguration } from '@witty-services/ngx-repository';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export interface FirebaseCriteriaContext {
  field: string;
  operator: WhereFilterOp;
}

/**
 * @ignore
 */
export interface FirebaseCriteriaContextConfiguration extends FirebaseCriteriaContext, PropertyKeyConfiguration {
}
