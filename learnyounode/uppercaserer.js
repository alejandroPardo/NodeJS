var http = require('http')
var fs = require('fs')
var map = require('through2-map')

var server = http.createServer(function (req, res) {
  //console.log(req.method, req.url, req.headers);
  if(req.method === 'POST'){
    var body = '';
    req.on('readable', function() {
      var chunk = req.read();
      if(chunk !== null){
        body += chunk;
      }
    });
    req.on('end', function() {
        //console.log(body);
        body = body.toUpperCase();
        res.end(body);
    });
  }
})
server.listen(process.argv[2])
