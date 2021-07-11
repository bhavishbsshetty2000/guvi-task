// Getting input via STDIN
const readline = require("readline");

const inp = readline.createInterface({
  input: process.stdin
});

const userInput = [];

inp.on("line", (data) => {
  userInput.push(data);
});

inp.on("close", () => {
  //start-here
  //Your code goes here … replace the below line with your code logic 

  var c=userInput[0].split(" ");
  var n=parseInt(userInput[1]);
  var b=function(a)
  {
  console.log(...(a.slice(a.length-n,a.length)).concat(a.slice(0,a.length-n)));
  }(c);
  
  //end-here
});
