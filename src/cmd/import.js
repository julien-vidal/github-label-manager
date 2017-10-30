var q             = require("q");
var fs            = require("fs");
var wGithub       = require("../services/github-wrapper");
var logger        = require("../services/logger");
var labelLogger   = require("../services/label-logger");
var utils         = require("../services/utils");

var cmdImport = function cmdImport(repository, sourceFile){
  var jsonData = parseJsonFile(sourceFile);
  var parsed = utils.parseRepository(repository);

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
      promises.push(createLabel(label));
    });
    return q.allSettled(promises);
  }

  function createLabel(label){
    logger.log('json --> Label discovered : ' + label.name);
    return wGithub.createLabel({
      user    : parsed.user,
      repo    : parsed.repo,
      name    : label.name,
      color   : label.color
    });
  }
};

module.exports = cmdImport;
