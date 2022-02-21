import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const formaters = {
  stylish,
  plain,
  json,
};

const pickFormater = (formaterName) => formaters[formaterName];

export default pickFormater;
