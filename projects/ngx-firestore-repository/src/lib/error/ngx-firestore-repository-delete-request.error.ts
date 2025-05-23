import { NgxFirestoreRepositoryError } from './ngx-firestore-repository.error';
import { FirestoreRepositoryRequest } from '../request/firestore-repository.request';
import { FirebaseError } from 'firebase/app';

export class NgxFirestoreRepositoryDeleteRequestError extends NgxFirestoreRepositoryError {

  public constructor(request: FirestoreRepositoryRequest, firestoreError: FirebaseError) {
    super(request, firestoreError);

    this.name = 'NgxFirestoreRepositoryDeleteRequestError';
  }
}
