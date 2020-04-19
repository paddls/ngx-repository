import { Injectable } from '@angular/core';
import { FirebaseResourceContext } from './decorator/firebase-resource.decorator';
import { QueryBuilder } from '../../query-builder/query-builder';

@Injectable()
export class FirebaseQueryBuilder implements QueryBuilder<FirebaseResourceContext, any> {

  public constructor() {
  }

  public buildCreateQuery<K>(query: any): any {
    throw new Error('NOT_IMPLEMENTED');
  }

  public buildDeleteQuery<K>(query: any): any {
    throw new Error('NOT_IMPLEMENTED');
  }

  public buildReadQuery<K>(query: any): any {
    console.log(1, query);

    return {};
  }

  public buildUpdateQuery<K>(query: any): any {
    throw new Error('NOT_IMPLEMENTED');
  }
}
