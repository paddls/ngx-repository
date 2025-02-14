import { inject, Injectable, Type } from '@angular/core';
import { Denormalizer, Normalizer, NormalizerConfiguration } from '@paddls/ts-serializer';
import { NORMALIZER_CONFIGURATION_TOKEN } from '@paddls/ngx-serializer';

@Injectable()
export class RepositoryNormalizer {

  protected readonly normalizer: Normalizer;
  protected readonly denormalizer: Denormalizer;

  public constructor() {
    const configuration = inject<NormalizerConfiguration>(NORMALIZER_CONFIGURATION_TOKEN);

    this.normalizer = new Normalizer(configuration);
    this.denormalizer = new Denormalizer(configuration);
  }

  public denormalize(type: Type<any>, body: any, configuration?: NormalizerConfiguration): any {
    const denormalizer: Denormalizer = configuration ? new Denormalizer(configuration) : this.denormalizer;

    if (Array.isArray(body)) {
      return body.map((item: any) => denormalizer.deserialize(type, item));
    } else {
      return denormalizer.deserialize(type, body);
    }
  }

  public normalize(body: any, configuration?: NormalizerConfiguration): any {
    const normalizer: Normalizer = configuration ? new Normalizer(configuration) : this.normalizer;

    return normalizer.serialize(body);
  }

  public getNormalizer(): Normalizer {
    return this.normalizer;
  }
}
