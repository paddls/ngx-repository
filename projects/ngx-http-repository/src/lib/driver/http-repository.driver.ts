import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpRepositoryRequest } from '../request/http-repository.request';
import { Observable } from 'rxjs';
import { RepositoryDriver, RepositoryResponse } from '@witty-services/ngx-repository';
import { map } from 'rxjs/operators';
import { HttpRepositoryResponse } from '../response/http-repository.response';
import { log } from '@witty-services/rxjs-common';

@Injectable()
export class HttpRepositoryDriver implements RepositoryDriver {

  public constructor(protected readonly http: HttpClient) {
  }


  public execute(request: HttpRepositoryRequest): Observable<RepositoryResponse> {
    return this.http.request(request.method, request.path.value, {
      params: request.queryParams,
      headers: request.headers,
      observe: 'response',
      body: request.body,
      responseType: 'json'
    }).pipe(
      map((response: HttpResponse<any>) => new HttpRepositoryResponse(response, request))
    );
  }
}
