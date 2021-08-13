import { Observable } from 'rxjs';
import { RepositoryRequest } from './repository.request';
import { RequestManagerContext } from '../manager/request-manager.context';

export interface RequestBuilder {
  build(context: RequestManagerContext): Observable<RepositoryRequest>;
}

