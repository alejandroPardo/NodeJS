var trumpet = require('trumpet');
var through2 = require('through2');
var fs = require('fs');
var tr = trumpet();

process.stdin.pipe(tr);
var stream = tr.select('.loud').createStream()

stream.pipe(through2(function (buffer, enc, next) {
  this.push(buffer.toString().toUpperCase());
  next();
})).pipe(stream);

tr.pipe(process.stdout)
