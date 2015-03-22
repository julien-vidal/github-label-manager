var GitHubApi = require("github");
var q         = require("q");
var config    = require("../glm-config");
var logger    = require("../services/logger");

var github    = new GitHubApi(config.github.init);

function logLabelCreation(promises){
  var i;
  var length  = promises.length;

  for(i = 0; i < length; i++){
    if(promises[i].state === "fulfilled"){
      logger.success('destination --> Label : ' + promises[i].value.name + ' imported');
    }
    else if(promises[i].state === "rejected"){
      logger.error('destination  --> [err] Label : not imported');
    }
    else{
      logger.error('destination  --> [err:promise] unknown...');
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

function importLabels(labels, destination){
  var i;
  var labelsLength = labels.length;
  var promises = [];

  for(i = 0; i < labelsLength; i++){
    promises.push(createLabel(labels[i], destination));
  }

  return q.allSettled(promises);
}

var cmdImport = function cmdImport(origin, destination){
  github.authenticate({
    type: "oauth",
    token: config.github.token
  });

  getLabels(origin)
    .then(function(labels){
      return importLabels(labels, destination);
    }, console.error)
    .then(logLabelCreation, console.error);
};

module.exports = cmdImport;