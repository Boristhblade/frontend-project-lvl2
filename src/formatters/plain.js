import _ from 'lodash';
import {
  getChildren, getKey, getStatus, getValue,
} from '../diffTree.js';

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

export default plain;
