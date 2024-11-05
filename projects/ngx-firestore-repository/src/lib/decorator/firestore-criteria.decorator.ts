import {
  FirestoreCriteriaContext,
  FirestoreCriteriaContextConfiguration
} from '../configuration/context/firestore-criteria-context.configuration';

/**
 * @ignore
 */
export const FIRESTORE_CRITERIA_METADATA_KEY: string = 'firestoreCriterias';

export function FirestoreCriteria(params: FirestoreCriteriaContext): any {
  return (target: any, propertyKey: string) => {
    const firestoreCriteriaContextConfiguration: FirestoreCriteriaContextConfiguration = {
      propertyKey,
      ...params
    };

    let metas: FirestoreCriteriaContextConfiguration[] = [];
    if (Reflect.hasMetadata(FIRESTORE_CRITERIA_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(FIRESTORE_CRITERIA_METADATA_KEY, target);
    }
    Reflect.defineMetadata(FIRESTORE_CRITERIA_METADATA_KEY, metas.concat(firestoreCriteriaContextConfiguration), target);
  };
}
