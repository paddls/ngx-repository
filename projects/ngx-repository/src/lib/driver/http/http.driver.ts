import {Driver} from '../driver';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpDriver implements Driver<HttpRequest<any>, Observable<HttpResponse<any>>> {

  public constructor(protected httpClient: HttpClient) {
  }

  public create(object: any,  query: HttpRequest<any>): Observable<HttpResponse<any>> {
    return this.httpClient.post(query.url, object, {
      headers: query.headers,
      observe: 'response',
      params: query.params,
      reportProgress: query.reportProgress,
      responseType: 'json',
      withCredentials: query.withCredentials
    });
  }

  public delete(query: HttpRequest<any>): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(query.url, {
      headers: query.headers,
      observe: 'response',
      params: query.params,
      reportProgress: query.reportProgress,
      responseType: 'json',
      withCredentials: query.withCredentials
    });
  }

  public findBy(query: HttpRequest<any>): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(query.url, {
      headers: query.headers,
      observe: 'response',
      params: query.params,
      reportProgress: query.reportProgress,
      responseType: 'json',
      withCredentials: query.withCredentials
    });
  }

  public findOne(query: HttpRequest<any>): Observable<any> {
    return this.httpClient.get<any>(query.url, {
      headers: query.headers,
      observe: 'body',
      params: query.params,
      reportProgress: query.reportProgress,
      responseType: 'json',
      withCredentials: query.withCredentials
    });
  }

  public update(object: any, query: HttpRequest<any>): Observable<HttpResponse<any>> {
    return this.httpClient.put(query.url, object, {
      headers: query.headers,
      observe: 'response',
      params: query.params,
      reportProgress: query.reportProgress,
      responseType: 'json',
      withCredentials: query.withCredentials
    });
  }
}
