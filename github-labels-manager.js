#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program   = require('commander');
var cmdImport = require('./src/cmd/cmd-import');

program
  .version('0.0.1');

program
  .command('import <origin> <destination>')
  .description('Import labels into an other github repository')
  .action(cmdImport);

program
  .parse(process.argv);
