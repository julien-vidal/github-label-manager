var GitHubApi = require("github");
var q         = require("q");
var config    = require("../glm-config");
var logger    = require("../services/logger");

var github    = new GitHubApi(config.github.init);

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
  var githubCreateLabel = q.nfbind(github.issues.createLabel);
  logger.log('origin --> Label founded : ' + label.name);
  return githubCreateLabel({
    user    : config.github.user,
    repo    : destination,
    name    : label.name,
    color   : label.color
  });
}

function getLabels(origin){
  var githubGetLabels = q.nfbind(github.issues.getLabels);
  return githubGetLabels({
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
  github.authenticate({
    type: "oauth",
    token: config.github.token
  });

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
