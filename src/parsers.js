import { load } from 'js-yaml';

const parseJson = (fileString) => JSON.parse(fileString);

const parseYml = (fileString) => load(fileString);

const pickParser = (extension) => {
  if (extension === 'json') {
    return parseJson;
  }
  if (extension === 'yml' || extension === 'yaml') {
    return parseYml;
  }
  return console.error('Unknown file extension');
};
export default pickParser;
