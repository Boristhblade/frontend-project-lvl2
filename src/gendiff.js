import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import { buildDiffTree } from './diffTree.js';
import pickParser from './parsers.js';
import pickFormater from './formatters/index.js';

const readFile = (filePath) => readFileSync(resolve(cwd(filePath), filePath), 'utf8');

const getExtension = (filePath) => _.last(filePath.split('.')).toLowerCase();

const gendiff = (filepath1, filepath2, formater) => {
  const formaterPicked = pickFormater(formater);

  const parser1 = pickParser(getExtension(filepath1));
  const parser2 = pickParser(getExtension(filepath2));

  return formaterPicked(
    buildDiffTree(
      parser1(readFile(filepath1)),
      parser2(readFile(filepath2)),
    ),
  );
};

export default gendiff;
