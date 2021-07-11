var request=new XMLHttpRequest();
request.open('GET','https://restcountries.eu/rest/v2/all',true);
request.send();
request.onload=function(){
try{
    var data=JSON.parse(this.responseText);
    //Print total population in the world
    console.log("Total population:",data.reduce((accumulator,currentValue)=>
    accumulator+currentValue.population,0))
    }
    catch(err){
        console.log(err.message);
    }
}
