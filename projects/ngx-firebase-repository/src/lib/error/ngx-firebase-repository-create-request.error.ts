import {FirebaseRequest} from '../firebase.request';
import {FirebaseError} from 'firebase';
import {NgxFirebaseRepositoryError} from './ngx-firebase-repository.error';

export class NgxFirebaseRepositoryCreateRequestError extends NgxFirebaseRepositoryError {

  public constructor(request: FirebaseRequest<any>, firebaseError: FirebaseError) {
    super(request.createPath, request, firebaseError);

    this.name = 'NgxFirebaseRepositoryCreateRequestError';
  }
}
