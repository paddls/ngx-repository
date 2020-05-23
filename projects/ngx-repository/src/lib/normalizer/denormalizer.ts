import {get, isArray} from 'lodash';
import {ColumnContextConfiguration, COLUMNS_METADATA_KEY} from '../decorator/column.decorator';
import {NormalizerConfiguration} from './normalizer.configuration';
import {Inject, Injectable} from '@angular/core';
import {Query} from '../query-builder/query';
import {NORMALIZER_CONFIGURATION_TOKEN} from '../ngx-repository.module.di';
import {Request} from '../query-builder/request';

export const ORIGINAL_QUERY_METADATA_KEY: string = 'originalQuery';

@Injectable()
export class Denormalizer {

  public constructor(@Inject(NORMALIZER_CONFIGURATION_TOKEN) private configuration: NormalizerConfiguration) {}

  public denormalize<T>(type: new() => T, data: any|any[], query?: Query<any>, request?: Request): T {
    if (!data) {
      return null;
    }

    const result: T = new type();
    Reflect.defineMetadata(ORIGINAL_QUERY_METADATA_KEY, query, result);

    this.denormalizeColumn(data, result);

    return result;
  }

  protected denormalizeColumn<T>(data: any, result: T): Denormalizer {
    const columns: ColumnContextConfiguration<T, any>[] = Reflect.getMetadata(COLUMNS_METADATA_KEY, result);

    if (!columns) {
      return this;
    }

    columns.forEach((cc: ColumnContextConfiguration<T, any>) => {
      if (cc.writeOnly) {
        return;
      }

      const columnData: any = get(data, cc.field);

      if (columnData === undefined && !this.configuration.denormalizeUndefined) {
        return;
      }

      if (columnData === null && !this.configuration.denormalizeNull) {
        return;
      }

      if (isArray(columnData)) {
        if (cc.type) {
          result[cc.propertyKey] = columnData.map((d: any) => this.denormalize(cc.type(), d));
        } else if (cc.customConverter) {
          result[cc.propertyKey] = columnData.map((d: any) => new (cc.customConverter())().fromJson(d));
        } else {
          result[cc.propertyKey] = columnData;
        }
      } else {
        if (cc.type && !!columnData) {
          result[cc.propertyKey] = this.denormalize(cc.type(), columnData);
        } else if (cc.customConverter) {
          result[cc.propertyKey] = new (cc.customConverter())().fromJson(columnData);
        } else {
          result[cc.propertyKey] = columnData;
        }
      }
    });

    return this;
  }
}
