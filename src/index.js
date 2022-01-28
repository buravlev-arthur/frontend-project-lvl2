import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { areEqual, isObject } from './utils.js';
import parse from './parsers.js';
import toStylish from './stylish.js';

const getDataOfFile = (filepath) => {
  const normalizedPath = path.resolve(filepath);
  return parse(fs.readFileSync(normalizedPath, 'utf-8'), normalizedPath);
};

const getObject = (status, key, value) => ({ status, key, value });

const getDifferences = (object1, object2) => {
  const diff = Object.entries(object1).reduce((acc, [key, value]) => {
    if (!_.has(object2, key)) {
      acc.push(getObject('removed', key, value));
      return acc;
    }

    const value2 = object2[key];

    if (!isObject(value) || !isObject(value2)) {
      if (areEqual(value, value2)) {
        acc.push(getObject('same', key, value));
      } else {
        acc.push(getObject('old', key, value));
        acc.push(getObject('updated', key, value2));
      }

      return acc;
    }

    const childrenDiff = getObject('same', key, getDifferences(value, value2));
    return [...acc, childrenDiff];
  }, []);

  const newProps = Object.entries(object2)
    .filter(([key]) => !_.has(object1, key))
    .map(([key, value]) => getObject('new', key, value));

  const result = [...diff, ...newProps];
  const sortedResult = _.sortBy(result, (prop) => prop.key);
  return sortedResult;
};

export default (filepath1, filepath2, formater = 'stylish') => {
  const object1 = getDataOfFile(filepath1);
  const object2 = getDataOfFile(filepath2);

  const differences = getDifferences(object1, object2);

  switch (formater) {
    case 'stylish': return toStylish(differences);
    default: return differences;
  }
};
