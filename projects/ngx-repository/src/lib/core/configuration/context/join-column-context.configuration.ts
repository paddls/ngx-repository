import {Type} from '@angular/core';
import {AbstractRepository} from '../../repository/abstract-repository';
import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';
import {SerializeType} from '@paddls/ts-serializer/dist/common';

export interface JoinColumnContext<T> {

  attribute: string;

  resourceType: () => SerializeType<T>;

  repository?: () => Type<AbstractRepository<T>>;

  groups?: string | string[];
}

/**
 * @ignore
 */
export interface JoinColumnContextConfiguration<T = any> extends JoinColumnContext<T>, PropertyKeyConfiguration {
}
