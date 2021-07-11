var request=new XMLHttpRequest();
request.open('GET','https://restcountries.eu/rest/v2/all',true);
request.send();
request.onload=function(){
try{
    var data=JSON.parse(this.responseText);
    //Print the following details name, capital, flag using forEach function
    data.forEach(item=>{
            console.log("Country name:",item.name);
            console.log("Capital:",item.capital);
            console.log("Flag:",item.flag);
            console.log("");
        })   
     }
     catch(err){
        console.log(err.message);
    }
}
