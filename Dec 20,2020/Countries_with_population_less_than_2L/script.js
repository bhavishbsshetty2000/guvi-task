var request=new XMLHttpRequest();
request.open('GET','https://restcountries.eu/rest/v2/all',true);
request.send();
request.onload=function(){
try{
    var data=JSON.parse(this.responseText);
    //Filter countries with less than 2 lakh population
    data.filter(item=>{
        if(item.population <=200000)
        {
            console.log( item.name);
        }
        })  
     }
     catch(err){
        console.log(err.message);
    }
}
