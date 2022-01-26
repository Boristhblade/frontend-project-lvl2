import { readFileSync } from 'fs';
import _ from 'lodash';
import { cwd } from 'process';
import { resolve } from 'path';

const parseFile = (filePath) => JSON
  .parse(readFileSync(resolve(cwd(filePath), filePath), 'utf8'));

const buildDiffString = (file1, file2) => {
  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);
  const allKeys = _.union(file1Keys, file2Keys).sort();
  const result = allKeys.reduce((acc, key) => {
    if (!file1Keys.includes(key)) {
      acc.push(`  + ${key}: ${file2[key]}\n`);
      return acc;
    }
    if (!file2Keys.includes(key)) {
      acc.push(`  - ${key}: ${file1[key]}\n`);
      return acc;
    }
    if (file1[key] === file2[key]) {
      acc.push(`    ${key}: ${file1[key]}\n`);
      return acc;
    }
    acc.push(`  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`);
    return acc;
  }, ['{\n']);
  console.log(`${result.join('')}}`);
  return `${result.join('')}}`;
};

const gendiff = (filepath1, filepath2) => buildDiffString(
  parseFile(filepath1),
  parseFile(filepath2),
);

export { gendiff, buildDiffString, parseFile };
