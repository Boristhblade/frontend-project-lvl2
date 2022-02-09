// import { buildDiffTree } from '../src/diffTree.js';
// import stylish from '../src/formatters/stylish.js';
// import { parseJson, parseYml } from '../src/parsers.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import gendiff from '../src/gendiff.js';

const testSheet = [
  ['JSON', 'JSON', readFileSync(resolve(cwd('__fixtures__/answer'), '__fixtures__/answer'), 'utf8'), 'stylish'],
  ['yml', 'yaml', readFileSync(resolve(cwd('__fixtures__/answer'), '__fixtures__/answer'), 'utf8'), 'stylish'],
  ['yml', 'JSON', readFileSync(resolve(cwd('__fixtures__/answer_plain'), '__fixtures__/answer_plain'), 'utf8'), 'plain'],
];

test.each(testSheet)('File formats - %p %p', (a, b, expected, formater) => {
  const beforeFullPath = `${process.cwd()}/__fixtures__/file1.${a}`;
  const afterFullPath = `${process.cwd()}/__fixtures__/file2.${b}`;
  expect(gendiff(beforeFullPath, afterFullPath, formater)).toBe(expected);
});
