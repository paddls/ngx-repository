import { HttpRepositoryParamContextConfiguration } from './http-repository-param-context.configuration';
import { isHttpOperation } from '../../request/http.operation';
import { HttpRepositoryParamConfiguration } from '../http-repository-param.configuration';
import { forOwn, isString, isUndefined } from 'lodash';
import { HttpRepositoryConfiguration } from '../http-repository.configuration';
import { HttpRepositoryFindAllParamContextConfiguration } from './http-repository-find-all-param-context.configuration';
import { HttpFindAllResponseBuilder } from '../../response/http-find-all-response.builder';
import { HttpCreateResponseBuilder } from '../../response/http-create-response.builder';
import { HttpWriteResponseBuilder } from '../../response/http-write-response.builder';

export interface HttpRepositoryContextConfiguration extends HttpRepositoryParamContextConfiguration {
  read?: HttpRepositoryParamContextConfiguration | string;
  write?: HttpRepositoryParamContextConfiguration | string;
  findById?: HttpRepositoryParamContextConfiguration | string;
  findOne?: HttpRepositoryParamContextConfiguration | string;
  findAll?: HttpRepositoryFindAllParamContextConfiguration | string;
  create?: HttpRepositoryParamContextConfiguration | string;
  update?: HttpRepositoryParamContextConfiguration | string;
  patch?: HttpRepositoryParamContextConfiguration | string;
  delete?: HttpRepositoryParamContextConfiguration | string;
}

export function createHttpRepositoryConfiguration(params: HttpRepositoryContextConfiguration): HttpRepositoryContextConfiguration {
  const configuration: HttpRepositoryConfiguration = {
    findAll: {
      response: HttpFindAllResponseBuilder.withParams()
    },
    create: {
      response: HttpCreateResponseBuilder.withParams()
    },
    write: {
      response: HttpWriteResponseBuilder.withParams()
    }
  };

  forOwn(params, (value: any, key: string) => {
    const defaultConfiguration: any = configuration[key] || {};
    let overriddenConfiguration: any = null;
    if (key === 'findAll') {
      overriddenConfiguration = createFindAllParam(value);
    } else if (isHttpOperation(key)) {
      overriddenConfiguration = createOperationParams(value);
    }

    if (overriddenConfiguration) {
      configuration[key] = {
        ...defaultConfiguration,
        ...overriddenConfiguration
      };
    }
  });

  forOwn(params, (value: any, key: string) => {
    if (isUndefined(configuration[key])) {
      configuration[key] = value;
    }
  });

  return configuration;
}

function createFindAllParam(param: any): HttpRepositoryParamConfiguration {
  const configuration: HttpRepositoryParamConfiguration = createOperationParams(param);

  if (param.pageResponseProcessor) {
    configuration.response = HttpFindAllResponseBuilder.withParams({
      pageResponseProcessor: param.pageResponseProcessor
    });
  }

  return configuration;
}

function createOperationParams(param: any): HttpRepositoryParamConfiguration {
  if (isString(param)) {
    return {
      path: param
    };
  }

  return param;
}
