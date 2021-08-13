/**
 * @ignore
 */
import {FirebaseOrderByContextConfiguration} from '../configuration/context/firebase-order-by-context.configuration';

export const FIREBASE_ORDER_BY_METADATA_KEY: string = 'firebaseOrderBy';

export function FirebaseOrderBy(): any {
  return (target: any, propertyKey: string) => {
    const firebaseOrderByContextConfiguration: FirebaseOrderByContextConfiguration = {
      propertyKey
    };

    Reflect.defineMetadata(FIREBASE_ORDER_BY_METADATA_KEY, firebaseOrderByContextConfiguration, target);
  };
}
