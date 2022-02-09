import isPrimalType from '../utils.js';

const signs = {
  same: ' ',
  new: '+',
  removed: '-',
  old: '-',
  haveChildren: ' ',
};

const indent = (count) => ' '.repeat(count);

const formatObjectValue = (prop, startAcc) => {
  const getProps = (object, acc) => Object.entries(object).map(([key, value]) => {
    const i = acc * 4 + 8;

    if (isPrimalType(value)) {
      return `${indent(i)}${key}: ${value}`;
    }

    return `${indent(i)}${key}: {\n${getProps(value, acc + 1)}\n${indent(i)}}`;
  }).join('\n');

  return `{\n${getProps(prop, startAcc)}\n${indent(startAcc * 4 + 4)}}`;
};

const formatSingleValue = ({ status, key, value }, acc) => {
  const i = acc * 4 + 2;

  if (isPrimalType(value)) {
    return `${indent(i)}${signs[status]} ${key}: ${value}`;
  }

  return `${indent(i)}${signs[status]} ${key}: ${formatObjectValue(value, acc)}`;
};

const formatChangedValues = ({ key, oldValue, newValue }, acc) => [
  formatSingleValue({ status: 'old', key, value: oldValue }, acc),
  formatSingleValue({ status: 'new', key, value: newValue }, acc),
];

export default (diffs) => {
  if (diffs.length === 0) {
    return '{}';
  }

  const getPropsAsStrings = (array, acc) => array.flatMap((prop) => {
    switch (prop.status) {
      case 'changed': return formatChangedValues(prop, acc);
      case 'haveChildren': {
        const children = getPropsAsStrings(prop.children, acc + 1);
        return `${indent(acc * 4 + 2)}${signs[prop.status]} ${prop.key}: {\n${children}\n${indent(acc * 4 + 4)}}`;
      }
      default: return formatSingleValue(prop, acc);
    }
  }).join('\n');

  return `{\n${getPropsAsStrings(diffs, 0)}\n}`;
};
