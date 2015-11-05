var config        = require("../glm-config");

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

module.exports = new Utils();
