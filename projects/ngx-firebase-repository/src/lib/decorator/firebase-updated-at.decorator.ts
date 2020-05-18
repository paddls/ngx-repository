import {Column, ColumnContext, PropertyKeyConfiguration} from '@witty-services/ngx-repository';
import {FbTimestampConverter} from '../converter/fb-timestamp.converter';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export const FIREBASE_UPDATED_AT_METADATA_KEY: string = 'firebaseUpdatedAts';

export interface FirebaseUpdatedAtContext {

  field: string;
}

export interface FirebaseUpdatedAtContextConfiguration extends FirebaseUpdatedAtContext, PropertyKeyConfiguration {

}

export function FirebaseUpdatedAt(firebaseUpdatedAtContext?: FirebaseUpdatedAtContext|string): any {
  return (target: any, propertyKey: string): void => {
    let columnMetadata: ColumnContext<Date, Timestamp> = {
      field: propertyKey
    };
    let firebaseUpdatedAtMetadata: FirebaseUpdatedAtContextConfiguration = {
      propertyKey,
      field: propertyKey
    };

    if (typeof firebaseUpdatedAtContext === 'object') {
      columnMetadata = firebaseUpdatedAtContext;
      firebaseUpdatedAtMetadata = {
        ...firebaseUpdatedAtMetadata,
        ...firebaseUpdatedAtContext
      };
    } else if (typeof firebaseUpdatedAtContext === 'string') {
      columnMetadata.field = firebaseUpdatedAtMetadata.field = firebaseUpdatedAtContext;
    }

    columnMetadata.customConverter = () => FbTimestampConverter;
    columnMetadata.readOnly = true;
    Column(columnMetadata)(target, propertyKey);

    let metas: FirebaseUpdatedAtContextConfiguration[] = [];
    if (Reflect.hasMetadata(FIREBASE_UPDATED_AT_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(FIREBASE_UPDATED_AT_METADATA_KEY, target);
    }
    Reflect.defineMetadata(FIREBASE_UPDATED_AT_METADATA_KEY, metas.concat(firebaseUpdatedAtMetadata), target);
  };
}
