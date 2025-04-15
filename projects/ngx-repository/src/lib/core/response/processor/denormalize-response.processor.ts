import { inject, Injectable, Type } from '@angular/core';
import { RepositoryNormalizer } from '../../../normalizer/repository-denormalizer';
import { RepositoryResponse } from '../repository.response';
import { RequestManagerContext } from '../../manager/request-manager.context';
import { NormalizerConfiguration } from '@paddls/ts-serializer';
import { ResponseProcessor } from './response.processor';
import { PublisherService } from '../../event-stream/publisher.service';
import { BeforeDenormalizeEvent } from '../../../normalizer/event/before-denormalize.event';
import { AfterDenormalizeEvent } from '../../../normalizer/event/after-denormalize.event';

@Injectable()
export class DenormalizeResponseProcessor implements ResponseProcessor {

  private readonly normalizer = inject(RepositoryNormalizer);

  public transform(response: any, origin: RepositoryResponse, { configuration }: RequestManagerContext): any {
    const responseType: Type<any> = configuration.getConfiguration('responseType')();
    const normalizerConfiguration: NormalizerConfiguration = configuration.findConfiguration('normalizerConfiguration');

    PublisherService.getInstance()?.publish(new BeforeDenormalizeEvent({
      type: responseType,
      body: response,
      configuration: normalizerConfiguration
    }));
    const data: any = this.normalizer.denormalize(responseType, response, normalizerConfiguration);
    PublisherService.getInstance()?.publish(new AfterDenormalizeEvent({
      type: responseType,
      body: response,
      configuration: normalizerConfiguration,
      data
    }));

    return data;
  }
}
