import { expect, test } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const emptyJsonFile = getFixturePath('file3.json');
const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yml');
const emptyYamlFile = getFixturePath('file3.yml');
const stylishOutput1 = readFile('stylish_result1.txt');
const stylishOutput2 = readFile('stylish_result2.txt');
const stylishOutput3 = readFile('stylish_result3.txt');
const planeOutput = readFile('plane_result.txt');
const jsonOutput = readFile('json_result.txt');

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
