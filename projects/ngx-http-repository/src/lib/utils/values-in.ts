export const valuesIn = (object: { [key: string]: any }): any[] => {
  const result: any[] = [];
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      result.push(object[key]);
    }
  }

  return result;
};
