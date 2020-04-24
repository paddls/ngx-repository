import {HttpResourceContext} from './decorator/http-resource.decorator';
import {PathQuerySettings} from '@witty-services/ngx-repository';

export interface HttpQuerySettings<K> extends PathQuerySettings<HttpResourceContext, K> {
}
