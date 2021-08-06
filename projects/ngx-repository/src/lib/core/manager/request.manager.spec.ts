import { RequestManager } from './request.manager';
import { Injector } from '@angular/core';
import { PathColumnResponseProcessor } from '../response/processor/path-column-response.processor';
import { OriginalQueryResponseProcessor } from '../response/processor/original-query-response.processor';
import { RequestManagerContext } from './request-manager.context';
import { RepositoryDriver } from '../driver/repository.driver';
import { ConfigurationContextProvider } from '../configuration/configuration-context.provider';
import { BuilderParam } from '../configuration/resource-param.configuration';

class MyRequest {
}

// TODO complete unit test
xdescribe('RequestManager', () => {
  let manager: RequestManager;
  let injector: Injector;
  let pathColumnResponseProcessor: PathColumnResponseProcessor;
  let originalQueryResponseProcessor: OriginalQueryResponseProcessor;

  beforeEach(() => {
    injector = {
      get: () => void 0
    };
    pathColumnResponseProcessor = new PathColumnResponseProcessor();
    originalQueryResponseProcessor = new OriginalQueryResponseProcessor();

    manager = new RequestManager(
      injector,
      pathColumnResponseProcessor,
      originalQueryResponseProcessor
    );
  });

  it('should build an observable which contain request', () => {
    const configuration: ConfigurationContextProvider = {
      getOperation: () => void 0,
      getConfiguration: () => void 0,
      findConfiguration: () => void 0
    } as any;
    const requestBuilderParam: BuilderParam<MyRequest> = {
      builder: MyRequest,
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
    expect(configuration.getConfiguration).toHaveBeenCalledTimes(1);
    expect(configuration.getConfiguration).toHaveBeenCalledWith('request');
  });
});
