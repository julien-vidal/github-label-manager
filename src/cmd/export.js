var fs            = require("fs");
var wGithub       = require("../services/github-wrapper");
var logger        = require("../services/logger");
var labelLogger   = require("../services/label-logger");
var utils         = require("../services/utils");

var cmdExport = function cmdExport(repository, exportFile){
  var parsed = utils.parseRepository(repository);

  wGithub
    .getLabels({
      user: parsed.user,
      repo: parsed.repo
    })
    .then(function(labels){
      writeLabels(labels, exportFile);
    })
    .catch(logger.error.bind(logger));

  //////////////////////////////////////////////////////////////////////

  function writeLabels(labels, path){
    labels = labels.map(function(githubLabel){
      return {
        name : githubLabel.name,
        color : githubLabel.color
      };
    });
    fs.writeFileSync(path, JSON.stringify(labels, null, 4), 'utf8');
    labelLogger.logExport(labels, path);
  }
};

module.exports = cmdExport;
