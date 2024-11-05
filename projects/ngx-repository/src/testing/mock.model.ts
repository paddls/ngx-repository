import {Column} from '../lib/core/decorator/column.decorator';

export class Mock {

  public myProperty: string;

  public mySecondProperty: string;

  @Column({field: 'name', writeOnly: true})
  public name: string = 'test';

  public constructor(data?: Partial<Mock>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
