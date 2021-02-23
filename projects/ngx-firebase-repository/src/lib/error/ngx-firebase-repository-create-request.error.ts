import { FirebaseError } from 'firebase';
import { NgxFirebaseRepositoryError } from './ngx-firebase-repository.error';
import { FirebaseRepositoryRequest } from '../request/firebase-repository.request';

export class NgxFirebaseRepositoryCreateRequestError extends NgxFirebaseRepositoryError {

  public constructor(request: FirebaseRepositoryRequest, firebaseError: FirebaseError) {
    super(request, firebaseError);

    this.name = 'NgxFirebaseRepositoryCreateRequestError';
  }
}
