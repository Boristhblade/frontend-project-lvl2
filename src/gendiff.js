#!/usr/bin/env node

import { buildDiffTree } from './diffTree.js';
import parseFile from './parsers.js';

const gendiff = (filepath1, filepath2, formater) => formater(
  buildDiffTree(
    parseFile(filepath1),
    parseFile(filepath2),
  ),
);

export default gendiff;
