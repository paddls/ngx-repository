import { PathParam } from '../../../../../../ngx-repository/src/lib/driver/firebase/decorator/path-param.decorator';

export class PurchaseQuery {

  @PathParam() // TODO @RMA merge with HttpParam behavior
  public clientId: string;

  public constructor(data: Partial<PurchaseQuery> = {}) {
    Object.assign(this, data);
  }
}
