import {get, isArray} from 'lodash';
import {COLUMNS_METADATA_KEY, ColumnContextConfiguration} from '../decorator/column.decorator';
import {JOIN_COLUMN_METADATA_KEY, JoinColumnContextConfiguration} from '../decorator/join-column.decorator';
import {SubCollectionContextConfiguration, SUB_COLLECTION_METADATA_KEY} from '../decorator/sub-collection.decorator';
import {NormalizerConfiguration} from './normalizer.configuration';
import {Connection} from '../connection/connection';
import {Inject, Injectable} from '@angular/core';
import {Query} from '../query-builder/query';
import {NORMALIZER_CONFIGURATION_TOKEN} from '../ngx-repository.module.di';

@Injectable()
export class Denormalizer {

  public constructor(private connection: Connection<any, any>,
                     @Inject(NORMALIZER_CONFIGURATION_TOKEN) private configuration: NormalizerConfiguration) {}

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
    const joinColumns: JoinColumnContextConfiguration[] = Reflect.getMetadata(JOIN_COLUMN_METADATA_KEY, result);

    if (!joinColumns) {
      return this;
    }

    joinColumns.forEach((jc: JoinColumnContextConfiguration) => {
      result[jc.propertyKey] = this.connection.getRepository(jc.resourceType).findOne(result[jc.attribute]);
    });

    return this;
  }

  protected denormalizeSubCollection<T>(data: any, result: T, query?: Query<any>): Denormalizer {
    const subCollections: SubCollectionContextConfiguration[] = Reflect.getMetadata(SUB_COLLECTION_METADATA_KEY, result);

    if (!subCollections) {
      return this;
    }

    subCollections.forEach((sc: SubCollectionContextConfiguration) => {
      result[sc.propertyKey] = this.connection.getRepository(sc.resourceType).findBy(
        sc.params ? sc.params(result, query) : null
      );
    });

    return this;
  }
}
