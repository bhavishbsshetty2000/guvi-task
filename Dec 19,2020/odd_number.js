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
 var a=userInput[0].split(" ").map(Number); 

var odd=(function(n)
{
    var o=""
    for(var i=0;i<n.length;i++)
    {
        if(n[i]%2!==0)
        {
            o=o+n[i];
            if(i+1!==n.length)
            o=o+" ";
        }
    }
    console.log(o);
})(a)

  //end-here
});
