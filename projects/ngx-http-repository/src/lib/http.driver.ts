import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpRequest} from './http.request';
import {Driver} from '@witty-services/ngx-repository';

@Injectable()
export class HttpDriver implements Driver<HttpResponse<any>> {

  public constructor(protected httpClient: HttpClient) {
  }

  public create<K>(object: any,  request: HttpRequest<K>): Observable<HttpResponse<any>> {
    return this.httpClient.post(request.createPath, object, {
      headers: request.headers,
      observe: 'response',
      params: request.queryParams,
      responseType: 'json'
    });
  }

  public delete<K>(request: HttpRequest<K>): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(request.deletePath, {
      headers: request.headers,
      observe: 'response',
      params: request.queryParams,
      responseType: 'json'
    });
  }

  public findBy<K>(request: HttpRequest<K>): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(request.readPath, {
      headers: request.headers,
      observe: 'response',
      params: request.queryParams,
      responseType: 'json'
    });
  }

  public findOne<K>(request: HttpRequest<K>): Observable<any> {
    return this.httpClient.get<any>(request.readPath, {
      headers: request.headers,
      observe: 'response',
      params: request.queryParams,
      responseType: 'json'
    });
  }

  public update<K>(object: any, request: HttpRequest<K>): Observable<HttpResponse<any>> {
    return this.httpClient.put(request.updatePath, object, {
      headers: request.headers,
      observe: 'response',
      params: request.queryParams,
      responseType: 'json'
    });
  }
}
