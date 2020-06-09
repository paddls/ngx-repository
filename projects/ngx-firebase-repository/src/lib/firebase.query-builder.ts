import {Injectable} from '@angular/core';
import {FirebaseResourceContext} from './decorator/firebase-resource.decorator';
import {FirebaseRequest} from './firebase.request';
import {FirebaseQuerySettings} from './firebase.query-settings';
import {FIREBASE_CRITERIA_METADATA_KEY, FirebaseCriteriaContextConfiguration} from './decorator/firebase-criteria.decorator';
import {
  FIREBASE_ORDER_BY_METADATA_KEY,
  FirebaseOrderByContextConfiguration,
  FirebaseOrderByContext
} from './decorator/firebase-order-by.decorator';
import {FIREBASE_START_AT_METADATA_KEY} from './decorator/firebase-start-at.decorator';
import {FIREBASE_LIMIT_METADATA_KEY} from './decorator/firebase-limit.decorator';
import {FIREBASE_LIMIT_TO_LAST_METADATA_KEY} from './decorator/firebase-limit-to-last.decorator';
import {FIREBASE_END_AT_METADATA_KEY} from './decorator/firebase-end-at.decorator';
import {FIREBASE_START_AFTER_METADATA_KEY} from './decorator/firebase-start-after.decorator';
import {isNullOrUndefined} from 'util';
import {FIREBASE_END_BEFORE_METADATA_KEY} from './decorator/firebase-end-before.decorator';
import {PathQueryBuilder, PropertyKeyConfiguration} from '@witty-services/ngx-repository';

/**
 * @ignore
 */
@Injectable()
export class FirebaseQueryBuilder extends PathQueryBuilder<FirebaseResourceContext> {

  public buildRequestFromQuery<T, K>(query: FirebaseQuerySettings<K>, object?: T): FirebaseRequest<K> {
    const firebaseRequest: FirebaseRequest<K> = new FirebaseRequest<K>(super.buildRequestFromQuery(query, object));

    if (!query || !query.settings) {
      return firebaseRequest;
    }

    this.makeCriteria(firebaseRequest, query)
      .makeOrderBy(firebaseRequest, query)
      .makeStartAt(firebaseRequest, query)
      .makeStartAfter(firebaseRequest, query)
      .makeEndAt(firebaseRequest, query)
      .makeEndBefore(firebaseRequest, query)
      .makeLimit(firebaseRequest, query)
      .makeLimitToLast(firebaseRequest, query);

    return firebaseRequest;
  }

  protected makeCriteria<K>(firebaseRequest: FirebaseRequest<K>, query: FirebaseQuerySettings<K>): FirebaseQueryBuilder {
    const firebaseCriterias: FirebaseCriteriaContextConfiguration[] = Reflect.getMetadata(FIREBASE_CRITERIA_METADATA_KEY, query.settings) || [];
    firebaseCriterias.forEach((firebaseCriteria: FirebaseCriteriaContextConfiguration) => {
      if (isNullOrUndefined(query.settings[firebaseCriteria.propertyKey])) {
        return;
      }

      firebaseRequest.queries.push({
        field: firebaseCriteria.field,
        operator: firebaseCriteria.operator,
        value: query.settings[firebaseCriteria.propertyKey]
      });
    });

    return this;
  }

  protected makeOrderBy<K>(firebaseRequest: FirebaseRequest<K>, query: FirebaseQuerySettings<K>): FirebaseQueryBuilder {
    const firebaseOrderBy: FirebaseOrderByContextConfiguration = Reflect.getMetadata(FIREBASE_ORDER_BY_METADATA_KEY, query.settings);
    if (!firebaseOrderBy || isNullOrUndefined(query.settings[firebaseOrderBy.propertyKey])) {
      return this;
    }

    const value: string|FirebaseOrderByContext|(string|FirebaseOrderByContext)[] = query.settings[firebaseOrderBy.propertyKey];

    function addOrderBy(v: string|FirebaseOrderByContext): void {
      if (!(v instanceof Object)) {
        v = {
          field: v
        };
      }

      firebaseRequest.orderBys.push({
        fieldPath: v.field,
        directionStr: v.directionStr
      });
    }

    if (Array.isArray(value)) {
      value.forEach(addOrderBy);
    } else {
      addOrderBy(value);
    }

    return this;
  }

