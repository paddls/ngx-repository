import { Column } from '@paddls/ngx-repository';

export class Address {

  @Column()
  public address: string;

  @Column()
  public postCode: number;

  @Column()
  public city: string;

  public constructor(data: Partial<Address> = {}) {
    Object.assign(this, data);
  }
}
