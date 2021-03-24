import { Path } from '@witty-services/ngx-repository';
import firebase from 'firebase';
import { FirebaseCriteria, FirebaseRequestOrderBy, FirebaseRequestQuery } from './firebase.criteria';
import { FirebaseOperation } from './firebase.operation';
import { FirebaseRepositoryRequest } from './firebase-repository.request';
import Query = firebase.firestore.Query;
import Firestore = firebase.firestore.Firestore;

export class FirebaseCriteriaRepositoryRequest extends FirebaseRepositoryRequest {

  public constructor(operation: FirebaseOperation,
                     path: Path,
                     body: any,
                     public readonly criteria: FirebaseCriteria) {
    super(operation, path, body);
  }

  public getQuery(firestore: Firestore): Query {
    let query: Query = firestore.collection(this.path.value);

    (this.criteria.queries || []).forEach((firebaseRequestQuery: FirebaseRequestQuery) => {
      query = query.where(
        firebaseRequestQuery.field,
        firebaseRequestQuery.operator,
        firebaseRequestQuery.value
      );
    });

    (this.criteria.orderBys || []).forEach((firebaseRequestOrderBy: FirebaseRequestOrderBy) => {
      query = query.orderBy(firebaseRequestOrderBy.fieldPath, firebaseRequestOrderBy.directionStr);
    });

    if (this.criteria.startAt != null) {
      query = query.startAt(...this.criteria.startAt);
    }

    if (this.criteria.startAfter != null) {
      query = query.startAfter(...this.criteria.startAfter);
    }

    if (this.criteria.endAt != null) {
      query = query.endAt(...this.criteria.endAt);
    }

    if (this.criteria.endBefore != null) {
      query = query.endBefore(...this.criteria.endBefore);
    }

    if (this.criteria.limit != null) {
      query = query.limit(this.criteria.limit);
    }

    if (this.criteria.limitToLast != null) {
      query = query.limitToLast(this.criteria.limitToLast);
    }

    return query;
  }
}
