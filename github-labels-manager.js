#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program         = require('commander');
var cmdImport       = require('./src/cmd/import');
var cmdClear        = require('./src/cmd/clear');
var cmdLoggerTest   = require('./src/cmd/loggerTest');

program
  .version('0.0.1');

program
  .command('import <origin> <destination>')
  .description('Import labels into an other github repository')
  .action(cmdImport);

program
  .command('clear <origin>')
  .description('Clear all labels on that repository')
  .action(cmdClear);

program
  .command('logger')
  .description('Test logger component')
  .action(cmdLoggerTest);

program
  .parse(process.argv);
