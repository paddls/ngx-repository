export function pick(object: { [key: string]: any }, keys: string[]): { [key: string]: any } {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }

    return obj;
  }, {} as { [key: string]: any });
}

export default pick;
