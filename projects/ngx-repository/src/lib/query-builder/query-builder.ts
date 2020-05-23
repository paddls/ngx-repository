import {QuerySettings} from './query-settings';
import {Request} from './request';

export interface QueryBuilder<RC> {

  buildRequestFromQuery<T, K>(query: QuerySettings<RC, K>, object?: T): Request;
}
