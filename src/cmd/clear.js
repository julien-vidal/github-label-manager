var GitHubApi = require("github");
var q         = require("q");
var config    = require("../glm-config");
var logger    = require("../services/logger");


var github    = new GitHubApi(config.github.init);

function logLabelDeletion(promises){
  var i;
  var length  = promises.length;
  for(i = 0; i < length; i++){
    if(promises[i].state === "fulfilled"){
      logger.success('origin --> Label : ' + promises[i].value.name + ' removed');
    }
    else if(promises[i].state === "rejected"){
      logger.error('origin  --> [err] Label : not delete');
    }
    else{
      logger.error('origin  --> [err:promise] unknown...');
    }
  }
}

function deleteLabel(label, origin){
  var githubDeleteLabel = q.nfbind(github.issues.deleteLabel);
  logger.log('origin --> Label founded : ' + label.name);
  return githubDeleteLabel({
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
  var githubGetLabels = q.nfbind(github.issues.getLabels);
  return githubGetLabels({
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
  github.authenticate({
    type: "oauth",
    token: config.github.token
  });

  getLabels(origin)
    .then(function(labels){
      return clearLabels(labels, origin);
    }, console.error)
    .then(logLabelDeletion, console.error);
};

module.exports = cmdClear;