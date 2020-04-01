import {Column} from '@witty-services/repository-core';

export class Address {

  @Column()
  public address: string;

  @Column()
  public postCode: number;

  @Column()
  public city: string;
}
