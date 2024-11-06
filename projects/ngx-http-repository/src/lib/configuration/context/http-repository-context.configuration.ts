import { HttpRepositoryParamContextConfiguration } from './http-repository-param-context.configuration';
import { HTTP_OPERATIONS } from '../../request/http.operation';
import { HttpRepositoryParamConfiguration } from '../http-repository-param.configuration';
import { HttpRepositoryFindAllParamContextConfiguration } from './http-repository-find-all-param-context.configuration';
import { HttpRepositoryWriteParamContextConfiguration } from './http-repository-write-param-context.configuration';
import {
  IdResponseProcessor,
  PageResponseProcessor,
  ResponseBuilder,
  VoidResponseProcessor
} from '@paddls/ngx-repository';
import { get, isString, isUndefined, omit } from '@paddls/utils';


export interface HttpRepositoryContextConfiguration extends HttpRepositoryParamContextConfiguration {
  read?: HttpRepositoryParamContextConfiguration | string;
  write?: HttpRepositoryWriteParamContextConfiguration | string;
  findById?: HttpRepositoryParamContextConfiguration | string;
  findOne?: HttpRepositoryParamContextConfiguration | string;
  findAll?: HttpRepositoryFindAllParamContextConfiguration | string;
  create?: HttpRepositoryWriteParamContextConfiguration | string;
  update?: HttpRepositoryWriteParamContextConfiguration | string;
  patch?: HttpRepositoryWriteParamContextConfiguration | string;
  delete?: HttpRepositoryWriteParamContextConfiguration | string;
}

export function createHttpRepositoryConfiguration(params: HttpRepositoryContextConfiguration): HttpRepositoryContextConfiguration {
  return {
    findById: buildOperationParams(params, ['read', 'findById']),
    findOne: buildOperationParams(params, ['read', 'findOne']),
    findAll: buildFindAllParams(params, ['read', 'findAll']),
    create: buildCreateParams(params, ['write', 'create']),
    update: buildWriteParams(params, ['write', 'update']),
    patch: buildWriteParams(params, ['write', 'patch']),
    delete: buildWriteParams(params, ['write', 'delete'])
  };
}

function buildOperationParams<T>(params: HttpRepositoryContextConfiguration, path: string[]): T {
  const rootConfiguration: any = omit(params, HTTP_OPERATIONS);
  const configurations: any[] = [
    rootConfiguration,
    ...path.map((key: string) => get(params, key))
      .filter((value: any) => !isUndefined(value))
  ].map((value: any) => isString(value) ? {path: value} : value);

  return Object.assign({}, ...configurations);
}

function buildFindAllParams(params: HttpRepositoryContextConfiguration, path: string[]): HttpRepositoryParamConfiguration {
  const param: HttpRepositoryFindAllParamContextConfiguration = buildOperationParams(params, path);

  if (param.pageResponseProcessor) {
    param.responseBuilder = PageResponseProcessor.withParams(param.pageResponseProcessor);
  }

  return param;
}

function buildCreateParams(params: HttpRepositoryContextConfiguration, path: string[]): HttpRepositoryParamConfiguration {
  const param: HttpRepositoryWriteParamContextConfiguration = buildOperationParams(params, path);

  if (param.fullResponse != null) {
    param.responseBuilder = ResponseBuilder.withParams({
      postResponseProcessors: param.fullResponse ? [] : [
        IdResponseProcessor
      ]
    });
  }

  return param;
}

function buildWriteParams(params: HttpRepositoryContextConfiguration, path: string[]): HttpRepositoryParamConfiguration {
  const param: HttpRepositoryWriteParamContextConfiguration = buildOperationParams(params, path);

  if (param.fullResponse != null) {
    param.responseBuilder = ResponseBuilder.withParams({
      postResponseProcessors: param.fullResponse ? [] : [
        VoidResponseProcessor
      ]
    });
  }

  return param;
}
