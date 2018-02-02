var ws = require('websocket-stream');
var stream = ws('ws://localhost:8099');

//console.log(stream.toString());
//stream.pipe().pipe(process.stdout);

stream.end("hello\n");
