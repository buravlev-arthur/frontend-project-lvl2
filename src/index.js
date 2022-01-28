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
  const keys = _.union(Object.keys(object1), Object.keys(object2));

  const result = keys.map((key) => {
    if (!_.has(object2, key)) {
      return getObject('removed', key, object1[key]);
    }

    if (!_.has(object1, key)) {
      return getObject('new', key, object2[key]);
    }

    if (areEqual(object1[key], object2[key])) {
      return getObject('same', key, object1[key]);
    }

    if (!isObject(object1[key]) || !isObject(object2[key])) {
      return getObject('changed', key, { oldValue: object1[key], newValue: object2[key] });
    }

    return getObject('same', key, getDifferences(object1[key], object2[key]));
  });

  return _.sortBy(result, (prop) => prop.key);
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
