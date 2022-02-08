import { load } from 'js-yaml';

const parseJson = (fileString) => JSON.parse(fileString);

const parseYml = (fileString) => load(fileString);

export { parseJson, parseYml };
