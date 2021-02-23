import { isNullOrUndefined } from 'util';
import { RepositoryRequest } from './repository.request';

/**
 * @ignore
 */
export class PathRequest<K> implements RepositoryRequest {

  public id: K;

  public constructor(public readonly path: string,
                     public readonly pathParams: any = {}) {
  }

  /**
   * @deprecated
   */
  public get readPath(): string {
    // return this.replaceParams(cloneDeep(PathContextUtil.getReadPath(this.paths)));
    throw new Error();
  }

  /**
   * @deprecated
   */
  public get createPath(): string {
    throw new Error();
  }

  /**
   * @deprecated
   */
  public get updatePath(): string {
    throw new Error();
  }

  /**
   * @deprecated
   */
  public get deletePath(): string {
    throw new Error();
  }

  public getPath(): string {
    let path: string = this.path;
    Object.keys(this.pathParams).forEach((key: string) => path = path.replace(key, this.pathParams[key]));

    if (!isNullOrUndefined(this.id)) {
      path += `/${this.id}`;
    }

    return path;
  }
}
