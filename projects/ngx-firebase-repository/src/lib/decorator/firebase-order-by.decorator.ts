/**
 * @ignore
 */
import { FirebaseOrderByContextConfiguration } from '../configuration/context/firebase-order-by-context.configuration';

export const FIREBASE_ORDER_BY_METADATA_KEY: string = 'firebaseOrderBys';

export function FirebaseOrderBy(): any {
  return (target: any, propertyKey: string) => {
    const firebaseOrderByContextConfiguration: FirebaseOrderByContextConfiguration = {
      propertyKey
    };

    let metas: FirebaseOrderByContextConfiguration[] = [];
    if (Reflect.hasMetadata(FIREBASE_ORDER_BY_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(FIREBASE_ORDER_BY_METADATA_KEY, target);
    }
    Reflect.defineMetadata(FIREBASE_ORDER_BY_METADATA_KEY, metas.concat(firebaseOrderByContextConfiguration), target);
  };
}
