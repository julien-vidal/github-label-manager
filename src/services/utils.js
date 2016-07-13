var config        = require("../glm-config");
var strategies    = ['update', 'replace'];

function Utils(){}

/**
 * @todo: Improve it for handle more auth cases
 */
Utils.prototype.parseRepository = function(repository) {
  var parsedRepoName = repository.split(':');
  var hasOrg = (parsedRepoName.length === 2);
  return {
    user : (hasOrg)? parsedRepoName[0] : config.github.user,
    repo : (hasOrg)? parsedRepoName[1] : repository
  };
};

/**
 * @todo: Improve it for handle more auth cases
 */
Utils.prototype.getStrategy = function(rawStrategy) {
  var strategy = rawStrategy.toLowerCase();
  return (strategies.indexOf(strategy) >= 0)? strategy : 'update';
};

module.exports = new Utils();
