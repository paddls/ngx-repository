import { ID_METADATA_KEY } from '../decorator/id.decorator';

export function getIdFromObject(object: any): any {
  if (object != null) {
    const idKey: string = Reflect.getMetadata(ID_METADATA_KEY, object);
    const id: string = object[idKey];

    return id || null;
  }

  return null;
}

export const get = (obj: any, path: string, defValue?: any) => {
  if (!path) return undefined;
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result = pathArray.reduce(
    (prevObj, key) => prevObj && prevObj[key],
    obj
  );

  return result === undefined ? defValue : result;
};


export const flatten = <T>(array: T[][]): T[] => array.reduce((acc, val) => acc.concat(val), []);

export const flattenDeep = <T>(array: any[]): T[] => array.reduce(
  (acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
  [] as T[]
);


export const isString = (a: any): a is string => typeof a === 'string';

export const isUndefined = (val: any): val is undefined => val === undefined;

export const isObject = (a: any): a is object => a instanceof Object;

export const isFunction = (val: any): val is Function => typeof val === 'function';
