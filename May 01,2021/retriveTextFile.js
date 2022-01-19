const fs = require("fs");
const http = require("http");

var path = __dirname;
var fls;

fs.readdir(`${path}`, (err, files) => {
  if (err) throw err;
  fls = files;
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  for (var i = 0; i < fls.length; i++) {
    var stats = fs.statSync(`${path}/${fls[i]}`);
    if (stats.isFile()) {
      res.write(fls[i] + "<br/>");
    }
  }

  res.end();
});

server.listen(3020);
