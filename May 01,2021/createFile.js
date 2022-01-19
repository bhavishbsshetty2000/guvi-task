const fs = require("fs");

let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

fs.writeFile(
  "date-time.txt",
  `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`,
  function (err) {
    if (err) throw err;
    console.log("File created");
  }
);
© 2022 GitHub, Inc.
Terms
