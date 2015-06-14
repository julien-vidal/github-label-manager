var q         = require("q");
var fs        = require("fs");
var config    = require("../glm-config");
var wGithub   = require("../services/github-wrapper");
var logger    = require("../services/logger");

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

function logLabelCreation(promises, jsonData){
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
          logger.error('target --> Label already exist : ' + jsonData[i].name);
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

function importJson(repository, jsonData){
  var promises      = [];
  jsonData.forEach(function(label){
    promises.push(createLabel(label, repository));
  });
  return q.allSettled(promises);
}

function createLabel(label, destination){
  logger.log('origin --> Label founded : ' + label.name);
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
      logLabelCreation(labelsImported, jsonData);
    })
    .catch(logger.error.bind(logger));
};

module.exports = cmdImport;
