import { readFileSync } from 'fs';
import _ from 'lodash';
import { cwd } from 'process';
import { resolve } from 'path';
import { load } from 'js-yaml';

const parseFile = (filePath) => {
  const fileExtension = _.last(filePath.split('.')).toLowerCase();
  if (fileExtension === 'json') {
    return JSON.parse(readFileSync(resolve(cwd(filePath), filePath), 'utf8'));
  }
  if (fileExtension === 'yaml' || fileExtension === 'yml') {
    return load(readFileSync(resolve(cwd(filePath), filePath), 'utf8'));
  }
  return console.error('Unknown file format');
};

export default parseFile;
