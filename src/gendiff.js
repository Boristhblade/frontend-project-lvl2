import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import { buildDiffTree } from './diffTree.js';
import { parseJson, parseYml } from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const gendiff = (filepath1, filepath2, formater) => {
  const pickFormater = (formaterName) => {
    switch (formaterName) {
      case 'plain':
        return plain;
      case 'json':
        return json;
      default:
        return stylish;
    }
  };
  const formaterPicked = pickFormater(formater);
  const readFile = (filePath) => readFileSync(resolve(cwd(filePath), filePath), 'utf8');

  const pickParser = (filePath) => {
    const extension = _.last(filePath.split('.')).toLowerCase();
    if (extension === 'json') {
      return parseJson;
    }
    if (extension === 'yml' || extension === 'yaml') {
      return parseYml;
    }
    return console.error('Unknown file extension');
  };
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
