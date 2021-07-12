function countdown2(count, callback) {  
    var s = 11;
    setseconds();

    function setseconds() { 
        s-=1
        count.innerHTML=s;
        document.body.append(count);
        
        if (s > 0) {      
            setTimeout(setseconds, 1000);
        } else {
            callback()
        }   
    }
}

var countdown1 = document.getElementById('countdown')

countdown2(countdown1,function(){
    countdown1.innerText="Happy Independence Day";
    countdown1.setAttribute('style','font-family:Cambria, Cochin, Georgia, Times, serif;color:white;background-color:black')
   document.body.append(countdown1);
})
