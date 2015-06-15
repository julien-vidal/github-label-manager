var q             = require("q");
var config        = require("../glm-config");
var wGithub       = require("../services/github-wrapper");
var logger        = require("../services/logger");
var labelLogger   = require("../services/label-logger");

function deleteLabel(label, origin){
  logger.log('origin --> Label founded : ' + label.name);
  return wGithub.deleteLabel({
      user    : config.github.user,
      repo    : origin,
      name    : label.name
    })
    .then(function(response){
      response.name = label.name;
      return response;
    });
}

function clearLabels(labels, origin){
  var i;
  var labelsLength = labels.length;
  var promises = [];

  for(i = 0; i < labelsLength; i++){
    promises.push(deleteLabel(labels[i], origin));
  }

  return q.allSettled(promises);
}

function cmdClear(origin){
  var globalLabels = [];

  wGithub
    .getLabels({
      user: config.github.user,
      repo: origin
    })
    .then(function(labels){
      globalLabels = labels;
      return clearLabels(labels, origin);
    })
    .then(function(labelsCleared){
      labelLogger.logDelete(labelsCleared, globalLabels);
    })
    .catch(logger.error.bind(logger));
}

module.exports = cmdClear;
