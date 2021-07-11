var request=new XMLHttpRequest();
request.open('GET','https://restcountries.eu/rest/v2/all',true);
request.send();
request.onload=function(){
   try{
    var data=JSON.parse(this.responseText);
    //Filter countries in Asia
    data.filter(item=>{
        if(item.region==="Asia")
        {
            console.log( item.name);
        }
        })
   }
  catch(err){
        console.log(err.message);
    }
    
}
