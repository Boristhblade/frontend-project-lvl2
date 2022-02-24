import _ from 'lodash';
import {
  getValue, getKey, getChildren, getStatus,
} from '../diffTree.js';

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
        switch (getStatus(item)) {
          case 'nested':
            return `${currentIndent}    ${getKey(item)}: ${iter(getChildren(item), depth + 1)}`;
          case 'unchanged':
            return `${currentIndent}    ${getKey(item)}: ${getValue(item)[0]}\n`;
          case 'added':
            return `${currentIndent}  + ${getKey(item)}: ${stringify(getValue(item)[0], depth + 1)}\n`;
          case 'removed':
            return `${currentIndent}  - ${getKey(item)}: ${stringify(getValue(item)[0], depth + 1)}\n`;
          default:
            return [`${currentIndent}  - ${getKey(item)}: ${stringify(getValue(item)[0], depth + 1)}\n`,
              `${currentIndent}  + ${getKey(item)}: ${stringify(getValue(item)[1], depth + 1)}\n`];
        }
      })
      .join('')}${currentIndent}}${depth === 0 ? '' : '\n'}`;
  };

  return iter(tree, 0);
};

export default stylish;
