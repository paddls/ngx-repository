import {PathRequest} from '@witty-services/ngx-repository';

/**
 * @ignore
 */
export class HttpRequest<K> extends PathRequest<K> {

  public headers: { [key: string]: string|string[] } = {};

  public queryParams: { [key: string]: string|string[] } = {};

  public constructor(data: Partial<HttpRequest<K>> = {}) {
    super(data);

    Object.assign(this, data);
  }
}
