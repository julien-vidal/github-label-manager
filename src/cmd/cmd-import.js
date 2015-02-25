var GitHubApi = require("github");
var q         = require("q");
var config    = require("../glm-config");

var github    = new GitHubApi(config.github.init);

github.authenticate({
  type: "oauth",
  token: config.github.token
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

function createLabel(label, destination){
  var defer = q.defer();
  console.log('origin --> Label founded : ', label.name);
  github.issues.createLabel({
    user: config.github.user,
    repo: destination,
    name: label.name,
    color: label.color
  }, function (err, response){
    if(err === null){
      defer.resolve(response);
    }
    else{
      defer.reject(err);
    }
  });
  return defer.promise;
}

function getLabels(origin){
  var githubGetLabels = q.nfbind(github.issues.getLabels);
  githubGetLabels({
    user: config.github.user,
    repo: origin
  });

  github.issues.getLabels({
    user: config.github.user,
    repo: origin
  }, function (err, response){
    if(err === null){
      defer.resolve(response);
    }
    else{
      defer.reject(err);
    }
  });

  return defer.promise;
}

function importLabels(labels){
  var i;
  var labelsLength = labels.length;
  var promises = [];

  for(i = 0; i < labelsLength; i++){
    promises.push(createLabel(labels[i]));
  }

  return q.allSettled(promises);
}

var cmdImport = function cmdImport(origin, destination){
  getLabels(origin)
    .then(importLabels)
    .then();

  //github.issues.getLabels()
  //github.issues.
  //
  //github.issues.getLabels({
  //  user: config.github.user,
  //  repo: origin
  //}, );

};


//function(err, labels) {
//  if(err === null){
//    labelsLength = labels.length;
//    for(i = 0; i < labelsLength; i++){
//      console.log('origin --> Label founded : ', labels[i].name);
//      github.issues.createLabel({
//        user: config.github.user,
//        repo: destination,
//        name: labels[i].name,
//        color: labels[i].color
//      }, logLabelCreation );
//    }
//  }
//  else{
//    console.log(err);
//    console.log(labels);
//  }
//}


module.exports = cmdImport;