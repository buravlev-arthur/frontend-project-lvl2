import { isObject, isPrimalType } from './utils.js';

const signs = {
  same: ' ',
  new: '+',
  removed: '-',
  old: '-',
  updated: '+',
};

const indent = (count) => ' '.repeat(count);

const getChild = (data) => {
  if (isObject(data)) {
    const status = 'same';
    return Object.entries(data).map(([key, value]) => ({ status, key, value }));
  }
  return data;
};

const getPrefix = (data, key, status) => {
  if (isObject(data)) {
    return `${signs[status]} ${key}`;
  }
  return `${indent(2)}${key}`;
};

export default (diffs) => {
  const getPropsAsString = (object, i) => object.reduce((str, { status, key, value }) => {
    if (isPrimalType(value)) {
      const propStr = `${indent(i)}${signs[status]} ${key}: ${value}\n`;
      return str.concat(propStr);
    }

    const child = getChild(value);
    const prefix = getPrefix(value, key, status);
    const propsStrs = getPropsAsString(child, i + 4);

    const children = `${indent(i)}${prefix}: {\n${propsStrs}${indent(i + 2)}}\n`;
    return str.concat(children);
  }, '');

  return `{\n${getPropsAsString(diffs, 2)}}`;
};
