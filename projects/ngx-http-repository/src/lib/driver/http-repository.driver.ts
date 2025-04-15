import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpRepositoryRequest } from '../request/http-repository.request';
import { Observable } from 'rxjs';
import { PublisherService, RepositoryDriver } from '@paddls/ngx-repository';
import { map, tap } from 'rxjs/operators';
import { HttpRepositoryResponse } from '../response/http-repository.response';
import { BeforeExecuteHttpRequestEvent } from './event/before-execute-http-request.event';
import { AfterExecuteHttpRequestEvent } from './event/after-execute-http-request.event';

@Injectable()
export class HttpRepositoryDriver implements RepositoryDriver {

  protected readonly http = inject(HttpClient);

  public execute(request: HttpRepositoryRequest): Observable<HttpRepositoryResponse> {
    PublisherService.getInstance()?.publish(new BeforeExecuteHttpRequestEvent({ request }));

    return this.http.request(request.method, request.path.value, {
      params: request.queryParams,
      headers: request.headers,
      observe: 'response',
      body: request.body,
      responseType: 'json'
    }).pipe(
      map((response: HttpResponse<any>) => new HttpRepositoryResponse(response, request)),
      tap((response: HttpRepositoryResponse) => PublisherService.getInstance()?.publish(new AfterExecuteHttpRequestEvent({
        request,
        response
      })))
    );
  }
}
