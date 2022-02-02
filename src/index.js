import * as fs from 'fs';
import path from 'path';
import getDifferences from './diff.js';
import parse from './parsers.js';
import getFormatedOutput from './formatters/index.js';

const getDataOfFile = (filepath) => {
  const normalizedPath = path.resolve(filepath);
  return parse(fs.readFileSync(normalizedPath, 'utf-8'), normalizedPath);
};

export default (filepath1, filepath2, formater = 'stylish') => {
  const object1 = getDataOfFile(filepath1);
  const object2 = getDataOfFile(filepath2);

  const diff = getDifferences(object1, object2);
  return getFormatedOutput(diff, formater);
};
