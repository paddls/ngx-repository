import {Normalizer} from '@witty-services/ngx-repository';
import {Injectable} from '@angular/core';
import {set} from 'lodash';
import * as firebase from 'firebase';
import {FIREBASE_CREATED_AT_METADATA_KEY, FirebaseCreatedAtContextConfiguration} from './decorator/firebase-created-at.decorator';
import {FIREBASE_UPDATED_AT_METADATA_KEY, FirebaseUpdatedAtContextConfiguration} from './decorator/firebase-updated-at.decorator';

@Injectable()
export class FirebaseNormalizer extends Normalizer {

  public normalize<T>(object: T): any {
    const result: {} = super.normalize(object);

    const createdAts: FirebaseCreatedAtContextConfiguration[] = Reflect.getMetadata(FIREBASE_CREATED_AT_METADATA_KEY, object) || [];
    createdAts.forEach((createdAt: FirebaseCreatedAtContextConfiguration) => {
      set(result, createdAt.field, firebase.firestore.FieldValue.serverTimestamp());
    });

    const updatedAts: FirebaseUpdatedAtContextConfiguration[] = Reflect.getMetadata(FIREBASE_UPDATED_AT_METADATA_KEY, object) || [];
    updatedAts.forEach((updatedAt: FirebaseUpdatedAtContextConfiguration) => {
      set(result, updatedAt.field, firebase.firestore.FieldValue.serverTimestamp());
    });

    return result;
  }
}
