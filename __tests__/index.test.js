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

let stylishOutput1;
let stylishOutput2;
let stylishOutput3;

let planeOutput;

let jsonOutput;

beforeAll(() => {
  jsonFile1 = getFixturePath('file1.json');
  jsonFile2 = getFixturePath('file2.json');
  emptyJsonFile = getFixturePath('file3.json');

  yamlFile1 = getFixturePath('file1.yaml');
  yamlFile2 = getFixturePath('file2.yml');
  emptyYamlFile = getFixturePath('file3.yml');

  stylishOutput1 = readFile('stylish_result1.txt');
  stylishOutput2 = readFile('stylish_result2.txt');
  stylishOutput3 = readFile('stylish_result3.txt');

  planeOutput = readFile('plane_result.txt');

  jsonOutput = readFile('json_result.txt');
});

test('Testing of JSON-files', () => {
  expect(genDiff(jsonFile1, jsonFile2)).toBe(stylishOutput1);
  expect(genDiff(jsonFile1, jsonFile1)).toBe(stylishOutput2);
  expect(genDiff(emptyJsonFile, emptyJsonFile)).toBe('{}');
  expect(genDiff(jsonFile2, emptyJsonFile)).toBe(stylishOutput3);
});

test('Testing of YAML-files', () => {
  expect(genDiff(yamlFile1, yamlFile2)).toBe(stylishOutput1);
  expect(genDiff(yamlFile1, yamlFile1)).toBe(stylishOutput2);
  expect(genDiff(emptyYamlFile, emptyYamlFile)).toBe('{}');
  expect(genDiff(yamlFile2, emptyYamlFile)).toBe(stylishOutput3);
});

test('Testing of stylish-formated output', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'stylish')).toBe(stylishOutput1);
  expect(genDiff(yamlFile1, yamlFile2, 'stylish')).toBe(stylishOutput1);
});

test('Testing of plane-formated output', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'plain')).toBe(planeOutput);
  expect(genDiff(yamlFile1, yamlFile2, 'plain')).toBe(planeOutput);
});

test('Testing of json-formated output', () => {
  expect(genDiff(jsonFile1, jsonFile2, 'json')).toBe(jsonOutput);
  expect(genDiff(yamlFile1, yamlFile2, 'json')).toBe(jsonOutput);
});
