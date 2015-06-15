var q             = require("q");
var fs            = require("fs");
var config        = require("../glm-config");
var wGithub       = require("../services/github-wrapper");
var logger        = require("../services/logger");
var labelLogger   = require("../services/label-logger");

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

function importJson(repository, jsonData){
  var promises      = [];
  jsonData.forEach(function(label){
    promises.push(createLabel(label, repository));
  });
  return q.allSettled(promises);
}

function createLabel(label, destination){
  logger.log('json --> Label founded : ' + label.name);
  return wGithub.createLabel({
    user    : config.github.user,
    repo    : destination,
    name    : label.name,
    color   : label.color
  });
}

var cmdImport = function cmdImport(repository, sourceFile){
  var jsonData = parseJsonFile(sourceFile);

  importJson(repository, jsonData)
    .then(function(labelsImported){
      labelLogger.logCreate(labelsImported, jsonData);
    })
    .catch(logger.error.bind(logger));
};

module.exports = cmdImport;
