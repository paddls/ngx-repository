import {Type} from '@angular/core';
import {NormalizerConfiguration} from '@paddls/ts-serializer';

export class AfterDenormalizeEvent {

  public type: Type<any>;

  public body: any;

  public configuration: NormalizerConfiguration;

  public data: any;

  public constructor(data: Partial<AfterDenormalizeEvent> = {}) {
    Object.assign(this, data);
  }
}
