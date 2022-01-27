import { gendiff, buildDiffString, parseFile } from '../src/gendiff.js';

const answer = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
const testJson1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const testJson2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('buildDiffString', () => {
  expect(buildDiffString(testJson1, testJson2)).toBe(answer);
  expect(buildDiffString({}, {})).toBe('{\n}');
  expect(buildDiffString({ a: 1 }, { a: 1 })).toBe('{\n    a: 1\n}');
});

test('parseFile', () => {
  expect(parseFile('__fixtures__/file2.JSON')).toEqual({
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  });
  expect(parseFile('__fixtures__/file2.yaml')).toEqual({
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  });
});

test('gendiff', () => {
  expect(gendiff('__fixtures__/file1.JSON', '__fixtures__/file2.JSON')).toBe(answer);
  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yaml')).toBe(answer);
  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.JSON')).toBe(answer);
});
