import { Path, RepositoryRequest } from '@witty-services/ngx-repository';
import { FirebaseOperation } from './firebase.operation';

export class FirebaseRepositoryRequest implements RepositoryRequest {

  public constructor(public readonly operation: FirebaseOperation,
                     public readonly path: Path,
                     public readonly body: any) {
  }
}
