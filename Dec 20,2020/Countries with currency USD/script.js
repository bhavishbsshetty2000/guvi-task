var request=new XMLHttpRequest();
request.open('GET','https://restcountries.eu/rest/v2/all',true);
request.send();
request.onload=function(){
    try{
    var data=JSON.parse(this.responseText);
    //Prints countries with currency USD
    console.log(data.filter(item=>{
        if(item.currencies[0].code==="USD")
        {
            console.log(item.name);
        }
    })
        )
       }
catch(err){
    console.log(err.message);
          }
}
