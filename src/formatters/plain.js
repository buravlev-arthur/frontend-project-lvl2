// import _ from 'lodash';
import isPrimalType from '../utils.js';

const getFormatedValue = (value) => {
  if (isPrimalType(value)) {
    return typeof value === 'string' ? `'${value}'` : value;
  }

  return '[complex value]';
};

export default (diff) => {
  const getPropsAsStrings = (array, path) => array.flatMap((prop) => {
    const name = path.length > 0 ? `${path}.${prop.key}` : prop.key;

    switch (prop.status) {
      case 'new': return `Property '${name}' was added with value: ${getFormatedValue(prop.value)}`;
      case 'removed': return `Property '${name}' was removed`;
      case 'changed': return `Property '${name}' was updated. From ${getFormatedValue(prop.oldValue)} to ${getFormatedValue(prop.newValue)}`;
      case 'haveChildren': return getPropsAsStrings(prop.children, name);
      case 'same': return [];
      default: throw new Error(`Plain formatter has gotten wrong status: "${prop.status}"`);
    }
  });

  return getPropsAsStrings(diff, '').join('\n');
};
