const flatten = (array: any[]) => array.reduce((acc, val) => acc.concat(val), []);

export default flatten;
