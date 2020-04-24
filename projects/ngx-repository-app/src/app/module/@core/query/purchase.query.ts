import {PathParam} from '@witty-services/ngx-repository';

export class PurchaseQuery {

  @PathParam()
  public clientId: string;

  public constructor(data: Partial<PurchaseQuery> = {}) {
    Object.assign(this, data);
  }
}
