import {PathRequest} from '@witty-services/ngx-repository';
import {HttpParams} from '@angular/common/http';

/**
 * @ignore
 */
export class HttpRequest<K> extends PathRequest<K> {

  public headers: { [key: string]: string|string[] } = {};

  public queryParams: HttpParams = new HttpParams();

  public constructor(data: Partial<HttpRequest<K>> = {}) {
    super(data);

    Object.assign(this, data);
  }
}
