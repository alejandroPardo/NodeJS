var split = require('split');
var through2 = require('through2');

var index = 1;
process.stdin
    .pipe(split())
    .pipe(through2(function (line, _, next) {
      if(index %2 == 0){
        this.push(line.toString().toUpperCase()+'\n');
      } else {
        this.push(line.toString().toLowerCase()+'\n');
      }
      index++;
      next();
    })).pipe(process.stdout);
