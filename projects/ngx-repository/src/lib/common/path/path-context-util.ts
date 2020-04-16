import {PathContext} from './path-context';
import {cloneDeep} from 'lodash';

export class PathContextUtil {

  public static getReadPath(pathContext: PathContext): string {
    if (pathContext.read) {
      return cloneDeep(pathContext.read);
    } else if (pathContext.path) {
      return cloneDeep(pathContext.path);
    } else {
      throw new Error('You must define one path to read data');
    }
  }

  public static getCreatePath(pathContext: PathContext): string {
    if (pathContext.create) {
      return cloneDeep(pathContext.create);
    } else if (pathContext.write) {
      return cloneDeep(pathContext.write);
    }  else if (pathContext.path) {
      return cloneDeep(pathContext.path);
    } else {
      throw new Error('You must define one path to create data');
    }
  }

  public static getUpdatePath(pathContext: PathContext): string {
    if (pathContext.update) {
      return cloneDeep(pathContext.update);
    } else if (pathContext.write) {
      return cloneDeep(pathContext.write);
    }  else if (pathContext.path) {
      return cloneDeep(pathContext.path);
    } else {
      throw new Error('You must define one path to update data');
    }
  }

  public static getDeletePath(pathContext: PathContext): string {
    if (pathContext.delete) {
      return cloneDeep(pathContext.delete);
    } else if (pathContext.write) {
      return cloneDeep(pathContext.write);
    }  else if (pathContext.path) {
      return cloneDeep(pathContext.path);
    } else {
      throw new Error('You must define one path to delete data');
    }
  }
}
