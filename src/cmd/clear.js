var q         = require("q");
var config    = require("../glm-config");
var wGithub   = require("../services/github-wrapper");
var logger    = require("../services/logger");

function logLabelDeletion(promises, labels){
  var i;
  var length  = promises.length;
  if(length > 0){
    for(i = 0; i < length; i++){
      if(promises[i].state === "fulfilled"){
        logger.success('origin --> Label removed : ' + promises[i].value.name);
      }
      else if(promises[i].state === "rejected"){
        logger.error('origin --> Label not delete : '+labels[i].name);
      }
      else{
        logger.error('origin --> [err:promise] unknown...');
      }
    }
  }
  else{
    logger.success('origin --> Already clear !');
  }
}

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

function getLabels(origin){
  return wGithub.getLabels({
    user: config.github.user,
    repo: origin
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

var cmdClear= function cmdClear(origin){
  var globalLabels = [];

  getLabels(origin)
    .then(function(labels){
      globalLabels = labels;
      return clearLabels(labels, origin);
    })
    .then(function(labelsCleared){
      logLabelDeletion(labelsCleared, globalLabels);
    })
    .catch(logger.error.bind(logger));
};

module.exports = cmdClear;
