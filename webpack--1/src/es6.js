

function sleep(t,i){
    return new Promise((resolve,rejext)=>{
        setTimeout(function(){
            resolve(i);
        },t)
    })
}
(async ()=>{
    for(let i = 0;i<10;i++){
        let m = await sleep(1000,i);
        console.log(m);
    }

})();