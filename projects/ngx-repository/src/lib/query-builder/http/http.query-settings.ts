import {QuerySettings} from '../query-settings';
import {HttpResourceContext} from '../../decorator/http/http-resource.decorator';

export interface HttpQuerySettings<K> extends QuerySettings<HttpResourceContext, K> {

  url: string;

  method: any;
}
