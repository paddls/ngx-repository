import {FirebaseRequest} from '../firebase.request';
import {FirebaseError} from 'firebase';
import {NgxFirebaseRepositoryError} from './ngx-firebase-repository.error';

export class NgxFirebaseRepositoryReadRequestError extends NgxFirebaseRepositoryError {

  public constructor(request: FirebaseRequest<any>, firebaseError: FirebaseError) {
    super(request.readPath, request, firebaseError);

    this.name = 'NgxFirebaseRepositoryReadRequestError';
  }
}
