import {Type} from '@angular/core';
import {AbstractRepository} from '../../repository/abstract-repository';
import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';

export interface JoinColumnContext<T> {

  attribute: string;

  resourceType: () => new(...args: any[]) => T;

  repository?: () => Type<AbstractRepository<T>>;
}

/**
 * @ignore
 */
export interface JoinColumnContextConfiguration<T = any> extends JoinColumnContext<T>, PropertyKeyConfiguration {
}
