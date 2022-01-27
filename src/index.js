import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getDataOfFile = (filepath) => {
  const normalizedPath = path.resolve(filepath);
  const fileExists = fs.existsSync(normalizedPath);
  const fileIsJSON = normalizedPath.includes('.json');

  if (fileExists && fileIsJSON) {
    return JSON.parse(fs.readFileSync(normalizedPath, 'utf-8'));
  }

  throw new Error(`File "${filepath}" doesn't exists or has incorrect extension`);
};

const areSame = (value1, value2) => value1 === value2;

const sameValues = (object, key, value) => _.has(object, key) && areSame(value, object[key]);

const differentValues = (object, key, value) => _.has(object, key) && !areSame(value, object[key]);

const getObject = (sign, key, value) => ({ sign, key, value });

const getKeysWithSameValues = (object1, object2) => Object.entries(object1)
  .filter(([key, value]) => sameValues(object2, key, value))
  .map(([key, value]) => getObject(' ', key, value));

const getKeysWithDifferentValues = (object1, object2) => Object.entries(object1)
  .filter(([key, value]) => differentValues(object2, key, value))
  .map(([key, value]) => [
    getObject('-', key, value),
    getObject('+', key, object2[key]),
  ]);

const getRestOfFirstObject = (object1, object2) => Object.entries(object1)
  .filter(([key]) => !_.has(object2, key))
  .map(([key, value]) => getObject('-', key, value));

const getRestOfSecondObject = (object1, object2) => Object.entries(object2)
  .filter(([key]) => !_.has(object1, key))
  .map(([key, value]) => getObject('+', key, value));

const getDifferences = (object1, object2) => [
  ...getKeysWithSameValues(object1, object2),
  ...getKeysWithDifferentValues(object1, object2),
  ...getRestOfFirstObject(object1, object2),
  ...getRestOfSecondObject(object1, object2),
].flat();

export default (filepath1, filepath2) => {
  const object1 = getDataOfFile(filepath1);
  const object2 = getDataOfFile(filepath2);

  const differences = getDifferences(object1, object2);
  const sortedDifferences = _.sortBy(differences, (prop) => prop.key);
  const differencesAsStrings = sortedDifferences.map(({ sign, key, value }) => ` ${sign} ${key}: ${value}`);

  return ['{', ...differencesAsStrings, '}'].join('\n');
};
