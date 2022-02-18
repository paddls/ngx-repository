import {
  getDeepQueryMetadataValue,
  getDeepQueryMetadataValues,
  PropertyKeyConfiguration
} from '@paddls/ngx-repository';
import { FIRESTORE_CRITERIA_METADATA_KEY } from '../decorator/firestore-criteria.decorator';
import { FIRESTORE_ORDER_BY_METADATA_KEY } from '../decorator/firestore-order-by.decorator';
import { FIRESTORE_START_AT_METADATA_KEY } from '../decorator/firestore-start-at.decorator';
import { FIRESTORE_START_AFTER_METADATA_KEY } from '../decorator/firestore-start-after.decorator';
import { FIRESTORE_END_AT_METADATA_KEY } from '../decorator/firestore-end-at.decorator';
import { FIRESTORE_END_BEFORE_METADATA_KEY } from '../decorator/firestore-end-before.decorator';
import { FIRESTORE_LIMIT_METADATA_KEY } from '../decorator/firestore-limit.decorator';
import { FIRESTORE_LIMIT_TO_LAST_METADATA_KEY } from '../decorator/firestore-limit-to-last.decorator';
import {
  FirestoreCriteriaContextConfiguration
} from '../configuration/context/firestore-criteria-context.configuration';
import {
  FirestoreOrderByContext,
  FirestoreOrderByContextConfiguration
} from '../configuration/context/firestore-order-by-context.configuration';
import { FieldPath, OrderByDirection, WhereFilterOp } from 'firebase/firestore';

export interface FirestoreRequestQuery {

  field: string;

  operator: WhereFilterOp;

  value: string;
}

export interface FirestoreRequestOrderBy {

  fieldPath: string | FieldPath;

  directionStr?: OrderByDirection;
}


export class FirestoreCriteria {

  public queries: FirestoreRequestQuery[] = [];

  public orderBys: FirestoreRequestOrderBy[] = [];

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

  protected getQueries(query: any): FirestoreRequestQuery[] {
    const queries: FirestoreRequestQuery[] = [];

    if (query) {
      const firestoreCriteriaContextConfigurations: FirestoreCriteriaContextConfiguration[] = getDeepQueryMetadataValues(FIRESTORE_CRITERIA_METADATA_KEY, query);

      firestoreCriteriaContextConfigurations.forEach((firestoreCriteria: FirestoreCriteriaContextConfiguration) => {
        if (query[firestoreCriteria.propertyKey] == null) {
          return;
        }

        queries.push({
          field: firestoreCriteria.field,
          operator: firestoreCriteria.operator,
          value: query[firestoreCriteria.propertyKey]
        });
      });
    }

    return queries;
  }

  protected getOrderBy(query: any): FirestoreRequestOrderBy[] {
    const orderBys: FirestoreRequestOrderBy[] = [];

    if (query) {
      const firestoreOrderBy: FirestoreOrderByContextConfiguration = getDeepQueryMetadataValue(FIRESTORE_ORDER_BY_METADATA_KEY, query);
      if (!firestoreOrderBy || query[firestoreOrderBy.propertyKey] == null) {
        return orderBys;
      }

      const value: string | FirestoreOrderByContext | (string | FirestoreOrderByContext)[] = query[firestoreOrderBy.propertyKey];

      function addOrderBy(v: string | FirestoreOrderByContext): void {
        let sort: FirestoreOrderByContext;
        if (!(v instanceof Object)) {
          sort = {
            field: v as string
          };
        } else {
          sort = v as FirestoreOrderByContext;
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

  protected getStartAt(query: any): any[] {
    const values: any[] = this.getArrayValuesFromPropertyKey(query, FIRESTORE_START_AT_METADATA_KEY);

    return values || null;
  }

  protected getStartAfter(query: any): any[] {
    const values: any[] = this.getArrayValuesFromPropertyKey(query, FIRESTORE_START_AFTER_METADATA_KEY);

    return values || null;
  }

  protected getEndAt(query: any): any[] {
    const values: any[] = this.getArrayValuesFromPropertyKey(query, FIRESTORE_END_AT_METADATA_KEY);

    return values || null;
  }

  protected getEndBefore(query: any): any[] {
    const values: any[] = this.getArrayValuesFromPropertyKey(query, FIRESTORE_END_BEFORE_METADATA_KEY);

    return values || null;
  }

  protected getLimit(query: any): number {
    const value: number = this.getValueFromPropertyKey(query, FIRESTORE_LIMIT_METADATA_KEY);

    return value || null;
  }

  protected getLimitToLast(query: any): number {
    const value: number = this.getValueFromPropertyKey(query, FIRESTORE_LIMIT_TO_LAST_METADATA_KEY);

    return value || null;
  }

  protected getArrayValuesFromPropertyKey(query: any, metadataKey: string): any[] {
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

  protected getValueFromPropertyKey(query: any, metadataKey: string): any {
    const propertyKeyConfiguration: PropertyKeyConfiguration = getDeepQueryMetadataValue(metadataKey, query);
    if (!propertyKeyConfiguration || query[propertyKeyConfiguration.propertyKey] == null) {
      return null;
    }

    return query[propertyKeyConfiguration.propertyKey];
  }
}
