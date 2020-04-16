import {Normalizer} from '../normalizer/normalizer';
import {Denormalizer} from '../normalizer/denormalizer';
import {Driver} from '../driver/driver';
import {get} from 'lodash';
import {ID_METADATA_KEY} from '../decorator/id.decorator';
import {QuerySettings} from '../query-builder/query-settings';
import {QueryBuilder} from '../query-builder/query-builder';
import {Query} from '../query-builder/query';
import {
  REPOSITORY_METADATA_KEY,
  RepositoryContextConfiguration,
  RESOURCE_CONFIGURATION_METADATA_KEY
} from '../decorator/repository.decorator';
import {PageBuilder} from '../page-builder/page-builder';
import {Page} from '../page-builder/page';

export abstract class AbstractRepository<T, K, RC, RQ, RS> {

  public constructor(protected resourceContextKey: string,
                     protected driver: Driver<RQ, RS>,
                     protected normalizer: Normalizer,
                     protected denormalizer: Denormalizer,
                     protected queryBuilder: QueryBuilder<RC, RQ>,
                     protected pageBuilder: PageBuilder<RS>) {
  }

  protected get resourceTypeConfiguration(): RepositoryContextConfiguration {
    if (Reflect.hasMetadata(REPOSITORY_METADATA_KEY, Object.getPrototypeOf(this).constructor)) {
      return Reflect.getMetadata(REPOSITORY_METADATA_KEY, Object.getPrototypeOf(this).constructor);
    } else if (Reflect.getMetadata(REPOSITORY_METADATA_KEY, this)) {
      return Reflect.getMetadata(REPOSITORY_METADATA_KEY, this);
    } else {
      throw new Error('There is no Resource type configuration for this repository.');
    }
  }

  protected get resourceContextConfiguration(): RC {
    if (Reflect.hasMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, Object.getPrototypeOf(this).constructor)) {
      return Reflect.getMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, Object.getPrototypeOf(this).constructor);
    } else if (Reflect.getMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, this)) {
      return Reflect.getMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, this);
    } else {
      const resourceContextConfiguration: RC = Reflect.getMetadata(this.resourceContextKey, this.resourceTypeConfiguration.type);
      Reflect.defineMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, resourceContextConfiguration, Object.getPrototypeOf(this).constructor);

      return resourceContextConfiguration;
    }
  }

  public findBy(query?: any): any {
    return this.pageBuilder.buildPage(this.driver.findBy(
      this.queryBuilder.buildReadQuery(this.buildQuery(query))
    ));
  }

  public findOne(id: K, query: any = {}): any {
    query.id = id;

    return this.driver.findOne(this.queryBuilder.buildReadQuery(this.buildQuery(query)));
  }

  public create(object: T, query?: any): any {
    return this.driver.create(
      this.normalizeOne(object),
      this.queryBuilder.buildCreateQuery(this.buildQuery(query))
    );
  }

  public update(object: T, query: any = {}): any {
    query.id = this.getIdOfObject(object);

    return this.driver.update(
      this.normalizeOne(object),
      this.queryBuilder.buildUpdateQuery(this.buildQuery(query))
    );
  }

  public delete(object: T, query: any = {}): any {
    query.id = this.getIdOfObject(object);

    return this.driver.delete(this.queryBuilder.buildDeleteQuery(this.buildQuery(query)));
  }

  protected getIdOfObject(object: T): K {
    if (!object[Reflect.getMetadata(ID_METADATA_KEY, object)]) {
      throw new Error('There is no id column configured. See @Id() decorator.');
    }

    return get(object, Reflect.getMetadata(ID_METADATA_KEY, object));
  }

  protected denormalizeAll(datas: Page<any>, query: Query<K>): Page<T> {
    if (!datas) {
      return new Page();
    }

    if (!Array.isArray(datas)) {
      throw new Error('Data is not an array, please pass only array in denormalizeAll method.');
    }

    return datas.map((d: any) => this.denormalizeOne(d, query));
  }

  protected denormalizeOne(data: any, query: Query<K>): T {
    return this.denormalizer.denormalize(this.resourceTypeConfiguration.type, data, query);
  }

  protected normalizeOne(data: T): any {
    return this.normalizer.normalize(data);
  }

  protected buildQuery(querySettings: Query<K>): QuerySettings<RC, K> {
    return {
      resourceConfiguration: this.resourceContextConfiguration,
      settings: querySettings
    };
  }
}
