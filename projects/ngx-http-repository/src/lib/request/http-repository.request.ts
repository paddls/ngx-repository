import { Path, PathRequest, RepositoryRequest } from '@paddls/ngx-repository';
import { HttpParams } from '@angular/common/http';

export class HttpRepositoryRequest implements RepositoryRequest, PathRequest {

  public constructor(public readonly method: string,
                     public readonly body: any,
                     public readonly path: Path,
                     public readonly headers: { [key: string]: string|string[] } = {},
                     public readonly queryParams: HttpParams = new HttpParams()) {
  }

  public getPath(): Path {
    return this.path;
  }
}
