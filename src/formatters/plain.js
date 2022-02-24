import _ from 'lodash';
import {
  getChildren, getKey, getStatus, getValue,
} from '../diffTree.js';

const formatValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof (data) === 'string') {
    return `'${data}'`;
  }
  return data;
};

const plain = (tree) => {
  const iter = (data, path) => _.compact(data.flatMap((item) => {
    const newPath = _.compact(`${path}.${getKey(item)}`.split('.')).join('.');
    switch (getStatus(item)) {
      case 'nested':
        return iter(getChildren(item), newPath);
      case 'added':
        return `Property '${newPath}' was added with value: ${formatValue(getValue(item)[0])}`;
      case 'removed':
        return `Property '${newPath}' was removed`;
      case 'updated':
        return `Property '${newPath}' was updated. From ${formatValue(getValue(item)[0])} to ${formatValue(getValue(item)[1])}`;
      default:
        return '';
    }
  }))
    .join('\n');

  return iter(tree, '');
};

export default plain;
