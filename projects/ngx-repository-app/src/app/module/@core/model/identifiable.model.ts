import {Id} from '@witty-services/repository-core';

export class Identifiable {

  @Id()
  public id: string;

  public constructor(data: Partial<Identifiable> = {}) {
    Object.assign(this, data);
  }
}
