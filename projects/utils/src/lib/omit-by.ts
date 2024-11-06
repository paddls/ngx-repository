export const omitBy = (obj: { [s: string]: unknown; } | any, check: Function) => {
  Object.entries(obj).forEach(([key, value]) => check(value) && delete obj[key]);

  return obj;
};
