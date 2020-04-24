import {PathRequest} from '../query-builder/path.request';

export class HttpRequest<K> extends PathRequest<K> {

  public headers: { [key: string]: string|string[] } = {};

  public queryParams: { [key: string]: string|string[] } = {};

  public constructor(data: Partial<HttpRequest<K>> = {}) {
    super(data);

    Object.assign(this, data);
  }
}
