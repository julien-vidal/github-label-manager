var GitHubApi = require("github");
var q         = require("q");
var config    = require("../glm-config");
var logger    = require("../services/logger");

var github    = new GitHubApi(config.github.init);

var cmdExport = function cmdExport(repository, exportFile){};

module.exports = cmdExport;
