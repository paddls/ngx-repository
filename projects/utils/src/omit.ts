const omit = (obj: { [x: string]: any; }, props: (string | number)[]) => {
  obj = {...obj};
  props.forEach((prop: string | number) => delete obj[prop]);

  return obj;
};

export default omit;
