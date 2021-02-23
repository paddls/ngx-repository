import { RepositoryResponse } from './repository.response';
import { Observable } from 'rxjs';
import { RequestManagerContext } from '../manager/request-manager.context';
import { ConfigurationContextProvider } from '../configuration/configuration-context.provider';
import { Type } from '@angular/core';
import { ResponseProcessor } from './transformer/response.processor';
import { BuilderParam } from '../configuration/resource-param.configuration';
import { get, isObject } from 'lodash';

export abstract class ResponseBuilder {

  public abstract getProcessors(configuration: ConfigurationContextProvider): Type<ResponseProcessor>[];

  public abstract build(response: RepositoryResponse, context: RequestManagerContext): Observable<any>;

  protected abstract getDefaultParams(): any;

  protected getParams<T>(key: keyof T, configuration: ConfigurationContextProvider): any {
    const builderParam: BuilderParam<ResponseBuilder> = configuration.findConfiguration('response');
    const defaultParam: any = this.getDefaultParams()[key];

    if (isObject(builderParam)) {
      return get(builderParam, `params.${ key }`, defaultParam);
    } else {
      return defaultParam;
    }
  }
}
