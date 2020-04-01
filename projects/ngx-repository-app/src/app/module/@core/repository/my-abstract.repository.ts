import {HttpClient} from '@angular/common/http';
import {Denormalizer, Normalizer} from '@witty-services/repository-core';
import {HttpRepository} from 'ngx-repository';

export abstract class MyAbstractRepository<T, K = null, P = null> extends HttpRepository<T, K, P> {

  public constructor(http: HttpClient, denormalizer: Denormalizer<T>, normalizer: Normalizer<T>) {
    super(http, denormalizer, normalizer);
  }
}
