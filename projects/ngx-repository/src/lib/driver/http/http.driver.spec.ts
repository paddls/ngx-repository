import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {HttpDriver} from './http.driver';

describe('HttpDriver', () => {
  let httpClient: HttpClient;
  let httpDriver: HttpDriver;

  beforeEach(() => {
    httpClient = new HttpClient(null);
    httpDriver = new HttpDriver(httpClient);
  });

  it('should call post method on http client when we call create method', () => {
    const obj: any = {};
    const headers: HttpHeaders = new HttpHeaders({
      header1: 'header1-value'
    });
    const params: HttpParams = new HttpParams({
      fromObject: {
        param1: 'param1-value'
      }
    });
    const httpRequest: HttpRequest<any> = new HttpRequest<any>('POST', 'my-url', obj, {
      headers,
      params,
      reportProgress: true,
      withCredentials: false
    });

    spyOn(httpClient, 'post');

    httpDriver.create(obj, httpRequest);

    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith('my-url', obj, {
      headers,
      observe: 'response',
      params,
      reportProgress: true,
      responseType: 'json',
      withCredentials: false
    });
  });

  it('should call put method on http client when we call update method', () => {
    const obj: any = {};
    const headers: HttpHeaders = new HttpHeaders({
      header1: 'header1-value'
    });
    const params: HttpParams = new HttpParams({
      fromObject: {
        param1: 'param1-value'
      }
    });
    const httpRequest: HttpRequest<any> = new HttpRequest<any>('PUT', 'my-url', obj, {
      headers,
      params,
      reportProgress: true,
      withCredentials: false
    });

    spyOn(httpClient, 'put');

    httpDriver.update(obj, httpRequest);

    expect(httpClient.put).toHaveBeenCalledTimes(1);
    expect(httpClient.put).toHaveBeenCalledWith('my-url', obj, {
      headers,
      observe: 'response',
      params,
      reportProgress: true,
      responseType: 'json',
      withCredentials: false
    });
  });

  it('should call delete method on http client when we call delete method', () => {
    const headers: HttpHeaders = new HttpHeaders({
      header1: 'header1-value'
    });
    const params: HttpParams = new HttpParams({
      fromObject: {
        param1: 'param1-value'
      }
    });
    const httpRequest: HttpRequest<any> = new HttpRequest<any>('DELETE', 'my-url', {
      headers,
      params,
      reportProgress: true,
      withCredentials: false
    });

    spyOn(httpClient, 'delete');

    httpDriver.delete(httpRequest);

    expect(httpClient.delete).toHaveBeenCalledTimes(1);
    expect(httpClient.delete).toHaveBeenCalledWith('my-url', {
      headers,
      observe: 'response',
      params,
      reportProgress: true,
      responseType: 'json',
      withCredentials: false
    });
  });

  it('should call get method on http client when we call findBy method', () => {
    const headers: HttpHeaders = new HttpHeaders({
      header1: 'header1-value'
    });
    const params: HttpParams = new HttpParams({
      fromObject: {
        param1: 'param1-value'
      }
    });
    const httpRequest: HttpRequest<any> = new HttpRequest<any>('GET', 'my-url', {
      headers,
      params,
      reportProgress: true,
      withCredentials: false
    });

    spyOn(httpClient, 'get');

    httpDriver.findBy(httpRequest);

    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('my-url', {
      headers,
      observe: 'response',
      params,
      reportProgress: true,
      responseType: 'json',
      withCredentials: false
    });
  });

  it('should call get method on http client when we call findOne method', () => {
    const headers: HttpHeaders = new HttpHeaders({
      header1: 'header1-value'
    });
    const params: HttpParams = new HttpParams({
      fromObject: {
        param1: 'param1-value'
      }
    });
    const httpRequest: HttpRequest<any> = new HttpRequest<any>('GET', 'my-url', {
      headers,
      params,
      reportProgress: true,
      withCredentials: false
    });

    spyOn(httpClient, 'get');

    httpDriver.findOne(httpRequest);

    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('my-url', {
      headers,
      observe: 'body',
      params,
      reportProgress: true,
      responseType: 'json',
      withCredentials: false
    });
  });
});
