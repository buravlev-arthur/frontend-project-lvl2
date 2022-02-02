import _ from 'lodash';
import isPrimalType from '../utils.js';

const signs = {
  same: ' ',
  new: '+',
  removed: '-',
  old: '-',
};

const indent = (count) => ' '.repeat(count);

const getChildProps = (data) => {
  if (_.isPlainObject(data)) {
    const status = 'same';
    return Object.entries(data).map(([key, value]) => ({ status, key, value }));
  }
  return data;
};

const getPrefix = (data, key, status) => {
  if (_.isPlainObject(data)) {
    return `${signs[status]} ${key}`;
  }
  return `${indent(2)}${key}`;
};

export default (diffs) => {
  if (diffs.length === 0) {
    return '{}';
  }

  const getPropsAsStrings = (array, i) => array.map(({ status, key, value }) => {
    if (status === 'changed') {
      const { oldValue, newValue } = value;
      const changedValues = [
        { status: 'old', key, value: oldValue },
        { status: 'new', key, value: newValue },
      ];
      return getPropsAsStrings(changedValues, i).join('\n');
    }

    if (isPrimalType(value)) {
      return `${indent(i)}${signs[status]} ${key}: ${value}`;
    }

    const childProps = getChildProps(value);
    const prefix = getPrefix(value, key, status);
    const children = getPropsAsStrings(childProps, i + 4).join('\n');

    return `${indent(i)}${prefix}: {\n${children}\n${indent(i + 2)}}`;
  });

  return `{\n${getPropsAsStrings(diffs, 2).join('\n')}\n}`;
};
