import { expect, test, beforeAll } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let jsonFile1;
let jsonFile2;
let emptyJsonFile;
let yamlFile1;
let yamlFile2;
let emptyYamlFile;
let expectedFile1;
let expectedFile2;
let expectedFile3;

beforeAll(() => {
  jsonFile1 = getFixturePath('file1.json');
  jsonFile2 = getFixturePath('file2.json');
  emptyJsonFile = getFixturePath('file3.json');

  yamlFile1 = getFixturePath('file1.yaml');
  yamlFile2 = getFixturePath('file2.yml');
  emptyYamlFile = getFixturePath('file3.yml');

  expectedFile1 = readFile('result1.txt');
  expectedFile2 = readFile('result2.txt');
  expectedFile3 = readFile('result3.txt');
});

test('Testing of JSON-files', () => {
  expect(genDiff(jsonFile1, jsonFile2)).toBe(expectedFile1);
  expect(genDiff(jsonFile1, jsonFile1)).toBe(expectedFile2);
  expect(genDiff(emptyJsonFile, emptyJsonFile)).toBe('{\n}');
  expect(genDiff(jsonFile2, emptyJsonFile)).toBe(expectedFile3);
  expect(genDiff(jsonFile1, expectedFile1)).toBeNull();
});

test('Testing of YAML-files', () => {
  expect(genDiff(yamlFile1, yamlFile2)).toBe(expectedFile1);
  expect(genDiff(yamlFile1, yamlFile1)).toBe(expectedFile2);
  expect(genDiff(emptyYamlFile, emptyYamlFile)).toBe('{\n}');
  expect(genDiff(yamlFile2, emptyYamlFile)).toBe(expectedFile3);
  expect(genDiff(yamlFile1, expectedFile1)).toBeNull();
});
