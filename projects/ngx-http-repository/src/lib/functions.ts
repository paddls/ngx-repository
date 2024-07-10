export const get = (obj: unknown, path: string, defValue?: undefined) => {
  if (!path) return undefined;
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result = pathArray.reduce(
    (prevObj, key) => prevObj && prevObj[key],
    obj as any
  );

  return result === undefined ? defValue : result;
};

export const mergeDeep = (target, source) => {
  const output = Object.assign({}, target);

  Object.keys(source).forEach(key => {
    if (isObject(source[key]) && isObject(target[key])) {
      output[key] = mergeDeep(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  });

  return output;
};

export const flatten = <T>(array: T[][]): T[] => array.reduce((acc, val) => acc.concat(val), []);

export const flattenDeep = <T>(array: any[]): T[] => array.reduce(
  (acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
  [] as T[]
);

export const omit = (obj: { [x: string]: any; }, props: (string | number)[]) => {
  obj = {...obj};
  props.forEach((prop: string | number) => delete obj[prop]);

  return obj;
};

export function pick(object: unknown, keys: any[]) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }

    return obj;
  }, {});
}

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

export const isObject = (a: any): a is object => a instanceof Object;

export const isFunction = (val: any): val is Function => typeof val === 'function';

export const valuesIn = <T extends object>(object: T): T[keyof T][] => {
  const result: T[keyof T][] = [];
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      result.push(object[key]);
    }
  }

  return result;
};
