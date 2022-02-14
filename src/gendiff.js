import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import { buildDiffTree } from './diffTree.js';
import pickParser from './parsers.js';
import pickFormater from './formatters/index.js';

const readFile = (filePath) => readFileSync(resolve(cwd(filePath), filePath), 'utf8');

const gendiff = (filepath1, filepath2, formater) => {
  const formaterPicked = pickFormater(formater);

  const parser1 = pickParser(filepath1);
  const parser2 = pickParser(filepath2);

  return formaterPicked(
    buildDiffTree(
      parser1(readFile(filepath1)),
      parser2(readFile(filepath2)),
    ),
  );
};

export default gendiff;
