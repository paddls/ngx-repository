import {FirebaseResourceContext} from './decorator/firebase-resource.decorator';
import {PathQuerySettings} from '@witty-services/ngx-repository';

export interface FirebaseQuerySettings<K> extends PathQuerySettings<FirebaseResourceContext, K> {
}
