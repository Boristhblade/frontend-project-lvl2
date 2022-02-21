import _ from 'lodash';
import { getValue, getKey, getChildren } from '../diffTree.js';

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
        if (getChildren(item)) {
          return `${currentIndent}    ${getKey(item)}: ${iter(getChildren(item), depth + 1)}`;
        }
        return generatePrefix(item).map((prefix, index) => {
          if (!_.isObject(getValue(item))) {
            return `${currentIndent}  ${prefix} ${getKey(item)}: ${getValue(item)[index]}\n`;
          }
          return `${currentIndent}  ${prefix} ${getKey(item)}: ${stringify((getValue(item)[index]), depth + 1)}\n`;
        });
      })
      .join('')}${currentIndent}}${depth === 0 ? '' : '\n'}`;
  };

  return iter(tree, 0);
};

export default stylish;
