var fs = require('fs');
var path = require('path');

module.exports = function(directory, extension, callback){
  fs.readdir(directory, function (err, data) {
    if(err){
      return callback(err);
    } else {
      var result = [];
      for(i=0;i<data.length;i++){

        if(data[i].toString().includes('.'+extension)){
            result.push(data[i].toString());
        }
      }
      callback(null,result);
    }
  })
}
