import {FirebaseRequest} from '../firebase.request';
import {FirebaseError} from 'firebase';
import {omitBy} from 'lodash';

const IGNORED_KEYS: string[] = ['paths', 'readPath', 'createPath', 'updatePath', 'deletePath', 'pathParams', 'replaceParams'];

export class NgxFirebaseRepositoryError extends Error {

  public constructor(path: string, request: FirebaseRequest<any>, firebaseError: FirebaseError) {
    let message: string = `An error occurred when the path '${path}' was requested : ${firebaseError.message}`;
    const r: any = omitBy(request, (v: any, key: string) => {
      return IGNORED_KEYS.indexOf(key) !== -1 || v == null || (Array.isArray(v) && v.length === 0);
    });

    if (Object.keys(r).length > 0) {
      message += ` The associated request is ${JSON.stringify(r)}.`;
    }

    super(message);

    this.name = 'NgxFirebaseRepositoryError';
  }
}
