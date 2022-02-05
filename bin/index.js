#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/gendiff.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const program = new Command();
program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const chosenFormater = [];
    switch (options.format) {
      case 'plain':
        chosenFormater[0] = plain;
        break;
      case 'json':
        chosenFormater[0] = json;
        break;
      default:
        chosenFormater[0] = stylish;
    }
    console.log(
      gendiff(
        filepath1,
        filepath2,
        chosenFormater[0],
      ),
    );
  });

program.parse();
