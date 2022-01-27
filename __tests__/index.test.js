import { expect, test, beforeAll } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let file1;
let file2;
let file3;
let expectedFile1;
let expectedFile2;
let expectedFile3;

beforeAll(() => {
  file1 = getFixturePath('file1.json');
  file2 = getFixturePath('file2.json');
  file3 = getFixturePath('file3.json');
  expectedFile1 = readFile('result1.txt');
  expectedFile2 = readFile('result2.txt');
  expectedFile3 = readFile('result3.txt');
});

test('genDiff', () => {
  expect(genDiff(file1, file2)).toBe(expectedFile1);
  expect(genDiff(file1, file1)).toBe(expectedFile2);
  expect(genDiff(file3, file3)).toBe('{\n}');
  expect(genDiff(file2, file3)).toBe(expectedFile3);
  expect(genDiff(file1, expectedFile1)).toBeNull();
});
