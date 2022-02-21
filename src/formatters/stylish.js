import _ from 'lodash';
import { getValue, getKey, getChildren, getStatus } from '../diffTree.js';

const generatePrefix = (data) => {
  switch (data.status) {
    case 'added':
      return ['+'];
    case 'removed':
      return ['-'];
    case 'unchanged':
      return [' '];
    default:
      return ['-', '+'];
  }
};

const stringify = (obj, objDepth) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const currentIndentObj = ' '.repeat(objDepth * 4);
  const lines = Object
    .entries(obj)
    .map(([key, val]) => `${currentIndentObj}    ${key}: ${stringify(val, objDepth + 1)}\n`);

  return `{\n${lines.join('')}${currentIndentObj}}`;
};

const stylish = (tree) => {
  const iter = (data, depth = 0) => {
    const indentSize = depth * 4;
    const currentIndent = ' '.repeat(indentSize);
    return `{\n${data
      .flatMap((item) => {
        if (getStatus(item) === 'unchanged') {
          if (getChildren(item)) {
            return `${currentIndent}    ${getKey(item)}: ${iter(getChildren(item), depth + 1)}`;
          }
          return `${currentIndent}    ${getKey(item)}: ${getValue(item)[0]}\n`;
        }
        if (getStatus(item) === 'added') {
          return `${currentIndent}  + ${getKey(item)}: ${stringify(getValue(item)[0], depth + 1)}\n`;
        }
        if (getStatus(item) === 'removed') {
          return `${currentIndent}  - ${getKey(item)}: ${stringify(getValue(item)[0], depth + 1)}\n`;
        }
        return [`${currentIndent}  - ${getKey(item)}: ${stringify(getValue(item)[0], depth + 1)}\n`,
          `${currentIndent}  + ${getKey(item)}: ${stringify(getValue(item)[1], depth + 1)}\n`];
      })
      .join('')}${currentIndent}}${depth === 0 ? '' : '\n'}`;
  };

  return iter(tree, 0);
};

export default stylish;
// `${currentIndent}  ${prefix} ${getKey(item)}: ${getValue(item)[index]}\n`;
// `${currentIndent}  ${prefix} ${getKey(item)}: ${stringify((getValue(item)[index]), depth + 1)}\n`