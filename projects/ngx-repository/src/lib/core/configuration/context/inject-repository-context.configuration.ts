import {Type} from '@angular/core';
import {AbstractRepository} from '../../repository/abstractRepository';
import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export interface InjectRepositoryContext<T> {

  resourceType: () => Type<T>;

  repository?: () => Type<AbstractRepository<T>>;
}

/**
 * @ignore
 */
export interface InjectRepositoryContextConfiguration<T = any> extends InjectRepositoryContext<T>, PropertyKeyConfiguration {
}
