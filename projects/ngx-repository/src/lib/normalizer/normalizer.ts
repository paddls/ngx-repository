import {ColumnContextConfiguration, COLUMNS_METADATA_KEY} from '../decorator/column.decorator';
import {isArray, set} from 'lodash';
import {NormalizerConfiguration} from './normalizer.configuration';
import {Inject, Injectable} from '@angular/core';
import {NORMALIZER_CONFIGURATION_TOKEN} from '../ngx-repository.module.di';

@Injectable()
export class Normalizer {

  public constructor(@Inject(NORMALIZER_CONFIGURATION_TOKEN) private configuration: NormalizerConfiguration) {}

  public normalize<T>(object: T): any {
    const result: {} = {};

    this.normalizeColumn(object, result);

    return result;
  }

  protected normalizeColumn<T>(object: T, result: {}): Normalizer {
    const columns: ColumnContextConfiguration<T, any>[] = Reflect.getMetadata(COLUMNS_METADATA_KEY, object);

    if (!columns) {
      return this;
    }

    columns.forEach((column: ColumnContextConfiguration<T, any>) => {
      if (column.readOnly) {
        return;
      }

      const columnData: any = object[column.propertyKey];

      if (columnData === undefined && !this.configuration.normalizeUndefined) {
        return;
      }

      if (columnData === null && !this.configuration.normalizeNull) {
        return;
      }

      if (isArray(columnData)) {
        if (column.type && !!columnData) {
          set(result, column.field, columnData.map((d: any) => this.normalize(d)));
        } else if (column.customConverter) {
          set(result, column.field, columnData.map((d: any) => new (column.customConverter())().toJson(d)));
        } else {
          set(result, column.field, columnData);
        }
      } else {
        if (column.type && !!columnData) {
          set(result, column.field, this.normalize(columnData));
        } else if (column.customConverter) {
          set(result, column.field, new (column.customConverter())().toJson(columnData));
        } else {
          set(result, column.field, columnData);
        }
      }
    });

    return this;
  }
}
