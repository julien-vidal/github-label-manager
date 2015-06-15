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
        logger.error('origin --> Label not delete : '+labels[i].name);
      }
      else{
        logger.error('origin --> [err:promise] unknown...');
      }
    }
  }
  else{
    logger.success('origin --> Already clear !');
  }
};

LabelLogger.prototype.logCreate = function (promises, jsonData){
  var i;
  var length  = promises.length;

  for(i = 0; i < length; i++){
    if(promises[i].state === "fulfilled"){
      logger.success('target --> Label  imported : ' + promises[i].value.name);
    }
    else if(promises[i].state === "rejected"){
      switch(promises[i].reason.code){
        case 404 :
          logger.error('target --> Repository not founded');
          break;
        case 422 :
          logger.error('target --> Label already exist : ' + jsonData[i].name);
          break;
        default:
          logger.error('target --> Unsupported github error code : '+promises[i].reason.code);
      }
    }
    else{
      logger.error('target --> [err:promise] unknown...');
    }
  }
};


module.exports = new LabelLogger();
