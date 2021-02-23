import { PropertyKeyConfiguration } from '@witty-services/ngx-repository';
import { isNullOrUndefined } from 'util';
import * as firebase from 'firebase';
import {
  FIREBASE_CRITERIA_METADATA_KEY,
  FirebaseCriteriaContextConfiguration
} from '../decorator/firebase-criteria.decorator';
import {
  FIREBASE_ORDER_BY_METADATA_KEY,
  FirebaseOrderByContext,
  FirebaseOrderByContextConfiguration
} from '../decorator/firebase-order-by.decorator';
import { FIREBASE_START_AT_METADATA_KEY } from '../decorator/firebase-start-at.decorator';
import { FIREBASE_START_AFTER_METADATA_KEY } from '../decorator/firebase-start-after.decorator';
import { FIREBASE_END_AT_METADATA_KEY } from '../decorator/firebase-end-at.decorator';
import { FIREBASE_END_BEFORE_METADATA_KEY } from '../decorator/firebase-end-before.decorator';
import { FIREBASE_LIMIT_METADATA_KEY } from '../decorator/firebase-limit.decorator';
import { FIREBASE_LIMIT_TO_LAST_METADATA_KEY } from '../decorator/firebase-limit-to-last.decorator';
import OrderByDirection = firebase.firestore.OrderByDirection;
import FieldPath = firebase.firestore.FieldPath;
import WhereFilterOp = firebase.firestore.WhereFilterOp;


export interface FirebaseRequestQuery {

  field: string;

  operator: WhereFilterOp;

  value: string;
}

export interface FirebaseRequestOrderBy {

  fieldPath: string | FieldPath;

  directionStr?: OrderByDirection;
}


export class FirebaseCriteria {

  public queries: FirebaseRequestQuery[] = [];

  public orderBys: FirebaseRequestOrderBy[] = [];

  public startAt: any[];

  public startAfter: any[];

  public endAt: any[];

  public endBefore: any[];

  public limit: number;

  public limitToLast: number;

  public constructor(private readonly query: any) {
    if (query) {
      this.queries = this.getQueries(query);
      this.orderBys = this.getOrderBy(query);
      this.startAt = this.getStartAt(query);
      this.startAfter = this.getStartAfter(query);
      this.endAt = this.getEndAt(query);
      this.endBefore = this.getEndBefore(query);
      this.limit = this.getLimit(query);
      this.limitToLast = this.getLimitToLast(query);
    }
  }


  protected getQueries<K>(query: any): FirebaseRequestQuery[] {
    const queries: FirebaseRequestQuery[] = [];
    const firebaseCriterias: FirebaseCriteriaContextConfiguration[] = Reflect.getMetadata(FIREBASE_CRITERIA_METADATA_KEY, query) || [];
    firebaseCriterias.forEach((firebaseCriteria: FirebaseCriteriaContextConfiguration) => {
      if (isNullOrUndefined(query[firebaseCriteria.propertyKey])) {
        return;
      }

      queries.push({
        field: firebaseCriteria.field,
        operator: firebaseCriteria.operator,
        value: query[firebaseCriteria.propertyKey]
      });
    });

    return queries;
  }

  protected getOrderBy<K>(query: any): FirebaseRequestOrderBy[] {
    const orderBys: FirebaseRequestOrderBy[] = [];
    const firebaseOrderBy: FirebaseOrderByContextConfiguration = Reflect.getMetadata(FIREBASE_ORDER_BY_METADATA_KEY, query);
    if (!firebaseOrderBy || isNullOrUndefined(query[firebaseOrderBy.propertyKey])) {
      return orderBys;
    }

    const value: string | FirebaseOrderByContext | (string | FirebaseOrderByContext)[] = query[firebaseOrderBy.propertyKey];

    function addOrderBy(v: string | FirebaseOrderByContext): void {
      let sort: FirebaseOrderByContext;
      if (!(v instanceof Object)) {
        sort = {
          field: v as string
        };
      } else {
        sort = v as FirebaseOrderByContext;
      }

      orderBys.push({
        fieldPath: sort.field,
        directionStr: sort.directionStr
      });
    }

    if (Array.isArray(value)) {
      value.forEach(addOrderBy);
    } else {
      addOrderBy(value);
    }

    return orderBys;
  }

  protected getStartAt<K>(query: any): any[] {
    const values: any[] = this.getArrayValuesFromPropertyKey(query, FIREBASE_START_AT_METADATA_KEY);

    return values || null;
  }

  protected getStartAfter<K>(query: any): any[] {
    const values: any[] = this.getArrayValuesFromPropertyKey(query, FIREBASE_START_AFTER_METADATA_KEY);

    return values || null;
  }

  protected getEndAt<K>(query: any): any[] {
    const values: any[] = this.getArrayValuesFromPropertyKey(query, FIREBASE_END_AT_METADATA_KEY);

    return values || null;
  }

  protected getEndBefore<K>(query: any): any[] {
    const values: any[] = this.getArrayValuesFromPropertyKey(query, FIREBASE_END_BEFORE_METADATA_KEY);

    return values || null;
  }

  protected getLimit<K>(query: any): number {
    const value: number = this.getValueFromPropertyKey(query, FIREBASE_LIMIT_METADATA_KEY);

    return value || null;
  }

  protected getLimitToLast<K>(query: any): number {
    const value: number = this.getValueFromPropertyKey(query, FIREBASE_LIMIT_TO_LAST_METADATA_KEY);

    return value || null;
  }

  protected getArrayValuesFromPropertyKey<K>(query: any, metadataKey: string): any[] {
    const propertyKeyConfiguration: PropertyKeyConfiguration = Reflect.getMetadata(metadataKey, query);
    if (!propertyKeyConfiguration || isNullOrUndefined(query[propertyKeyConfiguration.propertyKey])) {
      return null;
    }

    if (!Array.isArray(query[propertyKeyConfiguration.propertyKey])) {
      return [query[propertyKeyConfiguration.propertyKey]];
    } else {
      return query[propertyKeyConfiguration.propertyKey];
    }
  }

  protected getValueFromPropertyKey<K>(query: any, metadataKey: string): any {
    const propertyKeyConfiguration: PropertyKeyConfiguration = Reflect.getMetadata(metadataKey, query);
    if (!propertyKeyConfiguration || isNullOrUndefined(query[propertyKeyConfiguration.propertyKey])) {
      return null;
    }

    return query[propertyKeyConfiguration.propertyKey];
  }
}
