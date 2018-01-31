var mymodule = require('./mymodule.js');

var directory = process.argv[2];
var extension = process.argv[3];

var printLs = function(err, data) {
  if(err){
    return console.error(err);
  }
  data.forEach(function(item){
    console.log(item);
  })
};


mymodule(directory,extension,printLs);
