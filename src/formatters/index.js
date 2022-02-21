import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const pickFormater = (formaterName) => {
  switch (formaterName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error('Wrong formatter name');
  }
};

export default pickFormater;
