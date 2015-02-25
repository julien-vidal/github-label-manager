var GitHubApi = require("github");
var q         = require("q");
var config    = require("../glm-config");

var githubConfig = {
  user      : process.env.GITHUB_USER,
  token     : process.env.GITHUB_TOKEN
};


var github    = new GitHubApi({
  // required
  version: "3.0.0"
});

github.authenticate({
  type: "oauth",
  token: githubConfig.token
});

function logLabelCreation(err, labelInfo){
  if(err === null){
    console.log('destination --> Label : ', labelInfo.name, ' imported');
  }
  else{
    console.log('destination  --> [err] Label : not imported');
    console.log(err);
  }
}

var cmdImport = function cmdImport(origin, destination){
  var i;
  var labelsLength;

  github.issues.getLabels({
    user: githubConfig.user,
    repo: origin
  }, function(err, labels) {
    if(err === null){
      labelsLength = labels.length;
      for(i = 0; i < labelsLength; i++){
        console.log('origin --> Label founded : ', labels[i].name);
        github.issues.createLabel({
          user: githubConfig.user,
          repo: destination,
          name: labels[i].name,
          color: labels[i].color
        }, logLabelCreation );
      }
    }
    else{
      console.log(err);
      console.log(labels);
    }
  });

};


module.exports = cmdImport;