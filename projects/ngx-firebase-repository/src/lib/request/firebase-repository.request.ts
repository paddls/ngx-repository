import { Path, RepositoryRequest } from '@witty-services/ngx-repository';
import * as firebase from 'firebase';
import { FirebaseCriteria, FirebaseRequestOrderBy, FirebaseRequestQuery } from './firebase.criteria';
import { isNullOrUndefined } from 'util';
import { FirebaseOperation } from './firebase.operation';
import Query = firebase.firestore.Query;
import Firestore = firebase.firestore.Firestore;

// TODO @RMA decline request type following operation
export class FirebaseRepositoryRequest implements RepositoryRequest {

  public constructor(public readonly operation: FirebaseOperation,
                     public readonly path: Path,
                     public readonly body: any,
                     public readonly criteria: FirebaseCriteria) {
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

    if (!isNullOrUndefined(this.criteria.startAt)) {
      query = query.startAt(...this.criteria.startAt);
    }

    if (!isNullOrUndefined(this.criteria.startAfter)) {
      query = query.startAfter(...this.criteria.startAfter);
    }

    if (!isNullOrUndefined(this.criteria.endAt)) {
      query = query.endAt(...this.criteria.endAt);
    }

    if (!isNullOrUndefined(this.criteria.endBefore)) {
      query = query.endBefore(...this.criteria.endBefore);
    }

    if (!isNullOrUndefined(this.criteria.limit)) {
      query = query.limit(this.criteria.limit);
    }

    if (!isNullOrUndefined(this.criteria.limitToLast)) {
      query = query.limitToLast(this.criteria.limitToLast);
    }

    return query;
  }
}