  protected makeStartAt<K>(firebaseRequest: FirebaseRequest<K>, query: FirebaseQuerySettings<K>): FirebaseQueryBuilder {
    const values: any[] = this.makeArrayValuesFromPropertyKey(query, FIREBASE_START_AT_METADATA_KEY);
    if (values === null) {
      return this;
    }

    firebaseRequest.startAt = values;

    return this;
  }

  protected makeStartAfter<K>(firebaseRequest: FirebaseRequest<K>, query: FirebaseQuerySettings<K>): FirebaseQueryBuilder {
    const values: any[] = this.makeArrayValuesFromPropertyKey(query, FIREBASE_START_AFTER_METADATA_KEY);
    if (values === null) {
      return this;
    }

    firebaseRequest.startAfter = values;

    return this;
  }

  protected makeEndAt<K>(firebaseRequest: FirebaseRequest<K>, query: FirebaseQuerySettings<K>): FirebaseQueryBuilder {
    const values: any[] = this.makeArrayValuesFromPropertyKey(query, FIREBASE_END_AT_METADATA_KEY);
    if (values === null) {
      return this;
    }

    firebaseRequest.endAt = values;

    return this;
  }

  protected makeEndBefore<K>(firebaseRequest: FirebaseRequest<K>, query: FirebaseQuerySettings<K>): FirebaseQueryBuilder {
    const values: any[] = this.makeArrayValuesFromPropertyKey(query, FIREBASE_END_BEFORE_METADATA_KEY);
    if (values === null) {
      return this;
    }

    firebaseRequest.endBefore = values;

    return this;
  }

  protected makeLimit<K>(firebaseRequest: FirebaseRequest<K>, query: FirebaseQuerySettings<K>): FirebaseQueryBuilder {
    const value: any = this.makeValueFromPropertyKey(query, FIREBASE_LIMIT_METADATA_KEY);
    if (value === null) {
      return this;
    }

    firebaseRequest.limit = value;

    return this;
  }

  protected makeLimitToLast<K>(firebaseRequest: FirebaseRequest<K>, query: FirebaseQuerySettings<K>): FirebaseQueryBuilder {
    const value: any = this.makeValueFromPropertyKey(query, FIREBASE_LIMIT_TO_LAST_METADATA_KEY);
    if (value === null) {
      return this;
    }

    firebaseRequest.limitToLast = value;

    return this;
  }

  protected makeArrayValuesFromPropertyKey<K>(query: FirebaseQuerySettings<K>, metadataKey: string): any[] {
    const propertyKeyConfiguration: PropertyKeyConfiguration = Reflect.getMetadata(metadataKey, query.settings);
    if (!propertyKeyConfiguration || isNullOrUndefined(query.settings[propertyKeyConfiguration.propertyKey])) {
      return null;
    }

    if (!Array.isArray(query.settings[propertyKeyConfiguration.propertyKey])) {
      return [query.settings[propertyKeyConfiguration.propertyKey]];
    } else {
      return query.settings[propertyKeyConfiguration.propertyKey];
    }
  }

  protected makeValueFromPropertyKey<K>(query: FirebaseQuerySettings<K>, metadataKey: string): any {
    const propertyKeyConfiguration: PropertyKeyConfiguration = Reflect.getMetadata(metadataKey, query.settings);
    if (!propertyKeyConfiguration || isNullOrUndefined(query.settings[propertyKeyConfiguration.propertyKey])) {
      return null;
    }

    return query.settings[propertyKeyConfiguration.propertyKey];
  }
}
