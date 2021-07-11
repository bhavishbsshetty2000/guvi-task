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
 var a1=userInput[0].split(" ").map(Number); 
 var a2=userInput[1].split(" ").map(Number); 
 var a=a1.concat(a2);
 a=a.sort(function(a, b){return a-b});
var med=(function(n)
{
  console.log((parseInt(n[n.length/2])+parseInt(n[parseInt((n.length+1)/2)]))/2);
   
 })(a)

  //end-here
});
