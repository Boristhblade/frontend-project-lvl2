import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

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

export default pickFormater;
