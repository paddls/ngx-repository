import {Query} from './query';

/**
 * @ignore
 */
export interface QuerySettings<RC, K> {

  resourceConfiguration: RC;

  settings?: Query<K>;
}
