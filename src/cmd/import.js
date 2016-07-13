var q             = require("q");
var fs            = require("fs");
var wGithub       = require("../services/github-wrapper");
var logger        = require("../services/logger");
var labelLogger   = require("../services/label-logger");
var utils         = require("../services/utils");

var cmdImport = function cmdImport(repository, sourceFile, options){
  var jsonData = parseJsonFile(sourceFile);
  var parsed = utils.parseRepository(repository);
  var strategy = utils.getStrategy(options.strategy);

  importJson(jsonData)
    .then(function(labelsImported){
      labelLogger.logCreate(labelsImported, jsonData);
    })
    .catch(logger.error.bind(logger));

  //////////////////////////////////////////////////////////////////////

  function parseJsonFile(path){
    var jsonData = [];
    try {
      jsonData = JSON.parse(fs.readFileSync(path, 'utf8'));
    }
    catch(e){
      logger.error(e);
    }
    return jsonData;
  }

  function importJson(jsonData){
    var promises      = [];
    jsonData.forEach(function(label){
      logger.log('json --> Label founded : ' + label.name);
      promises.push(updateLabel(label));
    });
    return q.allSettled(promises);
  }

  function createLabel(label){
    return wGithub.createLabel({
      user    : parsed.user,
      repo    : parsed.repo,
      name    : label.name,
      color   : label.color
    });
  }

  function updateLabel(label){
    return wGithub.updateLabel({
      user    : parsed.user,
      repo    : parsed.repo,
      name    : label.name,
      color   : label.color
    });
  }
};

module.exports = cmdImport;
