import { load } from 'js-yaml';

const parseJson = (fileString) => JSON.parse(fileString);

const parseYml = (fileString) => load(fileString);

const parsers = {
  json: parseJson,
  yml: parseYml,
  yaml: parseYml,
};

const pickParser = (fileString, extension) => parsers[extension](fileString);

export default pickParser;
