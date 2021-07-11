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
  var b=function(a)
  {
  var d=a.reduce(function(acc,value)
  {
      if(acc.indexOf(value)===-1)
      acc.push(value);
      return acc;
      
  },[]);
  console.log(...d);
  }(c)
  
  //end-here
});
