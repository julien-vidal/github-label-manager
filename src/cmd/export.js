var GitHubApi = require("github");
var q         = require("q");
var fs        = require("fs");
var config    = require("../glm-config");
var logger    = require("../services/logger");

var github    = new GitHubApi(config.github.init);

function getLabels(origin){
  var githubGetLabels = q.nfbind(github.issues.getLabels);
  return githubGetLabels({
    user: config.github.user,
    repo: origin
  });
}

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
  github.authenticate({
    type: "oauth",
    token: config.github.token
  });
  getLabels(repository)
    .then(function(labels){
      writeLabels(labels, exportFile);
    })
    .catch(logger.error.bind(logger));
};

module.exports = cmdExport;
