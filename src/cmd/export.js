var fs        = require("fs");
var config    = require("../glm-config");
var wGithub   = require("../services/github-wrapper");
var logger    = require("../services/logger");

function writeLabels(labels, path){
  labels = labels.map(function(githubLabel){
    return {
      name : githubLabel.name,
      color : githubLabel.color
    };
  });
  fs.writeFileSync(path, JSON.stringify(labels, null, 4), 'utf8');
}

var cmdExport = function cmdExport(repository, exportFile){
  wGithub
    .getLabels({
      user: config.github.user,
      repo: repository
    })
    .then(function(labels){
      writeLabels(labels, exportFile);
    })
    .catch(logger.error.bind(logger));
};

module.exports = cmdExport;
