import {FirebaseResourceContext} from './decorator/firebase-resource.decorator';
import {PathQuerySettings} from '../query-builder/path.query-settings';

export interface FirebaseQuerySettings<K> extends PathQuerySettings<FirebaseResourceContext, K> {
}
