import {get, isArray} from 'lodash';
import {COLUMNS_METADATA_KEY, PropertyColumnContext} from '../decorator/column.decorator';
import {JOIN_COLUMN_METADATA_KEY, PropertyJoinColumnContext} from '../decorator/join-column.decorator';
import {PropertySubCollectionContext, SUB_COLLECTION_METADATA_KEY} from '../decorator/sub-collection.decorator';
import {NormalizerConfiguration} from './normalizer.configuration';
import {Connection} from '../connection/connection';
import {Injectable} from '@angular/core';
import {Query} from '../query-builder/query';

@Injectable()
export class Denormalizer {

  public constructor(private connection: Connection<any, any, any>,
                     private configuration: NormalizerConfiguration) {}

  public denormalize<T>(type: new() => T, data: any|any[], query?: Query<any>): T {
    if (!data) {
      return null;
    }

    const result: T = new type();

    this
      .denormalizeColumn(data, result)
      .denormalizeJoinColumn(data, result)
      .denormalizeSubCollection(data, result, query);

    return result;
  }

  protected denormalizeColumn<T>(data: any, result: T): Denormalizer {
    const columns: PropertyColumnContext<T, any>[] = Reflect.getMetadata(COLUMNS_METADATA_KEY, result);

    if (!columns) {
      return this;
    }

    columns.forEach((cc: PropertyColumnContext<T, any>) => {
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
          result[cc.propertyKey] = columnData.map((d: any) => this.denormalize(cc.type, d));
        } else if (cc.customConverter) {
          result[cc.propertyKey] = columnData.map((d: any) => new cc.customConverter().fromJson(d));
        } else {
          result[cc.propertyKey] = columnData;
        }
      } else {
        if (cc.type && !!columnData) {
          result[cc.propertyKey] = this.denormalize(cc.type, columnData);
        } else if (cc.customConverter) {
          result[cc.propertyKey] = new cc.customConverter().fromJson(columnData);
        } else {
          result[cc.propertyKey] = columnData;
        }
      }
    });

    return this;
  }

  protected denormalizeJoinColumn<T>(data: any, result: T): Denormalizer {
    const joinColumns: PropertyJoinColumnContext[] = Reflect.getMetadata(JOIN_COLUMN_METADATA_KEY, result);

    if (!joinColumns) {
      return this;
    }

    joinColumns.forEach((jc: PropertyJoinColumnContext) => {
      result[jc.propertyKey] = this.connection.getRepository(jc.resourceType).findOne(result[jc.attribute]);
    });

    return this;
  }

  protected denormalizeSubCollection<T>(data: any, result: T, query?: Query<any>): Denormalizer {
    const subCollections: PropertySubCollectionContext[] = Reflect.getMetadata(SUB_COLLECTION_METADATA_KEY, result);

    if (!subCollections) {
      return this;
    }

    subCollections.forEach((sc: PropertySubCollectionContext) => {
      result[sc.propertyKey] = this.connection.getRepository(sc.resourceType).findBy(
        sc.params ? sc.params(result, query) : null
      );
    });

    return this;
  }
}
