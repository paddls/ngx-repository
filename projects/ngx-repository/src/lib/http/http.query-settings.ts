import {HttpResourceContext} from './decorator/http-resource.decorator';
import {PathQuerySettings} from '../query-builder/path.query-settings';

export interface HttpQuerySettings<K> extends PathQuerySettings<HttpResourceContext, K> {
}
