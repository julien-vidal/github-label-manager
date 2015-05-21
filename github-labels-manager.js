#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program         = require('commander');
var cmdCopy         = require('./src/cmd/copy');
var cmdImport       = require('./src/cmd/import');
var cmdExport       = require('./src/cmd/export');
var cmdClear        = require('./src/cmd/clear');

program
  .version('0.0.2');

program
  .command('copy <origin> <destination>')
  .description('Import labels into an other github repository')
  .action(cmdCopy);

program
  .command('import <repository> <sourceFile>')
  .description('Import JSON to repository')
  .action(cmdImport);

program
  .command('export <repository> <exportFile>')
  .description('Export a repository labels in a JSON file')
  .action(cmdExport);

program
  .command('clear <origin>')
  .description('Clear all labels on that repository')
  .action(cmdClear);

program
  .parse(process.argv);
