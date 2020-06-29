import {FirebaseRequest} from '../firebase.request';
import {FirebaseError} from 'firebase';
import {NgxFirebaseRepositoryError} from './ngx-firebase-repository.error';

export class NgxFirebaseRepositoryDeleteRequestError extends NgxFirebaseRepositoryError {

  public constructor(request: FirebaseRequest<any>, firebaseError: FirebaseError) {
    super(request.deletePath, request, firebaseError);

    this.name = 'NgxFirebaseRepositoryDeleteRequestError';
  }
}
