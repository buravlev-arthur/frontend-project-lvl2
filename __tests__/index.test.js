import { expect, test, beforeAll } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const files = {};

beforeAll(() => {
  files.jsonFile1 = getFixturePath('file1.json');
  files.jsonFile2 = getFixturePath('file2.json');
  files.emptyJsonFile = getFixturePath('file3.json');
  files.yamlFile1 = getFixturePath('file1.yaml');
  files.yamlFile2 = getFixturePath('file2.yml');
  files.emptyYamlFile = getFixturePath('file3.yml');
  files.stylishOutput1 = readFile('stylish_result1.txt');
  files.stylishOutput2 = readFile('stylish_result2.txt');
  files.stylishOutput3 = readFile('stylish_result3.txt');
  files.planeOutput = readFile('plane_result.txt');
  files.jsonOutput = readFile('json_result.txt');
});

test('Testing of JSON-files', () => {
  expect(genDiff(files.jsonFile1, files.jsonFile2)).toBe(files.stylishOutput1);
  expect(genDiff(files.jsonFile1, files.jsonFile1)).toBe(files.stylishOutput2);
  expect(genDiff(files.emptyJsonFile, files.emptyJsonFile)).toBe('{}');
  expect(genDiff(files.jsonFile2, files.emptyJsonFile)).toBe(files.stylishOutput3);
});

test('Testing of YAML-files', () => {
  expect(genDiff(files.yamlFile1, files.yamlFile2)).toBe(files.stylishOutput1);
  expect(genDiff(files.yamlFile1, files.yamlFile1)).toBe(files.stylishOutput2);
  expect(genDiff(files.emptyYamlFile, files.emptyYamlFile)).toBe('{}');
  expect(genDiff(files.yamlFile2, files.emptyYamlFile)).toBe(files.stylishOutput3);
});

test('Testing of stylish-formated output', () => {
  expect(genDiff(files.jsonFile1, files.jsonFile2, 'stylish')).toBe(files.stylishOutput1);
  expect(genDiff(files.yamlFile1, files.yamlFile2, 'stylish')).toBe(files.stylishOutput1);
});

test('Testing of plane-formated output', () => {
  expect(genDiff(files.jsonFile1, files.jsonFile2, 'plain')).toBe(files.planeOutput);
  expect(genDiff(files.yamlFile1, files.yamlFile2, 'plain')).toBe(files.planeOutput);
});

test('Testing of json-formated output', () => {
  expect(genDiff(files.jsonFile1, files.jsonFile2, 'json')).toBe(files.jsonOutput);
  expect(genDiff(files.yamlFile1, files.yamlFile2, 'json')).toBe(files.jsonOutput);
});
