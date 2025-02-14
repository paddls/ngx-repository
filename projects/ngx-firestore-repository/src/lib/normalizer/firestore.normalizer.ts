import { Injectable } from '@angular/core';
import { FIRESTORE_CREATED_AT_METADATA_KEY } from '../decorator/firestore-created-at.decorator';
import { FIRESTORE_UPDATED_AT_METADATA_KEY } from '../decorator/firestore-updated-at.decorator';
import { RepositoryNormalizer } from '@paddls/ngx-repository';
import {
  FirestoreCreatedAtContextConfiguration
} from '../configuration/context/firestore-created-at-context.configuration';
import {
  FirestoreUpdatedAtContextConfiguration
} from '../configuration/context/firestore-updated-at-context.configuration';
import { serverTimestamp } from 'firebase/firestore';
import { set } from '../utils/set';

/**
 * @ignore
 */
@Injectable()
export class FirestoreNormalizer extends RepositoryNormalizer {

  public normalize<T>(object: T): any {
    const result: {} = super.normalize(object);

    const createdAts: FirestoreCreatedAtContextConfiguration[] = Reflect.getMetadata(FIRESTORE_CREATED_AT_METADATA_KEY, object) || [];
    createdAts.forEach((createdAt: FirestoreCreatedAtContextConfiguration) => {
      set(result, createdAt.field, serverTimestamp());
    });

    const updatedAts: FirestoreUpdatedAtContextConfiguration[] = Reflect.getMetadata(FIRESTORE_UPDATED_AT_METADATA_KEY, object) || [];
    updatedAts.forEach((updatedAt: FirestoreUpdatedAtContextConfiguration) => {
      set(result, updatedAt.field, serverTimestamp());
    });

    return result;
  }
}
