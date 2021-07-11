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
 var a=userInput[0].split(" "); 

var rvv=(function(n)
{
    for(var i=0;i<n.length;i++)
    { var str=n[i];
        if(n[i]===str.split("").reverse().join(""))
        {
            console.log(n[i]);
        }
    }
})(a)

  //end-here
});
