(async () => {
    let data1 = await $.ajax({url:"1.txt",dataType:'json'});
    let data2 = await $.ajax({url:"2.txt",dataType:'json'});
    let data3 = await $.ajax({url:"3.txt",dataType:'json'});
    console.log(data1,data2,data3);
})();
