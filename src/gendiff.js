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

  const extension1 = getExtension(filepath1);
  const extension2 = getExtension(filepath2);

  return formaterPicked(
    buildDiffTree(
      pickParser(readFile(filepath1), extension1),
      pickParser(readFile(filepath2), extension2),
    ),
  );
};

export default gendiff;
