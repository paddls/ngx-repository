export const set = (obj: { [key: string]: any }, path: string | string[], value: any): void => {
  const pathArray: string[] = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  if (pathArray === null) {
    return;
  }

  pathArray.reduce((acc: { [key: string]: any }, key: string, i: number) => {
    if (acc[key] === undefined) acc[key] = {};
    if (i === pathArray.length - 1) acc[key] = value;

    return acc[key];
  }, obj);
};
