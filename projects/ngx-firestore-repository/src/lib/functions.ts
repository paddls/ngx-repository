import { FirestoreRepositoryRequest } from '../public-api';

export const get = (obj: unknown, path: string, defValue?: undefined) => {
  if (!path) return undefined;
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result = pathArray.reduce(
    (prevObj, key) => prevObj && prevObj[key],
    obj as any
  );

  return result === undefined ? defValue : result;
};


export const omit = (obj: { [x: string]: any; }, props: (string | number)[]) => {
  obj = {...obj};
  props.forEach((prop: string | number) => delete obj[prop]);

  return obj;
};

export const omitBy = (obj: { [s: string]: unknown; } | ArrayLike<unknown> | FirestoreRepositoryRequest, check: Function) => {
  obj = { ...obj };
  Object.entries(obj).forEach(([key, value]) => check(value) && delete obj[key]);

  return obj;
};

export const set = (obj: unknown, path: string | string[], value: any) => {
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  pathArray.reduce((acc, key, i) => {
    if (acc[key] === undefined) acc[key] = {};
    if (i === pathArray.length - 1) acc[key] = value;

    return acc[key];
  }, obj as any);
};

export const isString = (a: any): a is string => typeof a === 'string';

export const isUndefined = (val: any): val is undefined => val === undefined;

export const forOwn = <T extends object>(object: T, iteratee: (value: T[keyof T], key: keyof T, object: T) => void): void => {
  if (object && typeof object === 'object') {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        iteratee(object[key], key, object);
      }
    }
  }
};
