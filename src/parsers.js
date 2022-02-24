import { load } from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: load,
  yaml: load,
};

const pickParser = (data, format) => parsers[format](data);

export default pickParser;
