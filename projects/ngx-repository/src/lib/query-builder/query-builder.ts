import {QuerySettings} from './query-settings';
import {Request} from './request';

/**
 * @ignore
 */
export interface QueryBuilder<RC> {

  buildRequestFromQuery<T, K>(query: QuerySettings<RC, K>, object?: T): Request;
}
