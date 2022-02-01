import {
  getDeepQueryMetadataValue,
  getDeepQueryMetadataValues,
  PropertyKeyConfiguration
} from '@witty-services/ngx-repository';
import { FIREBASE_CRITERIA_METADATA_KEY } from '../decorator/firebase-criteria.decorator';
import { FIREBASE_ORDER_BY_METADATA_KEY } from '../decorator/firebase-order-by.decorator';
import { FIREBASE_START_AT_METADATA_KEY } from '../decorator/firebase-start-at.decorator';
import { FIREBASE_START_AFTER_METADATA_KEY } from '../decorator/firebase-start-after.decorator';
import { FIREBASE_END_AT_METADATA_KEY } from '../decorator/firebase-end-at.decorator';
import { FIREBASE_END_BEFORE_METADATA_KEY } from '../decorator/firebase-end-before.decorator';
import { FIREBASE_LIMIT_METADATA_KEY } from '../decorator/firebase-limit.decorator';
import { FIREBASE_LIMIT_TO_LAST_METADATA_KEY } from '../decorator/firebase-limit-to-last.decorator';
import { FirebaseCriteriaContextConfiguration } from '../configuration/context/firebase-criteria-context.configuration';
import {
  FirebaseOrderByContext,
  FirebaseOrderByContextConfiguration
} from '../configuration/context/firebase-order-by-context.configuration';
import {FieldPath, OrderByDirection, WhereFilterOp} from 'firebase/firestore';

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
    if (this.query) {
      this.queries = this.getQueries(this.query);
      this.orderBys = this.getOrderBy(this.query);
      this.startAt = this.getStartAt(this.query);
      this.startAfter = this.getStartAfter(this.query);
      this.endAt = this.getEndAt(this.query);
      this.endBefore = this.getEndBefore(this.query);
      this.limit = this.getLimit(this.query);
      this.limitToLast = this.getLimitToLast(this.query);
    }
  }

  protected getQueries<K>(query: any): FirebaseRequestQuery[] {
    const queries: FirebaseRequestQuery[] = [];

    if (query) {
      const firebaseCriterias: FirebaseCriteriaContextConfiguration[] = getDeepQueryMetadataValues(FIREBASE_CRITERIA_METADATA_KEY, query);

      firebaseCriterias.forEach((firebaseCriteria: FirebaseCriteriaContextConfiguration) => {
        if (query[firebaseCriteria.propertyKey] == null) {
          return;
        }

        queries.push({
          field: firebaseCriteria.field,
          operator: firebaseCriteria.operator,
          value: query[firebaseCriteria.propertyKey]
        });
      });
    }

    return queries;
  }

  protected getOrderBy<K>(query: any): FirebaseRequestOrderBy[] {
    const orderBys: FirebaseRequestOrderBy[] = [];

    if (query) {
      const firebaseOrderBy: FirebaseOrderByContextConfiguration = getDeepQueryMetadataValue(FIREBASE_ORDER_BY_METADATA_KEY, query);
      if (!firebaseOrderBy || query[firebaseOrderBy.propertyKey] == null) {
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
    const propertyKeyConfiguration: PropertyKeyConfiguration = getDeepQueryMetadataValue(metadataKey, query);
    if (!propertyKeyConfiguration || query[propertyKeyConfiguration.propertyKey] == null) {
      return null;
    }

    if (!Array.isArray(query[propertyKeyConfiguration.propertyKey])) {
      return [query[propertyKeyConfiguration.propertyKey]];
    } else {
      return query[propertyKeyConfiguration.propertyKey];
    }
  }

  protected getValueFromPropertyKey<K>(query: any, metadataKey: string): any {
    const propertyKeyConfiguration: PropertyKeyConfiguration = getDeepQueryMetadataValue(metadataKey, query);
    if (!propertyKeyConfiguration || query[propertyKeyConfiguration.propertyKey] == null) {
      return null;
    }

    return query[propertyKeyConfiguration.propertyKey];
  }
}
