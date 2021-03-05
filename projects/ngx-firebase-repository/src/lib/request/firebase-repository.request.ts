import { Path, PathRequest, RepositoryRequest } from '@witty-services/ngx-repository';
import { FirebaseOperation } from './firebase.operation';

export class FirebaseRepositoryRequest implements RepositoryRequest, PathRequest {

  public constructor(public readonly operation: FirebaseOperation,
                     public readonly path: Path,
                     public readonly body: any) {
  }

  public getPath(): Path {
    return this.path;
  }
}
