import {Column, ColumnContext} from '@paddls/ngx-repository';
import {FsTimestampConverter} from '../converter/fs-timestamp.converter';
import {
  FirestoreCreatedAtContext,
  FirestoreCreatedAtContextConfiguration
} from '../configuration/context/firestore-created-at-context.configuration';
import {Timestamp} from 'firebase/firestore';

/**
 * @ignore
 */
export const FIRESTORE_CREATED_AT_METADATA_KEY: string = 'firestoreCreatedAts';

export function FirestoreCreatedAt(firestoreCreatedAtContext?: FirestoreCreatedAtContext | string): any {
  return (target: any, propertyKey: string): void => {
    let columnMetadata: ColumnContext<Date, Timestamp> = {
      field: propertyKey
    };
    let firestoreCreatedAtMetadata: FirestoreCreatedAtContextConfiguration = {
      propertyKey,
      field: propertyKey
    };

    if (typeof firestoreCreatedAtContext === 'object') {
      columnMetadata = firestoreCreatedAtContext;
      firestoreCreatedAtMetadata = {
        ...firestoreCreatedAtMetadata,
        ...firestoreCreatedAtContext
      };
    } else if (typeof firestoreCreatedAtContext === 'string') {
      columnMetadata.field = firestoreCreatedAtMetadata.field = firestoreCreatedAtContext;
    }

    columnMetadata.customConverter = () => FsTimestampConverter;
    columnMetadata.readOnly = true;
    Column(columnMetadata)(target, propertyKey);

    let metas: FirestoreCreatedAtContextConfiguration[] = [];
    if (Reflect.hasMetadata(FIRESTORE_CREATED_AT_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(FIRESTORE_CREATED_AT_METADATA_KEY, target);
    }
    Reflect.defineMetadata(FIRESTORE_CREATED_AT_METADATA_KEY, metas.concat(firestoreCreatedAtMetadata), target);
  };
}
