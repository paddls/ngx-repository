import {PATH_COLUMN_METADATA_KEY, PathColumnContextConfiguration} from '../decorator/path-column.decorator';
import {Query} from '../query-builder/query';
import {Inject, Injectable} from '@angular/core';
import {PathRequest} from '../query-builder/path.request';
import {Denormalizer, NormalizerConfiguration} from '@witty-services/ts-serializer';
import {NORMALIZER_CONFIGURATION_TOKEN} from '../ngx-repository.module.di';
import {RepositoryDenormalizer} from './repository-denormalizer';

export const ORIGINAL_QUERY_METADATA_KEY: string = 'originalQuery';

@Injectable()
export class PathDenormalizer extends Denormalizer implements RepositoryDenormalizer {

  public constructor(@Inject(NORMALIZER_CONFIGURATION_TOKEN) configuration: NormalizerConfiguration) {
    super(configuration);
  }

  public denormalizeWithQuery<T, K>(type: new() => T, data: any, query?: Query<any>, request?: PathRequest<K>): T {
    const result: T = super.denormalize(type, data);

    if (!result) {
      return null;
    }

    if (query) {
      Reflect.defineMetadata(ORIGINAL_QUERY_METADATA_KEY, query, result);
    }

    if (request && request.pathParams) {
      this.denormalizePathColumn(result, request);
    }

    return result;
  }

  protected denormalizePathColumn<T, K>(result: T, request: PathRequest<K>): Denormalizer {
    const pathColumns: PathColumnContextConfiguration[] = Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, result);

    if (!pathColumns) {
      return this;
    }

    pathColumns.forEach((pc: PathColumnContextConfiguration) => {
      result[pc.propertyKey] = request.pathParams[`:${pc.name}`];
    });

    return this;
  }
}
