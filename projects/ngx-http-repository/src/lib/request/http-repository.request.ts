import { Path, RepositoryRequest } from '@witty-services/ngx-repository';
import { HttpParams } from '@angular/common/http';

export class HttpRepositoryRequest implements RepositoryRequest {

  public constructor(public readonly method: string,
                     public readonly body: any,
                     public readonly path: Path,
                     public readonly headers: { [key: string]: string|string[] } = {},
                     public readonly queryParams: HttpParams = new HttpParams()) {
  }
}
