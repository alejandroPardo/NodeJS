var fs = require('fs');

function processDirectory(err, data) {
  if(err) return console.error(err);
  for(i=0;i<data.length;i++){
    if(data[i].toString().includes('.'+process.argv[3])){
        console.log(data[i].toString());
    }
  }
}

fs.readdir(process.argv[2], processDirectory);
