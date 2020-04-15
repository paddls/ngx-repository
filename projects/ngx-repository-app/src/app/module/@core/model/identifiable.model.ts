import {Id} from 'ngx-repository';

export class Identifiable {

  @Id()
  public id: string;

  public constructor(data: Partial<Identifiable> = {}) {
    Object.assign(this, data);
  }
}
