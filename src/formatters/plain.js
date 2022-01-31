import _ from 'lodash';
import { isObject, isPrimalType } from '../utils.js';

const getFormatedValue = (value) => {
  if (isPrimalType(value)) {
    return typeof value === 'string' ? `'${value}'` : value;
  }

  if (isObject(value) && _.has(value, ['oldValue'])) {
    return {
      oldValue: getFormatedValue(value.oldValue),
      newValue: getFormatedValue(value.newValue),
    };
  }

  return '[complex value]';
};

export default (diff) => {
  const getPropsAsStrings = (array, path) => array.flatMap(({ status, key, value }) => {
    const name = path.length > 0 ? `${path}.${key}` : key;
    const formatedValue = getFormatedValue(value);

    switch (status) {
      case 'new': return `Property '${name}' was added with value: ${formatedValue}`;
      case 'removed': return `Property '${name}' was removed`;
      case 'changed': return `Property '${name}' was updated. From ${formatedValue.oldValue} to ${formatedValue.newValue}`;
      case 'haveChildren': return getPropsAsStrings(value, name);
      default: return [];
    }
  });

  return getPropsAsStrings(diff, '').join('\n');
};
