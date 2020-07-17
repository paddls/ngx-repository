import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpDriver} from './http.driver';
import {HttpRequest} from './http.request';

describe('HttpDriver', () => {
  let httpClient: HttpClient;
  let httpDriver: HttpDriver;

  beforeEach(() => {
    httpClient = new HttpClient(null);
    httpDriver = new HttpDriver(httpClient);
  });

  it('should call post method on http client when we call create method', () => {
    const obj: any = {};
    const headers: { [key: string]: string|string[] } = {
      header1: 'header1-value'
    };
    const params: HttpParams = new HttpParams({
      fromObject: {
        param1: 'param1-value'
      }
    });
    const httpRequest: HttpRequest<string> = new HttpRequest<string>({
      headers,
      queryParams: params
    });
    const spy: jasmine.Spy = spyOnProperty(httpRequest, 'createPath').and.returnValue('my-url');

    spyOn(httpClient, 'post');

    httpDriver.create(obj, httpRequest);

    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith('my-url', obj, {
      headers,
      observe: 'response',
      params,
      responseType: 'json'
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call put method on http client when we call update method', () => {
    const obj: any = {};
    const headers: { [key: string]: string|string[] } = {
      header1: 'header1-value'
    };
    const params: HttpParams = new HttpParams({
      fromObject: {
        param1: 'param1-value'
      }
    });
    const httpRequest: HttpRequest<string> = new HttpRequest<string>({
      headers,
      queryParams: params
    });
    const spy: jasmine.Spy = spyOnProperty(httpRequest, 'updatePath').and.returnValue('my-url');

    spyOn(httpClient, 'put');

    httpDriver.update(obj, httpRequest);

    expect(httpClient.put).toHaveBeenCalledTimes(1);
    expect(httpClient.put).toHaveBeenCalledWith('my-url', obj, {
      headers,
      observe: 'response',
      params,
      responseType: 'json'
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call delete method on http client when we call delete method', () => {
    const headers: { [key: string]: string|string[] } = {
      header1: 'header1-value'
    };
    const params: HttpParams = new HttpParams({
      fromObject: {
        param1: 'param1-value'
      }
    });
    const httpRequest: HttpRequest<string> = new HttpRequest<string>({
      headers,
      queryParams: params
    });
    const spy: jasmine.Spy = spyOnProperty(httpRequest, 'deletePath').and.returnValue('my-url');

    spyOn(httpClient, 'delete');

    httpDriver.delete(httpRequest);

    expect(httpClient.delete).toHaveBeenCalledTimes(1);
    expect(httpClient.delete).toHaveBeenCalledWith('my-url', {
      headers,
      observe: 'response',
      params,
      responseType: 'json'
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call get method on http client when we call findBy method', () => {
    const headers: { [key: string]: string|string[] } = {
      header1: 'header1-value'
    };
    const params: HttpParams = new HttpParams({
      fromObject: {
        param1: 'param1-value'
      }
    });
    const httpRequest: HttpRequest<string> = new HttpRequest<string>({
      headers,
      queryParams: params
    });
    const spy: jasmine.Spy = spyOnProperty(httpRequest, 'readPath').and.returnValue('my-url');

    spyOn(httpClient, 'get');

    httpDriver.findBy(httpRequest);

    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('my-url', {
      headers,
      observe: 'response',
      params,
      responseType: 'json'
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call get method on http client when we call findOne method', () => {
    const headers: { [key: string]: string|string[] } = {
      header1: 'header1-value'
    };
    const params: HttpParams = new HttpParams({
      fromObject: {
        param1: 'param1-value'
      }
    });
    const httpRequest: HttpRequest<string> = new HttpRequest<string>({
      headers,
      queryParams: params
    });
    const spy: jasmine.Spy = spyOnProperty(httpRequest, 'readPath').and.returnValue('my-url');

    spyOn(httpClient, 'get');

    httpDriver.findOne(httpRequest);

    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(httpClient.get).toHaveBeenCalledWith('my-url', {
      headers,
      observe: 'response',
      params,
      responseType: 'json'
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
