import {Inject, Injectable} from '@angular/core';
import {set} from 'lodash';
import {firestore} from 'firebase';
import {FIREBASE_CREATED_AT_METADATA_KEY} from '../decorator/firebase-created-at.decorator';
import {FIREBASE_UPDATED_AT_METADATA_KEY} from '../decorator/firebase-updated-at.decorator';
import {NORMALIZER_CONFIGURATION_TOKEN, NormalizerConfiguration, RepositoryNormalizer} from '@witty-services/ngx-repository';
import FieldValue = firestore.FieldValue;
import {FirebaseCreatedAtContextConfiguration} from '../configuration/context/firebase-created-at-context.configuration';
import {FirebaseUpdatedAtContextConfiguration} from '../configuration/context/firebase-updated-at-context.configuration';

/**
 * @ignore
 */
@Injectable()
export class FirebaseNormalizer extends RepositoryNormalizer {

  public constructor(@Inject(NORMALIZER_CONFIGURATION_TOKEN) configuration: NormalizerConfiguration) {
    super(configuration);
  }

  public normalize<T>(object: T): any {
    const result: {} = super.normalize(object);

    const createdAts: FirebaseCreatedAtContextConfiguration[] = Reflect.getMetadata(FIREBASE_CREATED_AT_METADATA_KEY, object) || [];
    createdAts.forEach((createdAt: FirebaseCreatedAtContextConfiguration) => {
      set(result, createdAt.field, FieldValue.serverTimestamp());
    });

    const updatedAts: FirebaseUpdatedAtContextConfiguration[] = Reflect.getMetadata(FIREBASE_UPDATED_AT_METADATA_KEY, object) || [];
    updatedAts.forEach((updatedAt: FirebaseUpdatedAtContextConfiguration) => {
      set(result, updatedAt.field, FieldValue.serverTimestamp());
    });

    return result;
  }
}
