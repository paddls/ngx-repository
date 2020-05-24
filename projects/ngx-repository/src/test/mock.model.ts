import {Column} from '@witty-services/ts-serializer';

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
