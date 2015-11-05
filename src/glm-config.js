var logger        = require("./services/logger");

function GlmConfig(){
  this.github  = {
    user      : process.env.GITHUB_USER,
    token     : process.env.GITHUB_TOKEN,
    init      : {
      version: "3.0.0"
    }
  };
}

GlmConfig.prototype.init = function(program) {
  this.github.user = program.user || this.github.user;
  this.github.token = program.token || this.github.token;
  this.checkValidity();
};

GlmConfig.prototype.checkValidity = function() {
  if(this.github.user === undefined || this.github.token === undefined){
    logger.error("Github user and token are required !");
    process.exit(1);
  }
};

GlmConfig.prototype.additionalHelp = function(){
  console.log('  Note : ');
  console.log('');
  console.log('    You can specify which organisation to use on');
  console.log('    <origin> <destination> <repository>');
  console.log('    By prefixing the repository with org: (Example : superorg:myawesomerepo)');
  console.log('');
};

module.exports = new GlmConfig();
