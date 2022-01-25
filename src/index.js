import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getDataOfFile = (filepath) => {
  const normalizedPath = path.resolve(filepath);
  const fileExists = fs.existsSync(normalizedPath);
  const fileIsJSON = normalizedPath.includes('.json');

  if (fileExists && fileIsJSON) {
    return JSON.parse(fs.readFileSync(normalizedPath));
  }

  throw new Error(`File "${filepath}" doesn't exists or has incorrect extension`);
};

const valuesAreSame = (value1, value2) => value1 === value2;

const getDifferenceOfObjects = (object1, object2) => {
  const entriesOfObject1 = Object.entries(object1);

  const result = entriesOfObject1.reduce((acc, [key, value]) => {
    const newAcc = [...acc];
    const secondObjectHasKey = _.has(object2, key);
    const secondObjectValue = object2[key] ?? null;

    if (secondObjectHasKey && valuesAreSame(value, secondObjectValue)) {
      newAcc.push({ sign: ' ', key, value });
      return newAcc;
    }

    newAcc.push({ sign: '-', key, value });

    if (secondObjectHasKey) {
      newAcc.push({ sign: '+', key, value: secondObjectValue });
    }

    return newAcc;
  }, []);

  return result;
};

const getRestOfObject = (object1, object2) => {
  const entriesOfObject2 = Object.entries(object2);

  const result = entriesOfObject2.reduce((acc, [key, value]) => {
    const newAcc = [...acc];

    if (!_.has(object1, key)) {
      newAcc.push({ sign: '+', key, value });
    }

    return newAcc;
  }, []);

  return result;
};

export default (filepath1, filepath2) => {
  const object1 = getDataOfFile(filepath1);
  const object2 = getDataOfFile(filepath2);

  const diffsOfProps = [
    ...getDifferenceOfObjects(object1, object2),
    ...getRestOfObject(object1, object2),
  ];
  const sortedDiffsOfProps = _.sortBy(diffsOfProps, (prop) => prop.key);
  const diffsOfPropsStrs = sortedDiffsOfProps.map(({ sign, key, value }) => ` ${sign} ${key}: ${value}`);

  return ['{', ...diffsOfPropsStrs, '}'].join('\n');
};
