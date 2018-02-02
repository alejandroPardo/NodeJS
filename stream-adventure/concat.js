var concat = require('concat-stream');

function reverseString(str) {
    return str.toString().split("").reverse().join("");
}

process.stdin
    .pipe(concat(function (body) {
      process.stdout.write(reverseString(body))
    }));
