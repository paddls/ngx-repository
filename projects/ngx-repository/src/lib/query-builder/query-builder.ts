import {QuerySettings} from './query-settings';
import {Request} from './request';

export interface QueryBuilder<RC> {

  buildRequestFromQuery<K>(query: QuerySettings<RC, K>): Request;
}
