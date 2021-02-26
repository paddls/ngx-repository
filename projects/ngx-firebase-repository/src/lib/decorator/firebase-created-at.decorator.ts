import { Column, ColumnContext, PropertyKeyConfiguration } from '@witty-services/ngx-repository';
import { FbTimestampConverter } from '../converter/fb-timestamp.converter';
import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;

/**
 * @ignore
 */
export const FIREBASE_CREATED_AT_METADATA_KEY: string = 'firebaseCreatedAts';

export interface FirebaseCreatedAtContext {

  field: string;
}

/**
 * @ignore
 */
export interface FirebaseCreatedAtContextConfiguration extends FirebaseCreatedAtContext, PropertyKeyConfiguration {
}

export function FirebaseCreatedAt(firebaseCreatedAtContext?: FirebaseCreatedAtContext|string): any {
  return (target: any, propertyKey: string): void => {
    let columnMetadata: ColumnContext<Date, Timestamp> = {
      field: propertyKey
    };
    let firebaseCreatedAtMetadata: FirebaseCreatedAtContextConfiguration = {
      propertyKey,
      field: propertyKey
    };

    if (typeof firebaseCreatedAtContext === 'object') {
      columnMetadata = firebaseCreatedAtContext;
      firebaseCreatedAtMetadata = {
        ...firebaseCreatedAtMetadata,
        ...firebaseCreatedAtContext
      };
    } else if (typeof firebaseCreatedAtContext === 'string') {
      columnMetadata.field = firebaseCreatedAtMetadata.field = firebaseCreatedAtContext;
    }

    columnMetadata.customConverter = () => FbTimestampConverter;
    columnMetadata.readOnly = true;
    Column(columnMetadata)(target, propertyKey);

    let metas: FirebaseCreatedAtContextConfiguration[] = [];
    if (Reflect.hasMetadata(FIREBASE_CREATED_AT_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(FIREBASE_CREATED_AT_METADATA_KEY, target);
    }
    Reflect.defineMetadata(FIREBASE_CREATED_AT_METADATA_KEY, metas.concat(firebaseCreatedAtMetadata), target);
  };
}
