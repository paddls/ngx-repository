import {NgxFirebaseRepositoryError} from './ngx-firebase-repository.error';
import {FirebaseRepositoryRequest} from '../request/firebase-repository.request';
import {FirebaseError} from 'firebase/app';

export class NgxFirebaseRepositoryDeleteRequestError extends NgxFirebaseRepositoryError {

  public constructor(request: FirebaseRepositoryRequest, firebaseError: FirebaseError) {
    super(request, firebaseError);

    this.name = 'NgxFirebaseRepositoryDeleteRequestError';
  }
}
