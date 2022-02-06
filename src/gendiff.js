import { buildDiffTree } from './diffTree.js';
import parseFile from './parsers.js';
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

  return formaterPicked(
    buildDiffTree(
      parseFile(filepath1),
      parseFile(filepath2),
    ),
  );
};

export default gendiff;
