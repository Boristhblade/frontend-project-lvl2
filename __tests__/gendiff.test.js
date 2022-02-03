import { gendiff, buildDiffTree, parseFile } from '../src/gendiff.js';
import formater from '../src/stylish.js';

const answer = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('buildDiffTree', () => {
  const file1json = parseFile('__fixtures__/file1.JSON');
  const file2json = parseFile('__fixtures__/file2.JSON');
  expect(formater(buildDiffTree(file1json, file2json))).toBe(answer);
  expect(buildDiffTree({ a: 1 }, { a: 1 })).toEqual({ key: 'a', value: 1, prefix: ' ' });
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
  expect(formater(gendiff('__fixtures__/file1.JSON', '__fixtures__/file2.JSON'))).toBe(answer);
  expect(formater(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yaml'))).toBe(answer);
  expect(formater(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.JSON'))).toBe(answer);
});
