import {FirebaseRequest} from '../firebase.request';
import {FirebaseError} from 'firebase';
import {NgxFirebaseRepositoryError} from './ngx-firebase-repository.error';

export class NgxFirebaseRepositoryUpdateRequestError extends NgxFirebaseRepositoryError {

  public constructor(request: FirebaseRequest<any>, firebaseError: FirebaseError) {
    super(request.updatePath, request, firebaseError);

    this.name = 'NgxFirebaseRepositoryUpdateRequestError';
  }
}
