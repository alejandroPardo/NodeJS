var http = require('http')
var url = require('url')

function parseTime(query){
  var date = new Date(query.iso)
  return JSON.stringify({hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds()});
}

function unixTime(query){
  var date = new Date(query.iso)
  return JSON.stringify({unixtime: date.getTime()});
}

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  //console.log(parsedUrl);
  res.writeHead(200, { 'Content-Type': 'application/json' })
  var result = 'Send a proper request.';
  if(parsedUrl.pathname === '/api/unixtime'){
    result = unixTime(parsedUrl.query)
  } else if (parsedUrl.pathname === '/api/parsetime') {
    result = parseTime(parsedUrl.query)
  }
  res.end(result);
})
server.listen(process.argv[2])
