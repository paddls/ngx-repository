import {Column, ColumnContext} from '@witty-services/ngx-repository';
import {FsTimestampConverter} from '../converter/fs-timestamp.converter';
import {
  FirestoreUpdatedAtContext,
  FirestoreUpdatedAtContextConfiguration
} from '../configuration/context/firestore-updated-at-context.configuration';
import {Timestamp} from 'firebase/firestore';

/**
 * @ignore
 */
export const FIRESTORE_UPDATED_AT_METADATA_KEY: string = 'firestoreUpdatedAts';

export function FirestoreUpdatedAt(firestoreUpdatedAtContext?: FirestoreUpdatedAtContext | string): any {
  return (target: any, propertyKey: string): void => {
    let columnMetadata: ColumnContext<Date, Timestamp> = {
      field: propertyKey
    };
    let firestoreUpdatedAtMetadata: FirestoreUpdatedAtContextConfiguration = {
      propertyKey,
      field: propertyKey
    };

    if (typeof firestoreUpdatedAtContext === 'object') {
      columnMetadata = firestoreUpdatedAtContext;
      firestoreUpdatedAtMetadata = {
        ...firestoreUpdatedAtMetadata,
        ...firestoreUpdatedAtContext
      };
    } else if (typeof firestoreUpdatedAtContext === 'string') {
      columnMetadata.field = firestoreUpdatedAtMetadata.field = firestoreUpdatedAtContext;
    }

    columnMetadata.customConverter = () => FsTimestampConverter;
    columnMetadata.readOnly = true;
    Column(columnMetadata)(target, propertyKey);

    let metas: FirestoreUpdatedAtContextConfiguration[] = [];
    if (Reflect.hasMetadata(FIRESTORE_UPDATED_AT_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(FIRESTORE_UPDATED_AT_METADATA_KEY, target);
    }
    Reflect.defineMetadata(FIRESTORE_UPDATED_AT_METADATA_KEY, metas.concat(firestoreUpdatedAtMetadata), target);
  };
}
