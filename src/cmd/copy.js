var q         = require("q");
var config    = require("../glm-config");
var wGithub   = require("../services/github-wrapper");
var logger    = require("../services/logger");

function logLabelCreation(promises, labels){
  var i;
  var length  = promises.length;

  for(i = 0; i < length; i++){
    if(promises[i].state === "fulfilled"){
      logger.success('target --> Label  imported : ' + promises[i].value.name);
    }
    else if(promises[i].state === "rejected"){
      switch(promises[i].reason.code){
        case 404 :
          logger.error('target --> Repository not founded');
          break;
        case 422 :
          logger.error('target --> Label already exist : ' + labels[i].name);
          break;
        default:
          logger.error('target --> Unsupported github error code : '+promises[i].reason.code);
      }
    }
    else{
      logger.error('target --> [err:promise] unknown...');
    }
  }
}

function createLabel(label, destination){
  logger.log('origin --> Label founded : ' + label.name);
  return wGithub.createLabel({
    user    : config.github.user,
    repo    : destination,
    name    : label.name,
    color   : label.color
  });
}

function getLabels(origin){
  return wGithub.getLabels({
    user: config.github.user,
    repo: origin
  });
}

function copyLabels(labels, destination){
  var i;
  var labelsLength = labels.length;
  var promises = [];

  for(i = 0; i < labelsLength; i++){
    promises.push(createLabel(labels[i], destination));
  }

  return q.allSettled(promises);
}

var cmdCopy = function cmdCopy(origin, destination){
  var globalLabels = [];
  getLabels(origin)
    .then(function(labels){
      globalLabels = labels;
      return copyLabels(labels, destination);
    })
    .then(function(labelsImport){
      logLabelCreation(labelsImport, globalLabels);
    })
    .catch(logger.error.bind(logger));
};

module.exports = cmdCopy;
