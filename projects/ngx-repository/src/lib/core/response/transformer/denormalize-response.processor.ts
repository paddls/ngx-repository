// TODO @RMA move to another file
import { Injectable, Type } from '@angular/core';
import { RepositoryNormalizer } from '../../../normalizer/repository-denormalizer';
import { RepositoryResponse } from '../repository.response';
import { RequestManagerContext } from '../../manager/request-manager.context';
import { NormalizerConfiguration } from '@witty-services/ts-serializer';
import { ResponseProcessor } from './response.processor';

@Injectable()
export class DenormalizeResponseProcessor implements ResponseProcessor {

  public constructor(private readonly normalizer: RepositoryNormalizer) {
  }

  public transform(response: any, origin: RepositoryResponse, { configuration }: RequestManagerContext): any {
    const responseType: Type<any> = configuration.getConfiguration('responseType')();
    const normalizerConfiguration: NormalizerConfiguration = configuration.findConfiguration('normalizer');

    return this.normalizer.denormalize(responseType, response, normalizerConfiguration);
  }
}