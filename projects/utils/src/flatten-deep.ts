const flattenDeep = (arr: any[]) => Array.isArray(arr)
  ? arr.reduce( (a, b) => a.concat(flattenDeep(b)) , [])
  : [arr];

export default flattenDeep;
