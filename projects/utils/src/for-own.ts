const forOwn = (object: { [key: string]: any }, iteratee: (value: any, key: string, object: { [key: string]: any }) => void) => {
  if (object && typeof object === 'object') {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        iteratee(object[key], key, object);
      }
    }
  }
};

export default forOwn;
