import {COLUMNS_METADATA_KEY, PropertyColumnContext} from '../decorator/column.decorator';
import {set} from 'lodash';
import {NormalizerConfiguration} from './normalizer.configuration';
import {isArray} from 'lodash';
import {Injectable} from '@angular/core';

@Injectable()
export class Normalizer {

  public constructor(private configuration: NormalizerConfiguration) {}

  public normalize<T>(object: T): any {
    const result: {} = {};

    this.normalizeColumn(object, result);

    return result;
  }

  protected normalizeColumn<T>(object: T, result: {}): Normalizer {
    const columns: PropertyColumnContext<T, any>[] = Reflect.getMetadata(COLUMNS_METADATA_KEY, object);

    if (!columns) {
      return this;
    }

    columns.forEach((column: PropertyColumnContext<T, any>) => {
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
          set(result, column.field, columnData.map((d: any) => new column.customConverter().toJson(d)));
        } else {
          set(result, column.field, columnData);
        }
      } else {
        if (column.type && !!columnData) {
          set(result, column.field, this.normalize(columnData));
        } else if (column.customConverter) {
          set(result, column.field, new column.customConverter().toJson(columnData));
        } else {
          set(result, column.field, columnData);
        }
      }
    });

    return this;
  }
}
