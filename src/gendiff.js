import { buildDiffTree } from './diffTree.js';
import parseFile from './parsers.js';
import stylish from './formatters/stylish.js';

const gendiff = (filepath1, filepath2, formater = stylish) => formater(
  buildDiffTree(
    parseFile(filepath1),
    parseFile(filepath2),
  ),
);

export default gendiff;
