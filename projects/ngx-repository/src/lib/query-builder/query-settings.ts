import {Query} from './query';

export interface QuerySettings<RC, K> {

  resourceConfiguration: RC;

  settings?: Query<K>;
}
