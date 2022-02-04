/**
 * @ignore
 */
import {FirestoreOrderByContextConfiguration} from '../configuration/context/firestore-order-by-context.configuration';

export const FIRESTORE_ORDER_BY_METADATA_KEY: string = 'firestoreOrderBy';

export function FirestoreOrderBy(): any {
  return (target: any, propertyKey: string) => {
    const firestoreOrderByContextConfiguration: FirestoreOrderByContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIRESTORE_ORDER_BY_METADATA_KEY, firestoreOrderByContextConfiguration, target);
  };
}
