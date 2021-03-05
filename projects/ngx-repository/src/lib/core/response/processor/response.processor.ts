import { RepositoryResponse } from '../repository.response';
import { RequestManagerContext } from '../../manager/request-manager.context';

export interface ResponseProcessor {

  transform(response: any, origin: RepositoryResponse, context: RequestManagerContext): any;

}
