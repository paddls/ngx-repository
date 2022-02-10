import {
  FirestoreCriteria,
  FirestoreEndAt,
  FirestoreEndBefore,
  FirestoreLimit,
  FirestoreLimitToLast,
  FirestoreOrderBy,
  FirestoreOrderByContext,
  FirestoreStartAfter,
  FirestoreStartAt
} from '@paddls/ngx-firestore-repository';

export class ClientQuery {

  @FirestoreCriteria({field: 'lastName', operator: '=='})
  public lastNameEqual?: string;

  @FirestoreOrderBy()
  public orderBy?: string|FirestoreOrderByContext|(FirestoreOrderByContext|string)[];

  @FirestoreStartAt()
  public startAt?: any;

  @FirestoreStartAfter()
  public startAfter?: any;

  @FirestoreEndAt()
  public endAt?: any;

  @FirestoreEndBefore()
  public endBefore?: any;

  @FirestoreLimit()
  public limit?: number;

  @FirestoreLimitToLast()
  public limitToLast?: number;

  public constructor(data: Partial<ClientQuery> = {}) {
    Object.assign(this, data);
  }
}
