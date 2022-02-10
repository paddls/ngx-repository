import { RepositoryRequest, RepositoryResponse } from '@paddls/ngx-repository';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

export class HttpRepositoryResponse implements RepositoryResponse {

  public constructor(private readonly response: HttpResponse<any>,
                     private readonly request: RepositoryRequest) {
  }

  public getBody(): any {
    return this.response.body;
  }

  public getHeaders(): HttpHeaders {
    return this.response.headers;
  }

  public getRequest(): RepositoryRequest {
    return this.request;
  }
}

