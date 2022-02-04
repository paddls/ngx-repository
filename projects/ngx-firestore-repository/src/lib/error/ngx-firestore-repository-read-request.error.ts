import {NgxFirestoreRepositoryError} from './ngx-firestore-repository.error';
import {FirestoreRepositoryRequest} from '../request/firestore-repository.request';
import {FirestoreError} from 'firebase/firestore';

export class NgxFirestoreRepositoryReadRequestError extends NgxFirestoreRepositoryError {

  public constructor(request: FirestoreRepositoryRequest, firestoreError: FirestoreError) {
    super(request, firestoreError);

    this.name = 'NgxFirestoreRepositoryReadRequestError';
  }
}
