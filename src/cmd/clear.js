var q             = require("q");
var wGithub       = require("../services/github-wrapper");
var logger        = require("../services/logger");
var labelLogger   = require("../services/label-logger");
var utils         = require("../services/utils");

function cmdClear(origin){
  var globalLabels = [];
  var parsed = utils.parseRepository(origin);

  wGithub
    .getLabels({
      user: parsed.user,
      repo: parsed.repo
    })
    .then(function(labels){
      globalLabels = labels;
      return clearLabels(labels, origin);
    })
    .then(function(labelsCleared){
      labelLogger.logDelete(labelsCleared, globalLabels);
    })
    .catch(logger.error.bind(logger));

  //////////////////////////////////////////////////////////////////////

  function deleteLabel(label, origin){
    logger.log('origin --> Label founded : ' + label.name);
    return wGithub.deleteLabel({
      user    : parsed.user,
      repo    : parsed.repo,
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
}

module.exports = cmdClear;
