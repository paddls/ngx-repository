import { Observable } from 'rxjs';
import { ResponseProcessorToken } from '@paddls/ngx-repository';
import { HttpRepositoryParamConfiguration } from '../http-repository-param.configuration';

export type HttpQueryFn<R, Q = any> = (query?: Q) => Observable<R>;
export type HttpBodyFn<R, B = any, Q = any> = (body: B, query?: Q) => Observable<R>;

export interface HttpRequestParamsContext extends HttpRepositoryParamConfiguration {
  /**
   * Define signature of method.
   * If true, then the first param should be the body, and the second param (optional) should be the query.
   * If false, the unique param should be the query (optional)
   */
  withBody?: boolean;

  /**
   * List of processors invoked just before returning the response.
   * For example to create Page or return the id of the resource.
   */
  postResponseProcessors?: ResponseProcessorToken[] | ResponseProcessorToken; // TODO @RMA share it with repository
}
