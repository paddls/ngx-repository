import {QuerySettings} from './query-settings';

export interface QueryBuilder<RC, RQ> {

  buildReadQuery<K>(query: QuerySettings<RC, K>): RQ;

  buildCreateQuery<K>(query: QuerySettings<RC, K>): RQ;

  buildUpdateQuery<K>(query: QuerySettings<RC, K>): RQ;

  buildDeleteQuery<K>(query: QuerySettings<RC, K>): RQ;
}
