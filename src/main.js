import { readFileSync } from 'fs';
import _ from "lodash";

const parseFile = (filePath) => JSON.parse(readFileSync(filePath, 'utf8'));


const buildDiffString = (file1, file2) => {
  const file1Keys = Object.keys(file1);
  const file2Keys = Object.keys(file2);
  const allKeys = _.union(file1Keys, file2Keys).sort();
  const result = allKeys.reduce((key, acc) => {
    if (!file1Keys.includes(key)) {
      return acc + `  +${key}: ${file2[key]},\n`;
    }
    if (!file2Keys.includes(key)) {
      return acc + `  -${key}: ${file1[key]},\n`;
    }
    if (file1[key] === file2[key]) {
      return acc + `   ${key}: ${file1[key]},\n`;
    }
    return acc + `  -${key}: ${file1[key]},\n  +${key}: ${file2[key]},`;
  }, '{\n');
  console.log(file1);
  console.log(file1Keys);
  console.log(file2Keys);
  console.log(allKeys);
  console.log(result + "}");
  return result + "}";
};

export default (filepath1, filepath2) => buildDiffString(parseFile(filepath1), parseFile(filepath2));
