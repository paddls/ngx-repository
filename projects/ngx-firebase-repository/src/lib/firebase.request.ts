import * as firebase from 'firebase/app';
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import FieldPath = firebase.firestore.FieldPath;
import OrderByDirection = firebase.firestore.OrderByDirection;
import {PathRequest} from '@witty-services/ngx-repository';

/**
 * @ignore
 */
export class FirebaseRequest<K> extends PathRequest<K> {

  public queries: FirebaseRequestQuery[] = [];

  public orderBys: FirebaseRequestOrderBy[] = [];

  public startAt: any[];

  public startAfter: any[];

  public endAt: any[];

  public endBefore: any[];

  public limit: number;

  public limitToLast: number;

  public constructor(data: Partial<FirebaseRequest<K>> = {}) {
    super();

    Object.assign(this, data);
  }
}

export interface FirebaseRequestQuery {

  field: string;

  operator: WhereFilterOp;

  value: string;
}

export interface FirebaseRequestOrderBy {

  fieldPath: string | FieldPath;

  directionStr?: OrderByDirection;
}
