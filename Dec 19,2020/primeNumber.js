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
    var o="";
    for(var i=0;i<n.length;i++)
    {
        var flag=0;
        
        if(n[i]===0 || n[i]===1)
        {
            continue;
        }
        if(n[i]===2)
        {
        o=o+n[i]+" ";
        continue;
        }
        for(var j=2;j<n[i];j++)
        if(n[i]%j===0)
        {
           flag=1;
           break;
        }
        if(flag===0)
         o=o+n[i]+" ";
    }
    console.log(o);
})(a)

  //end-here
});
