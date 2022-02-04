#!/usr/bin/env node

import { Command } from 'commander';
import { gendiff } from '../src/gendiff.js';
import { stylish, plain } from '../src/stylish.js';

const program = new Command();
program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    let chosenFormater;
    switch (options.format) {
      case 'plain':
        chosenFormater = plain;
        break;
      default:
        chosenFormater = stylish;
    }
    console.log(
      gendiff(
        filepath1,
        filepath2,
        chosenFormater,
      ),
    );
  });

program.parse();
