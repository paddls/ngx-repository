import {QuerySettings} from './query-settings';
import {PathContext} from '../common/path/path-context';

export interface PathQuerySettings<RC extends PathContext, K> extends QuerySettings<RC, K> {
}
