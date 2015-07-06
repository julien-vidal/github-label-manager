var q             = require("q");
var config        = require("../glm-config");
var wGithub       = require("../services/github-wrapper");
var logger        = require("../services/logger");
var labelLogger   = require("../services/label-logger");

function createLabel(label, destination){
  logger.log('origin --> Label founded : ' + label.name);
  return wGithub.createLabel({
    user    : config.github.user,
    repo    : destination,
    name    : label.name,
    color   : label.color
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

  wGithub
    .getLabels({
      user: config.github.user,
      repo: origin
    })
    .then(function(labels){
      globalLabels = labels;
      return copyLabels(labels, destination);
    })
    .then(function(labelsImport){
      labelLogger.logCreate(labelsImport, globalLabels);
    })
    .catch(logger.error.bind(logger));
};

module.exports = cmdCopy;
