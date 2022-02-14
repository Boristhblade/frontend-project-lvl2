import { load } from 'js-yaml';
import _ from 'lodash';

const parseJson = (fileString) => JSON.parse(fileString);

const parseYml = (fileString) => load(fileString);

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
export default pickParser;
