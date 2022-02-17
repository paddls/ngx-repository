import { RequestManager } from './request.manager';
import { Injectable } from '@angular/core';
import { RequestManagerContext } from './request-manager.context';
import { RepositoryDriver } from '../driver/repository.driver';
import { ConfigurationContextProvider } from '../configuration/configuration-context.provider';
import { BuilderParam } from '../configuration/resource-param.configuration';
import { RequestBuilder } from '../request/request.builder';
import { EMPTY, Observable } from 'rxjs';
import { RepositoryRequest } from '../request/repository.request';
import { TestBed } from '@angular/core/testing';

@Injectable()
class MyRequestBuilder implements RequestBuilder {
  public build(): Observable<RepositoryRequest> {
    return EMPTY;
  }
}

describe('RequestManager', () => {
  let manager: RequestManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RequestManager,
        MyRequestBuilder
      ]
    });

    manager = TestBed.inject(RequestManager);
  });

  it('should build and execute request and build response', () => {
    const configuration: ConfigurationContextProvider = {
      getOperation: () => void 0,
      getConfiguration: () => void 0,
      findConfiguration: () => void 0
    } as any;
    const requestBuilderParam: BuilderParam<MyRequestBuilder> = {
      builder: MyRequestBuilder,
      params: 'test'
    };
    spyOn(configuration, 'getConfiguration').and.returnValue(requestBuilderParam);

    const driver: RepositoryDriver = {
      execute: () => void 0
    };
    const context: RequestManagerContext = {
      driver,
      configuration,
      body: null,
      query: null
    };

    manager.execute(context);
    expect(configuration.getConfiguration).toHaveBeenCalledTimes(2);
    expect(configuration.getConfiguration).toHaveBeenCalledWith('requestBuilder');
  });
});
