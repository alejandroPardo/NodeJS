var duplexer = require('duplexer2');
var through = require('through2').obj;

module.exports = function (counter) {
  var counts = {};
  var stream = through(write,end);

  var result = duplexer({objectMode:true}, stream, counter);

  function write(input, encoding, done) {
    if(counts[input.country] !== undefined){
      counts[input.country] = counts[input.country] + 1;
    } else {
      counts[input.country] = 1;
    }
    //counts[row.country] = (counts[row.country] || 0) + 1;

    done();
  };

  function end(done) {
    counter.setCounts(counts);
    done();
  };
  return result;
};
