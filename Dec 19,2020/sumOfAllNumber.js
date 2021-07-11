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

var x=userInput[0].split(" ").map(Number);
var sm=(function(s)
{
    
    const sum=s.reduce(function(result,item){return result+item},0);
    console.log(sum);
})(x)

  //end-here
});
