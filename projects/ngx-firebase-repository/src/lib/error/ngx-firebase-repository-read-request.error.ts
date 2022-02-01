import {NgxFirebaseRepositoryError} from './ngx-firebase-repository.error';
import {FirebaseRepositoryRequest} from '../request/firebase-repository.request';
import {FirestoreError} from 'firebase/firestore';

export class NgxFirebaseRepositoryReadRequestError extends NgxFirebaseRepositoryError {

  public constructor(request: FirebaseRepositoryRequest, firebaseError: FirestoreError) {
    super(request, firebaseError);

    this.name = 'NgxFirebaseRepositoryReadRequestError';
  }
}
