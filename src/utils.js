const areEqual = (value1, value2) => value1 === value2;

const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]';

const isArray = (data) => Array.isArray(data);

const isPrimalType = (data) => !isObject(data) && !isArray(data);

export {
  areEqual,
  isObject,
  isArray,
  isPrimalType,
};
