import { PathParam } from '@witty-services/ngx-repository';

export class PurchaseQuery {

  @PathParam() // TODO @RMA / @TNI merge with HttpParam behavior
  public clientId: string;

  public constructor(data: Partial<PurchaseQuery> = {}) {
    Object.assign(this, data);
  }
}
