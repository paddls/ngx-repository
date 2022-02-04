import {PropertyKeyConfiguration} from '@witty-services/ngx-repository';

export interface FirestoreUpdatedAtContext {

  field: string;
}

/**
 * @ignore
 */
export interface FirestoreUpdatedAtContextConfiguration extends FirestoreUpdatedAtContext, PropertyKeyConfiguration {
}
