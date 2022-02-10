import { Path, PathRequest, RepositoryRequest } from '@paddls/ngx-repository';
import { FirestoreOperation } from './firestore.operation';

export class FirestoreRepositoryRequest implements RepositoryRequest, PathRequest {

  public constructor(public readonly operation: FirestoreOperation,
                     public readonly path: Path,
                     public readonly body: any) {
  }

  public getPath(): Path {
    return this.path;
  }
}
