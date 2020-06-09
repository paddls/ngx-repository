import {FirebaseResourceContext} from './decorator/firebase-resource.decorator';
import {PathQuerySettings} from '@witty-services/ngx-repository';

/**
 * @ignore
 */
export interface FirebaseQuerySettings<K> extends PathQuerySettings<FirebaseResourceContext, K> {
}
