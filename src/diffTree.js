import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const data1Keys = _.keys(data1);
  const data2Keys = _.keys(data2);
  const allKeys = _.sortBy(_.union(data2Keys, data1Keys));
  return allKeys.map((key) => {
    if (!data1Keys.includes(key)) {
      return { key, value: [data2[key]], status: 'added' };
    }
    if (!data2Keys.includes(key)) {
      return { key, value: [data1[key]], status: 'removed' };
    }
    if (data1[key] === data2[key]) {
      return { key, value: [data2[key]], status: 'unchanged' };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, children: buildDiffTree(data1[key], data2[key]), status: 'unchanged' };
    }
    return { key, value: [data1[key], data2[key]], status: 'updated' };
  });
};

const getChildren = (data) => data.children;

const getStatus = (data) => data.status;

const getKey = (data) => data.key;

const getValue = (data) => data.value;

export {
  buildDiffTree,
  getChildren,
  getKey,
  getStatus,
  getValue,
};
