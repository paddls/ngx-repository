import {Normalizer} from '../normalizer/normalizer';
import {Denormalizer} from '../normalizer/denormalizer';
import {Driver} from '../driver/driver';
import {get} from 'lodash';
import {ID_METADATA_KEY, IdContext} from '../decorator/id.decorator';
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
import {ResponseBuilder} from '../item-builder/response-builder';
import {Observable} from 'rxjs';
import {map, mapTo} from 'rxjs/operators';
import {ColumnContextConfiguration, COLUMNS_METADATA_KEY} from '../decorator/column.decorator';

export abstract class AbstractRepository<T, K, RC, RS> {

  public constructor(protected resourceContextKey: string,
                     protected driver: Driver<RS>,
                     protected normalizer: Normalizer,
                     protected denormalizer: Denormalizer,
                     protected queryBuilder: QueryBuilder<RC>,
                     protected pageBuilder: PageBuilder<RS>,
                     protected createResponseBuilder: ResponseBuilder<RS>,
                     protected findOneResponseBuilder: ResponseBuilder<RS>) {
  }

  protected get repositoryContextConfiguration(): RepositoryContextConfiguration {
    if (Reflect.hasMetadata(REPOSITORY_METADATA_KEY, Object.getPrototypeOf(this).constructor)) {
      return Reflect.getMetadata(REPOSITORY_METADATA_KEY, Object.getPrototypeOf(this).constructor);
    } else if (Reflect.getMetadata(REPOSITORY_METADATA_KEY, this)) {
      return Reflect.getMetadata(REPOSITORY_METADATA_KEY, this);
    } else {
      return null;
    }
  }

  protected get resourceContextConfiguration(): RC {
    if (Reflect.hasMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, Object.getPrototypeOf(this).constructor)) {
      return Reflect.getMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, Object.getPrototypeOf(this).constructor);
    } else if (Reflect.getMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, this)) {
      return Reflect.getMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, this);
    } else {
      const repositoryContextConfiguration: RepositoryContextConfiguration = this.repositoryContextConfiguration;
      if (!repositoryContextConfiguration) {
        throw new Error('There is no Resource type configuration for this repository.');
      }

      const resourceContextConfiguration: RC = Reflect.getMetadata(this.resourceContextKey, repositoryContextConfiguration.type);
      Reflect.defineMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, resourceContextConfiguration, Object.getPrototypeOf(this).constructor);

      return resourceContextConfiguration;
    }
  }

  public findAll(query?: any): Observable<Page<T>> {
    return this.pageBuilder.buildPage(
      this.driver.findBy(
        this.queryBuilder.buildRequestFromQuery(this.buildQuery(query)),
      ),
      this
    ).pipe(
      map((data: Page<T>) => this.denormalizeAll(data, query))
    );
  }

  public findOne(id: K, query: any = {}): Observable<T> {
    query.id = id;

    return this.findOneResponseBuilder.build(
      this.driver.findOne(this.queryBuilder.buildRequestFromQuery(this.buildQuery(query))),
      this
    ).pipe(
      map((data: any) => this.denormalizeOne(data, query))
    );
  }

  public create(object: T, query?: any): Observable<K> {
    return this.createResponseBuilder.build(
      this.driver.create(
        this.normalizeOne(object),
        this.queryBuilder.buildRequestFromQuery(this.buildQuery(query))
      ),
      this
    );
  }

  public update(object: T, query: any = {}): Observable<void> {
    query.id = this.getResourceId(object);

    return this.driver.update(
      this.normalizeOne(object),
      this.queryBuilder.buildRequestFromQuery(this.buildQuery(query))
    ).pipe(
      mapTo(void 0)
    );
  }

  public delete(object: T, query: any = {}): Observable<void> {
    query.id = this.getResourceId(object);

    return this.driver.delete(this.queryBuilder.buildRequestFromQuery(this.buildQuery(query))).pipe(
      mapTo(void 0)
    );
  }

  public getResourceId(object: T): K {
    if (!object[Reflect.getMetadata(ID_METADATA_KEY, object)]) {
      throw new Error('There is no id column configured. See @Id() decorator.');
    }

    return get(object, Reflect.getMetadata(ID_METADATA_KEY, object));
  }

  public getIdContext(): IdContext {
    const repositoryContextConfiguration: RepositoryContextConfiguration = this.repositoryContextConfiguration;
    if (!repositoryContextConfiguration) {
      throw new Error('There is no Resource type configuration for this repository.');
    }

    const resourceType: new(...args: any[]) => any = repositoryContextConfiguration.type;
    const propertyKey: string = Reflect.getMetadata(ID_METADATA_KEY, resourceType.prototype);
    if (!propertyKey) {
      throw new Error(`There is no id column configured for ${resourceType.name}. See @Id() decorator.`);
    }

    const columnContextConfigurations: ColumnContextConfiguration<T, K>[] = Reflect.getMetadata(COLUMNS_METADATA_KEY, resourceType.prototype) || [];

    return columnContextConfigurations.find(
      (columnContextConfiguration: ColumnContextConfiguration<T, K>) => columnContextConfiguration.propertyKey === propertyKey
    );
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
    const repositoryContextConfiguration: RepositoryContextConfiguration = this.repositoryContextConfiguration;
    if (!repositoryContextConfiguration) {
      throw new Error('There is no Resource type configuration for this repository.');
    }

    return this.denormalizer.denormalize(repositoryContextConfiguration.type, data, query);
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
