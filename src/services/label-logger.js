var logger    = require("./logger");

function LabelLogger(){}

LabelLogger.prototype.logDelete = function (promises, labels){
  var i;
  var length  = promises.length;
  if(length > 0){
    for(i = 0; i < length; i++){
      if(promises[i].state === "fulfilled"){
        logger.success('origin --> Label removed : ' + promises[i].value.name);
      }
      else if(promises[i].state === "rejected"){
        logger.error('origin --> Unable to delete the label : '+labels[i].name);
      }
      else{
        logger.error('origin --> [err:promise] Something went very wrong...');
      }
    }
  }
  else{
    logger.success('origin --> No labels to delete !');
  }
};

LabelLogger.prototype.logCreate = function (promises, jsonData){
  var i;
  var length  = promises.length;

  for(i = 0; i < length; i++){
    if(promises[i].state === "fulfilled"){
      logger.success('target --> Label imported : ' + promises[i].value.name);
    }
    else if(promises[i].state === "rejected"){
      switch(promises[i].reason.code){
        case 404 :
          logger.error('target --> Repository not found');
          break;
        case 422 :
          logger.error('target --> Label already exists : ' + jsonData[i].name);
          break;
        default:
          logger.error('target --> Unsupported github error code : '+promises[i].reason.code);
      }
    }
    else{
      logger.error('target --> [err:promise] Something went very wrong...');
    }
  }
};

LabelLogger.prototype.logExport = function (labels, path){
  var i;
  var length  = labels.length;

  if(length > 0){
    for(i = 0; i < length; i++){
      logger.info('origin --> Label exported : (' + labels[i].color + ') ' + labels[i].name);
    }
    logger.success('Labels exported to the file : ' + path);
  }
  else{
    logger.success('origin --> No labels found in the target repository !');
  }
};


module.exports = new LabelLogger();
