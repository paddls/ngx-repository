import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export const FIREBASE_CRITERIA_METADATA_KEY: string = 'firebaseCriterias';

export interface FirebaseCriteriaContext {
  field: string;
  operator: WhereFilterOp;
}

export interface FirebaseCriteriaContextConfiguration extends FirebaseCriteriaContext, PropertyKeyConfiguration {
}

export function FirebaseCriteria(params: FirebaseCriteriaContext): any {
  return (target: any, propertyKey: string) => {
    const firebaseCriteriaContextConfiguration: FirebaseCriteriaContextConfiguration = {
      propertyKey,
      ...params
    };

    let metas: FirebaseCriteriaContextConfiguration[] = [];
    if (Reflect.hasMetadata(FIREBASE_CRITERIA_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(FIREBASE_CRITERIA_METADATA_KEY, target);
    }
    Reflect.defineMetadata(FIREBASE_CRITERIA_METADATA_KEY, metas.concat(firebaseCriteriaContextConfiguration), target);
  };
}
