import {FirebaseCriteriaContext, FirebaseCriteriaContextConfiguration} from '../configuration/context/firebase-criteria-context.configuration';

/**
 * @ignore
 */
export const FIREBASE_CRITERIA_METADATA_KEY: string = 'firebaseCriterias';

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
