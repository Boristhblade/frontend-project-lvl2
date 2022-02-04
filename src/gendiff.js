import _ from 'lodash';
import parseFile from './parsers.js';
import formater from './stylish.js';

const buildDiffTree = (data1, data2) => {
  const data1Keys = _.keys(data1);
  const data2Keys = _.keys(data2);
  const allKeys = _.union(data2Keys, data1Keys).sort();
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

const gendiff = (filepath1, filepath2) => formater(
  buildDiffTree(
    parseFile(filepath1),
    parseFile(filepath2),
  ),
);

export { gendiff, buildDiffTree, parseFile };

// const file1Keys = _.keys(file1);
//   const file2Keys = _.keys(file2);
//   const allKeys = _.union(file1Keys, file2Keys).sort();
//   const result = allKeys.reduce((acc, key) => {
//     if (!file1Keys.includes(key)) {
//       acc.push(`  + ${key}: ${file2[key]}\n`);
//       return acc;
//     }
//     if (!file2Keys.includes(key)) {
//       acc.push(`  - ${key}: ${file1[key]}\n`);
//       return acc;
//     }
//     if (file1[key] === file2[key]) {
//       acc.push(`    ${key}: ${file1[key]}\n`);
//       return acc;
//     }
//     acc.push(`  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`);
//     return acc;
//   }, ['{\n']);

// const buildDiffString = (file1, file2) => {
//   const iter = (obj1, obj2, depth = 1) => {
//     const obj1Keys = _.keys(obj1);
//     const obj2Keys = _.keys(obj2);
//     const allKeys = _.union(obj2Keys, obj1Keys).sort();
//     const result = allKeys.map((key) => {
//       if (!obj1Keys.includes(key)) {
//         if (!_.isObject(obj2[key])) {
//           return `${'    '.repeat(depth - 1)}  + ${key}: ${obj2[key]}\n`;
//         }
//         return `${'    '.repeat(depth - 1)}  + ${key}: ${stringify(obj2[key], depth + 1)}\n`;
//       }
//       if (!obj2Keys.includes(key)) {
//         if (!_.isObject(obj1[key])) {
//           return `${'    '.repeat(depth - 1)}  + ${key}: ${obj1[key]}\n`;
//         }
//         return `${'    '.repeat(depth - 1)}  + ${key}: ${stringify(obj1[key], depth + 1)}\n`;
//       }
//       if (obj1[key] === obj2[key]) {
//         return `${'    '.repeat(depth)}${key}: ${obj1[key]}\n`;
//       }
//       if (isObject(obj1[key]) && isObject(obj2[key])) {
//         return
//       }
//     });
//   };
