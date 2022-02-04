import _ from 'lodash';

const getChildren = (data) => data.children;

const getPrefix = (data) => {
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

const getStatus = (data) => data.status;

const getKey = (data) => data.key;

const getValue = (data) => data.value;

const stylish = (tree) => {
  const iter = (data, depth = 0) => {
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

    const indentSize = depth * 4;
    const currentIndent = ' '.repeat(indentSize);
    return `{\n${data
      .flatMap((item) => {
        if (getChildren(item)) {
          return `${currentIndent}    ${getKey(item)}: ${iter(getChildren(item), depth + 1)}`;
        }
        return getPrefix(item).map((prefix, index) => {
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

const plain = (tree) => {
  const valuePlain = (data) => {
    if (_.isObject(data)) {
      return '[complex value]';
    }
    if (typeof (data) === 'string') {
      return `'${data}'`;
    }
    return data;
  };

  const iter = (data, path) => _.compact(data.flatMap((item) => {
    const newPath = _.compact(path.split('.'));
    newPath.push(getKey(item));
    if (getChildren(item)) {
      return iter(getChildren(item), newPath.join('.'));
    }
    if (getStatus(item) === 'added') {
      return `Property '${newPath.join('.')}' was added with value: ${valuePlain(getValue(item)[0])}`;
    }
    if (getStatus(item) === 'removed') {
      return `Property '${newPath.join('.')}' was removed`;
    }
    if (getStatus(item) === 'updated') {
      return `Property '${newPath.join('.')}' was updated. From ${valuePlain(getValue(item)[0])} to ${valuePlain(getValue(item)[1])}`;
    }
    return '';
  }))
    .join('\n');

  return iter(tree, '');
};

export { stylish, plain };
// `Property 'common.follow' was added with value: false
// Property 'common.setting2' was removed
// Property 'common.setting3' was updated. From true to null
// Property 'common.setting4' was added with value: 'blah blah'
// Property 'common.setting5' was added with value: [complex value]
// Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
// Property 'common.setting6.ops' was added with value: 'vops'
// Property 'group1.baz' was updated. From 'bas' to 'bars'
// Property 'group1.nest' was updated. From [complex value] to 'str'
// Property 'group2' was removed
// Property 'group3' was added with value: [complex value]`;
