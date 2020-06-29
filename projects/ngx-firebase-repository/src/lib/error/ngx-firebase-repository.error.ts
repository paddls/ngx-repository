import {FirebaseRequest} from '../firebase.request';
import {FirebaseError} from 'firebase';

export class NgxFirebaseRepositoryError extends Error {

  public constructor(path: string, request: FirebaseRequest<any>, firebaseError: FirebaseError) {
    super(`An error occurred when the path '${path}' was requested : ${firebaseError.message}`);

    this.name = 'NgxFirebaseRepositoryError';
  }
}
