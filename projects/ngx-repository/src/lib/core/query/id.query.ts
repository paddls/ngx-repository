import { Id } from '../decorator/id.decorator';
import { SubQuery } from '../decorator/sub-query.decorator';

export class IdQuery {

  @Id()
  public id: any;

  @SubQuery()
  public readonly parent?: any;

  public constructor(id: any, parent?: any) {
    this.id = id;
    this.parent = parent;
  }
}
