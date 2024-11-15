export const get = (obj: unknown, path: string, defValue?: any) => {
  if (!path) return undefined;
  const pathArray: any = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result = pathArray.reduce(
    (prevObj: any, key: any) => prevObj && prevObj[key],
    obj as any
  );

  return result === undefined ? defValue : result;
};
