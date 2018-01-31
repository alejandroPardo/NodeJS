var fs = require('fs');

function processFile(err, data) {
  if(err) return console.error(err);
  var file = data.toString();
  console.log(file.split(/\n/).length-1)
}

fs.readFile(process.argv[2],{encoding: "utf8"}, processFile);
