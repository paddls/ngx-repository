import {Request} from './request';
import {PathContextUtil} from '../common/path/path-context-util';
import {PathContext} from '../common/path/path-context';
import {cloneDeep} from 'lodash';
import {isNullOrUndefined} from 'util';

/**
 * @ignore
 */
export class PathRequest<K> extends Request {

  public id: K;

  public pathParams: {[key: string]: string};

  public paths: PathContext;

  public constructor(data: Partial<PathRequest<K>> = {}) {
    super();

    Object.assign(this, data);
  }

  protected replaceParams(path: string): string {
    Object.keys(this.pathParams).forEach((key: string) => path = path.replace(key, this.pathParams[key]));

    if (!isNullOrUndefined(this.id)) {
      path += `/${this.id}`;
    }

    return path;
  }

  public get readPath(): string {
    return this.replaceParams(cloneDeep(PathContextUtil.getReadPath(this.paths)));
  }

  public get createPath(): string {
    return this.replaceParams(cloneDeep(PathContextUtil.getCreatePath(this.paths)));
  }

  public get updatePath(): string {
    return this.replaceParams(cloneDeep(PathContextUtil.getUpdatePath(this.paths)));
  }

  public get deletePath(): string {
    return this.replaceParams(cloneDeep(PathContextUtil.getDeletePath(this.paths)));
  }
}
