export const flattenDeep = (arr: any[]) => Array.isArray(arr)
  ? arr.reduce((a: any, b: any) => a.concat(flattenDeep(b)), [])
  : [arr];
