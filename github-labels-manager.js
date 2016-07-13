#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program         = require('commander');
var config          = require("./src/glm-config");
var wGithub         = require("./src/services/github-wrapper");
var cmdCopy         = require('./src/cmd/copy');
var cmdImport       = require('./src/cmd/import');
var cmdExport       = require('./src/cmd/export');
var cmdClear        = require('./src/cmd/clear');

program
  .version('1.1.0')
  .option('-u, --user [user]', 'Github user to use')
  .option('-t, --token [token]', 'Github token to use');

program
  .command('copy <origin> <destination>')
  .option("-s, --strategy [mode]", "How glm will process existing labels, -s:update (default : label color updated), -s:replace (All labels cleared and replaced)", "update")
  .description('Import labels into an other github repository')
  .action(cmdCopy);

program
  .command('import <repository> <sourceFile>')
  .option("-s, --strategy [mode]", "How glm will process existing labels, -s:update (default : label color updated), -s:replace (All labels cleared and replaced)", "update")
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

program.on('--help', config.additionalHelp);

program
  .parse(process.argv);

config.init(program);
wGithub.connect();
