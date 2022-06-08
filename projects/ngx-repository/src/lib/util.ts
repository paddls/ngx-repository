export function get(obj: any, path: string|string[], defValue?: any): any {
  if (!path) {
    return undefined;
  }

  const pathArray: string[] = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result: any = pathArray.reduce(
    (prevObj: string, key: string) => prevObj && prevObj[key],
    obj
  );

  return result === undefined ? defValue : result;
}

export function set(obj: any, path: string|string[], value: any): void {
  const pathArray: string[] = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  pathArray.reduce((acc: string, key: string, i: number) => {
    if (acc[key] === undefined) {
      acc[key] = {};
    }

    if (i === pathArray.length - 1) {
      acc[key] = value;
    }

    return acc[key];
  }, obj);
}

export function isFunction(value: any): boolean {
  return typeof value === 'function';
}

export function isObject(value: any): boolean {
  return value instanceof Object;
}

export function isString(str: any): boolean{
  return str != null && typeof str.valueOf() === 'string';
}

export function isUndefined(value: any): boolean {
  return typeof value === 'undefined' || value === undefined;
}

export function forOwn(object: any, iteratee: (value: any, key: string, object: any) => boolean|void): void {
  const obj = Object(object);
  Object.keys(obj).forEach((key: string) => iteratee(obj[key], key, obj));
}

export function omit(originalObj: any, props: string[]): any {
  const obj: any = { ...originalObj };
  props.forEach((key: string) => delete obj[key]);

  return obj;
}

export function omitBy(originalObj: any, predicate: (value: any, key: string) => boolean): any {
  const obj: any = { ...originalObj };
  Object.keys(obj)
    .filter((key: string) => predicate(obj[key], key))
    .forEach((key: string) => delete obj[key]);

  return obj;
}

export function pick(object: any, keys: string[]): any {
  return keys.reduce((obj: any, key: string) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }

    return obj;
  }, {});
}

export function valuesIn(object): any[] {
  if (!object) {
    return [];
  }

  const keys: string[] = [];
  for (const key in object) {
    keys.push(key);
  }

  return keys.map((key: string) => object[key]);
}
