export const pick = (object: { [key: string]: any }, keys: string[]) => keys.reduce((obj: any, key: string) => {
  if (object && Object.prototype.hasOwnProperty.call(object, key)) {
    obj[key] = object[key];
  }

  return obj;
}, {} as { [key: string]: any });
