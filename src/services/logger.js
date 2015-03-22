var chalk = require("chalk");

function Logger(){
  this.levels = {
    success : {
      prefix : '[✔]: ',
      color : 'green'
    },
    error : {
      prefix : '[✘]: ',
      color : 'red'
    },
    warn : {
      prefix : '[!]: ',
      color : 'yellow'
    },
    info : {
      prefix : '[?]: ',
      color : 'blue'
    },
    log : {
      prefix : '[-]: ',
      color : 'white'
    }
  };
}

Logger.prototype.prepareMsg = function(level, msg) {
  var currentLevel  = this.levels[level];
  var color         = currentLevel.color;
  return chalk.bold[currentLevel.color](currentLevel.prefix) + chalk[color](msg);
};

Logger.prototype.success = function(msg){
  console.log(this.prepareMsg('success', msg));
};

Logger.prototype.error = function(msg){
  console.log(this.prepareMsg('error', msg));
};

Logger.prototype.warn = function(msg){
  console.log(this.prepareMsg('warn', msg));
};

Logger.prototype.info = function(msg){
  console.log(this.prepareMsg('info', msg));
};

Logger.prototype.log = function(msg){
  console.log(this.prepareMsg('log', msg));
};

module.exports = new Logger();