var request=new XMLHttpRequest();
request.open('GET','https://restcountries.eu/rest/v2/all',true);
request.send();
request.onload=function(){
    try{
    var data=JSON.parse(this.responseText);
    //Print total population in Asia
    console.log("Asian Population:", data.filter(item=>
        item.region==="Asia")   
        .reduce((accumulator,currentValue)=>
        accumulator+currentValue.population,0));
    }
    catch(err){
        console.log(err.message);
    }

}
