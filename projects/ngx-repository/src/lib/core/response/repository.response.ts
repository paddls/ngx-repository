import { RepositoryRequest } from '../request/repository.request';

export interface RepositoryResponse {
  getRequest(): RepositoryRequest;
  getBody(): any;
}
