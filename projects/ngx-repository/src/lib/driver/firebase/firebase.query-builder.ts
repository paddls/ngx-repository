import { Injectable } from '@angular/core';
import { FirebaseResourceContext } from './decorator/firebase-resource.decorator';
import { QueryBuilder } from '../../query-builder/query-builder';
import { FirebaseQuery } from './firebase.query';
import { QuerySettings } from '../../query-builder/query-settings';

@Injectable()
export class FirebaseQueryBuilder implements QueryBuilder<FirebaseResourceContext, FirebaseQuery> {

  public constructor() {
  }

  // TODO @RMA / @TNI - why multiple method ?
  public buildCreateQuery<K>(query: QuerySettings<FirebaseResourceContext, any>): FirebaseQuery {
    throw new Error('NOT_IMPLEMENTED');
  }

  public buildDeleteQuery<K>(query: QuerySettings<FirebaseResourceContext, any>): FirebaseQuery {
    throw new Error('NOT_IMPLEMENTED');
  }

  public buildReadQuery<K>(query: QuerySettings<FirebaseResourceContext, any>): FirebaseQuery {
    return new FirebaseQuery(query);
  }

  public buildUpdateQuery<K>(query: QuerySettings<FirebaseResourceContext, any>): FirebaseQuery {
    throw new Error('NOT_IMPLEMENTED');
  }
}
