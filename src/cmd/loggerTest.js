var chalk = require("chalk");

var cmdLoggerTest= function cmdLoggerTest(){
  console.log('Chalk after?');
  console.log(chalk.blue('Hello world!'));
  console.log(chalk.green('[✔]: Test valid 1'));
  console.log(chalk.bold.green('[✔]: Test valid 2'));
  console.log(chalk.green('[✓]: Test valid 3'));
  console.log(chalk.bold.green('[✓]: Test valid 4'));
  console.log(chalk.red('[✗]: Test error 1'));
  console.log(chalk.bold.red('[✗]: Test error 1'));
  console.log(chalk.red('[✘]: Test error 2'));
  console.log(chalk.bold.red('[✘]: Test error 2'));
  console.log(chalk.yellow('[!]: Test warning 1'));
  console.log(chalk.bold.yellow('[!]: Test warning 1'));
};

module.exports = cmdLoggerTest;