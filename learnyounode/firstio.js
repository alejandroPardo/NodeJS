var fs = require('fs');

var file = fs.readFileSync(process.argv[2]).toString();

var split = file.split(/\n/).length;

console.log(split-1);
