var q             = require("q");
var wGithub       = require("../services/github-wrapper");
var logger        = require("../services/logger");
var labelLogger   = require("../services/label-logger");
var utils         = require("../services/utils");

var cmdCopy = function cmdCopy(origin, destination){
  var globalLabels = [];
  var parsedOrigin = utils.parseRepository(origin);
  var parsedDestination = utils.parseRepository(destination);

  wGithub
    .getLabels({
      user: parsedOrigin.user,
      repo: parsedOrigin.repo
    })
    .then(function(labels){
      globalLabels = labels;
      return copyLabels(labels);
    })
    .then(function(labelsImport){
      labelLogger.logCreate(labelsImport, globalLabels);
    })
    .catch(logger.error.bind(logger));

  //////////////////////////////////////////////////////////////////////

  function createLabel(label){
    logger.log('origin --> Label founded : ' + label.name);
    return wGithub.createLabel({
      user    : parsedDestination.user,
      repo    : parsedDestination.repo,
      name    : label.name,
      color   : label.color
    });
  }

  function copyLabels(labels){
    var i;
    var labelsLength = labels.length;
    var promises = [];

    for(i = 0; i < labelsLength; i++){
      promises.push(createLabel(labels[i]));
    }

    return q.allSettled(promises);
  }
};

module.exports = cmdCopy;
