import {PathContext} from './path-context';

/**
 * @ignore
 */
export class PathContextUtil {

  public static getReadPath(pathContext: PathContext): string {
    if (pathContext.read) {
      return pathContext.read;
    } else if (pathContext.path) {
      return pathContext.path;
    } else {
      throw new Error('You must define one path to read data');
    }
  }

  public static getCreatePath(pathContext: PathContext): string {
    if (pathContext.create) {
      if (pathContext.create instanceof Object) {
        return pathContext.create[`path`];
      } else {
        return pathContext.create;
      }
    } else if (pathContext.write) {
      return pathContext.write;
    }  else if (pathContext.path) {
      return pathContext.path;
    } else {
      throw new Error('You must define one path to create data');
    }
  }

  public static getUpdatePath(pathContext: PathContext): string {
    if (pathContext.update) {
      return pathContext.update;
    } else if (pathContext.write) {
      return pathContext.write;
    }  else if (pathContext.path) {
      return pathContext.path;
    } else {
      throw new Error('You must define one path to update data');
    }
  }

  public static getDeletePath(pathContext: PathContext): string {
    if (pathContext.delete) {
      return pathContext.delete;
    } else if (pathContext.write) {
      return pathContext.write;
    }  else if (pathContext.path) {
      return pathContext.path;
    } else {
      throw new Error('You must define one path to delete data');
    }
  }
}
