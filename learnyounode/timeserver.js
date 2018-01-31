var net = require('net');

var server = net.createServer(function (socket) {
  var date = new Date();
  var month = '' + (Number(date.getMonth()) + 1);
  var day = '' + date.getDate();
  var hours = '' + date.getHours();
  var minutes = '' + date.getMinutes();
  if(month.length < 2) month = '0' + month;
  if(day.length < 2) day = '0' + day;
  if(hours.length < 2) hours = '0' + hours;
  if(minutes.length < 2) minutes = '0' + minutes;

  var data = date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + '\n';
  socket.end(data);
})
server.listen(process.argv[2]);
