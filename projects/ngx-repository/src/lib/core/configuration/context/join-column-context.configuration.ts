import {Type} from '@angular/core';
import {AbstractRepository} from '../../repository/abstract-repository';
import {PropertyKeyConfiguration} from '../../common/decorator/property-key-configuration';
import {SerializeType} from '@witty-services/ts-serializer/dist/common';

export interface JoinColumnContext<T> {

  attribute: string;

  resourceType: () => SerializeType<T>;

  repository?: () => Type<AbstractRepository<T>>;
}

/**
 * @ignore
 */
export interface JoinColumnContextConfiguration<T = any> extends JoinColumnContext<T>, PropertyKeyConfiguration {
}
