import {Id} from '@witty-services/repository-core';

export class Identifiable {

  @Id()
  public id: string;
}
