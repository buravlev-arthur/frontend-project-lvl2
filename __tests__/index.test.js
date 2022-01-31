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
const plainOutput = readFile('plane_result.txt');
const jsonOutput = readFile('json_result.txt');

test.each([
  ['JSON', jsonFile1, jsonFile2, stylishOutput1],
  ['JSON', jsonFile1, jsonFile1, stylishOutput2],
  ['JSON', emptyJsonFile, emptyJsonFile, '{}'],
  ['JSON', jsonFile2, emptyJsonFile, stylishOutput3],
  ['YAML', yamlFile1, yamlFile2, stylishOutput1],
  ['YAML', yamlFile1, yamlFile1, stylishOutput2],
  ['YAML', emptyYamlFile, emptyYamlFile, '{}'],
  ['YAML', yamlFile2, emptyYamlFile, stylishOutput3],
])('Testing of %s-files', (type, file1, file2, expected) => {
  expect(genDiff(file1, file2)).toBe(expected);
});

test.each([
  ['stylish', jsonFile1, yamlFile2, stylishOutput1],
  ['plain', yamlFile1, jsonFile2, plainOutput],
  ['json', jsonFile1, yamlFile2, jsonOutput],
])('Testing of "%s" format', (format, file1, file2, expected) => {
  expect(genDiff(file1, file2, format)).toBe(expected);
});
