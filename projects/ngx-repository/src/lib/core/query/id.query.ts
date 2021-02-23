import { Id } from '../decorator/id.decorator';

export class IdQuery {
  @Id()
  public id: any;

  public constructor(id: any) {
    this.id = id;
  }
}