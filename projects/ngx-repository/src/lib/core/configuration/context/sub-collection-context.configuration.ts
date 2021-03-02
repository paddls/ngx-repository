import {Type} from '@angular/core';
import {AbstractRepository} from '../../repository/abstractRepository';
import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export interface SubCollectionContext<T> {

  resourceType: () => Type<T>;

  params?: (model: any, query?: any) => any;

  repository?: () => Type<AbstractRepository<T>>;
}

/**
 * @ignore
 */
export interface SubCollectionContextConfiguration<T = any> extends SubCollectionContext<T>, PropertyKeyConfiguration {
}
