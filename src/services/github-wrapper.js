var q         = require("q");
var GitHubApi = require("github");
var config    = require("../glm-config");

var githubConnector = new GitHubApi(config.github.init);

function GithubWrapper(){
  this.github  = githubConnector;
}

/**
 * @todo: Improve it for handle more auth cases
 */
GithubWrapper.prototype.connect = function() {
  this.github.authenticate({
    type: "oauth",
    token: config.github.token
  });
};

GithubWrapper.prototype.createLabel  = q.nfbind(githubConnector.issues.createLabel);
GithubWrapper.prototype.getLabels    = q.nfbind(githubConnector.issues.getLabels);
GithubWrapper.prototype.deleteLabel  = q.nfbind(githubConnector.issues.deleteLabel);

module.exports = new GithubWrapper();
