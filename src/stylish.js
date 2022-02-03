import _ from 'lodash';

const getChildren = (data) => data.children;

const getPrefix = (data) => data.prefix;

const getKey = (data) => data.key;

const getValue = (data) => data.value;

const formater = (tree) => {
  const iter = (data, depth = 0) => {
    const stringify = (obj, objDepth) => {
      if (!_.isObject(obj)) {
        return obj.toString();
      }
      const currentIndentObj = ' '.repeat(objDepth * 4);
      const lines = Object
        .entries(obj)
        .map(([key, val]) => `${currentIndentObj}    ${key}: ${stringify(val, objDepth + 1)}\n`);

      return `{\n${lines.join('')}${currentIndentObj}}`;
    };

    const indentSize = depth * 4;
    const currentIndent = ' '.repeat(indentSize);
    return `{\n${data
      .map((item) => {
        if (getChildren(item)) {
          return `${currentIndent}    ${getKey(item)}: ${iter(getChildren(item), depth + 1)}`;
        }
        if (!_.isObject(getValue(item))) {
          return `${currentIndent}  ${getPrefix(item)} ${getKey(item)}: ${getValue(item)}\n`;
        }
        return `${currentIndent}  ${getPrefix(item)} ${getKey(item)}: ${stringify(getValue(item), depth + 1)}\n`;
      })
      .join('')}${currentIndent}}${depth === 0 ? '' : '\n'}`;
  };

  return iter(tree, 0);
};

export default formater;
