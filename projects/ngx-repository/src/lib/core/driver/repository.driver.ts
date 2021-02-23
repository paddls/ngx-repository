import { RepositoryRequest } from '../request/repository.request';
import { Observable } from 'rxjs';
import { RepositoryResponse } from '../response/repository.response';

export interface RepositoryDriver {
  execute(request: RepositoryRequest): Observable<RepositoryResponse>;
}