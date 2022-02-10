import { Path } from '@paddls/ngx-repository';
import { FirestoreCriteria, FirestoreRequestOrderBy, FirestoreRequestQuery } from './firestore.criteria';
import { FirestoreOperation } from './firestore.operation';
import { FirestoreRepositoryRequest } from './firestore-repository.request';
import { CollectionReference, endAt, endBefore, Firestore, limit, limitToLast, orderBy, Query, query, QueryConstraint, startAfter, startAt, where } from 'firebase/firestore';
import { collection } from '../firestore-functions';

export class FirestoreCriteriaRepositoryRequest extends FirestoreRepositoryRequest {

  public constructor(operation: FirestoreOperation,
                     path: Path,
                     body: any,
                     public readonly criteria: FirestoreCriteria) {
    super(operation, path, body);
  }

  public getQuery(firestore: Firestore): Query {
    const collectionReference: CollectionReference = collection(firestore, this.path.value);
    const queries: QueryConstraint[] = [];

    (this.criteria.queries || []).forEach((firestoreRequestQuery: FirestoreRequestQuery) => {
      queries.push(where(
        firestoreRequestQuery.field,
        firestoreRequestQuery.operator,
        firestoreRequestQuery.value
      ));
    });

    (this.criteria.orderBys || []).forEach((firestoreRequestOrderBy: FirestoreRequestOrderBy) => {
      queries.push(orderBy(firestoreRequestOrderBy.fieldPath, firestoreRequestOrderBy.directionStr));
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
