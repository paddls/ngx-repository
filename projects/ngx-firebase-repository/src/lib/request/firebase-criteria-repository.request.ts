import { Path } from '@witty-services/ngx-repository';
import { FirebaseCriteria, FirebaseRequestOrderBy, FirebaseRequestQuery } from './firebase.criteria';
import { FirebaseOperation } from './firebase.operation';
import { FirebaseRepositoryRequest } from './firebase-repository.request';
import { collection, CollectionReference, endAt, endBefore, Firestore, limit, limitToLast, orderBy, Query, query, QueryConstraint, startAfter, startAt, where } from 'firebase/firestore';

export class FirebaseCriteriaRepositoryRequest extends FirebaseRepositoryRequest {

  public constructor(operation: FirebaseOperation,
                     path: Path,
                     body: any,
                     public readonly criteria: FirebaseCriteria) {
    super(operation, path, body);
  }

  public getQuery(firestore: Firestore): Query {
    const collectionReference: CollectionReference = collection(firestore, this.path.value);
    const queries: QueryConstraint[] = [];

    (this.criteria.queries || []).forEach((firebaseRequestQuery: FirebaseRequestQuery) => {
      queries.push(where(
        firebaseRequestQuery.field,
        firebaseRequestQuery.operator,
        firebaseRequestQuery.value
      ));
    });

    (this.criteria.orderBys || []).forEach((firebaseRequestOrderBy: FirebaseRequestOrderBy) => {
      queries.push(orderBy(firebaseRequestOrderBy.fieldPath, firebaseRequestOrderBy.directionStr));
    });

    if (this.criteria.startAt != null) {
      queries.push(startAt(...this.criteria.startAt));
    }

    if (this.criteria.startAfter != null) {
      queries.push(startAfter(...this.criteria.startAfter));
    }

    if (this.criteria.endAt != null) {
      queries.push(endAt(...this.criteria.endAt));
    }

    if (this.criteria.endBefore != null) {
      queries.push(endBefore(...this.criteria.endBefore));
    }

    if (this.criteria.limit != null) {
      queries.push(limit(this.criteria.limit));
    }

    if (this.criteria.limitToLast != null) {
      queries.push(limitToLast(this.criteria.limitToLast));
    }

    return query(collectionReference, ...queries);
  }
}
