import isObject from './is-object';

const mergeDeep = (target: { [x: string]: any; }, source: { [x: string]: any; }) => {
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

export default mergeDeep;
