import isPrimalType from '../utils.js';

const signs = {
  same: ' ',
  new: '+',
  removed: '-',
  old: '-',
  haveChildren: ' ',
};

const stringify = (data, depth = 0) => {
  if (isPrimalType(data)) {
    return String(data);
  }

  const repeater = ' ';

  const getProps = (props, i) => Object.entries(props).map(([key, value]) => {
    const indent = repeater.repeat(i * 4 + depth * 4);

    if (isPrimalType(value) || value === null) {
      return `${indent}${key}: ${value}`;
    }

    return `${indent}${key}: {\n${getProps(value, i + 1)}\n${indent}}`;
  }).join('\n');

  const braceIndent = repeater.repeat(depth * 4 + 4);
  return `{\n${getProps(data, 2)}\n${braceIndent}}`;
};

export default (diffs) => {
  if (diffs.length === 0) {
    return '{}';
  }

  const getPropsAsStrings = (array, depth) => array.flatMap((prop) => {
    const keyIndent = ' '.repeat(depth * 4 + 2);
    const braceIndent = ' '.repeat(depth * 4 + 4);
    const defaultPrefix = `${keyIndent}${signs[prop.status]} ${prop.key}`;

    switch (prop.status) {
      case 'new': return `${defaultPrefix}: ${stringify(prop.value, depth)}`;
      case 'removed': return `${defaultPrefix}: ${stringify(prop.value, depth)}`;
      case 'same': return `${defaultPrefix}: ${stringify(prop.value, depth)}`;
      case 'changed': return [
        `${keyIndent}${signs.old} ${prop.key}: ${stringify(prop.oldValue, depth)}`,
        `${keyIndent}${signs.new} ${prop.key}: ${stringify(prop.newValue, depth)}`,
      ];
      case 'haveChildren': {
        const children = getPropsAsStrings(prop.children, depth + 1);
        return `${defaultPrefix}: {\n${children}\n${braceIndent}}`;
      }
      default: throw new Error(`Stylish formatter has gotten wrong status: "${prop.status}"`);
    }
  }).join('\n');

  return `{\n${getPropsAsStrings(diffs, 0)}\n}`;
};
